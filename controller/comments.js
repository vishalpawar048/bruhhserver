const service = require("../services/commentsService");
var _ = require("lodash");

let addWebsiteComment = async (req, res) => {
  console.log("****************[ addWebsiteComment ]*****************");

  let website = req.body.website ? req.body.website.toLowerCase() : "";
  let comment = req.body.comment;
  let userId = req.body.userId;

  let obj = {
    website: website,
    userId: req.body.userId,
    emailId: req.body.emailId,
    comment: req.body.comment,
    websiteRating: req.body.websiteRating,
    productsQualityRating: req.body.productsQualityRating,
    deliveryRating: req.body.deliveryRating,
    returnPolicyRating: req.body.returnPolicyRating,
  };
  let response;

  if (website && userId) {
    try {
      let response = await service.addWebsiteCommentToDb(obj);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      website: website,
      Status: "Please provide website, userId",
    };
    res.send(response);
  }
};

let addProductComment = async (req, res) => {
  console.log("****************[ addProductComment ]*****************");

  let website = req.body.website ? req.body.website.toLowerCase() : "";
  let comment = req.body.comment;
  let userId = req.body.userId;

  let obj = {
    productId: req.body.productId,
    userId: req.body.userId,
    emailId: req.body.emailId,
    name: req.body.name,
    website: website,
    comment: req.body.comment,
    productRating: req.body.productRating,
  };
  let response;

  if (website && userId) {
    try {
      let response = await service.addProductCommentToDB(obj);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      website: website,
      Status: "Please provide website, comment, userId",
    };
    res.send(response);
  }
};

let updateProduct = async (req, res) => {
  console.log("****************[ updateProduct ]*****************");

  let body = req.body;
  let id = req.body.URL;
  let category = req.body.category;

  if (category) {
    try {
      let response = await service.updateProductById(body, category, id);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Product: product,
      Status: "Please add proper category",
    };
    res.send(response);
  }
};

let getProductComments = async (req, res) => {
  console.log("****************[ getProductComments ]*****************");

  let productId = req.body.productId;

  let response = await service.getProductCommentsService(productId);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getWebsiteComments = async (req, res) => {
  console.log("****************[ getWebsiteComment ]*****************");

  let website = req.body.website ? req.body.website.toLowerCase() : "";
  let response;
  if (website) {
    response = await service.getWebsiteCommentService(website);
    if (response) {
      res.send(response);
    } else {
      res.send("Error");
    }
  } else {
    res.send("Website Name Missing");
  }
};

let deleteProductCommentById = async (req, res) => {
  console.log("****************[ deleteProductCommentById ]*****************");

  let id = req.body.id;

  let response;

  if (id) {
    try {
      let response = await service.deleteProductCommentByIdService(id);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "delete comment failed",
    };
    res.send(response);
  }
};

let deleteWebsiteCommentById = async (req, res) => {
  console.log("****************[ deleteWebsiteCommentById ]*****************");

  let id = req.body.id;

  let response;

  if (id) {
    try {
      let response = await service.deleteWebsiteCommentByIdService(id);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "delete comment failed",
    };
    res.send(response);
  }
};

module.exports = {
  addWebsiteComment,
  addProductComment,
  getWebsiteComments,
  getProductComments,
  deleteWebsiteCommentById,
  deleteProductCommentById,
};
