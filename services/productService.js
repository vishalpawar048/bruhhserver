const { Product, MenProduct, WomenProduct, Gadget, NewKeyword } = require("../model/schema");

let saveNewKeyword = keyword => {
  let newKeywords = new NewKeyword({ query: keyword });
  return new Promise((resolve, reject) => {
    newKeywords.save(function(err, result) {
      if (err) {
        // reject(err);
        console.error("error in saveNewKeyword");
      } else {
        console.log("New Keyword added successfully");
        // resolve(
        //   (response = {
        //     Product: result,
        //     Status: `Product added Successfully in category: ${category}`
        //   })
        // );
      }
    });
  });
};

let addProductToDb = (body, category) => {
  var product = new Product(body);
  // if (category === "men") {
  //   product = new MenProduct(body);
  // } else if (category === "women") {
  //   product = new WomenProduct(body);
  // } else if (category === "gadget") {
  //   product = new Gadget(body);
  // } else {
  //   product = new Product(body);
  // }

  return new Promise((resolve, reject) => {
    product.save(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Product: result,
            Status: `Product added Successfully in category: ${category}`
          })
        );
      }
    });
  });
};

let getProductByCategory = category => {
  //var product;
  // if (category === "men") {
  //   product = MenProduct;
  // } else if (category === "women") {
  //   product = WomenProduct;
  // } else if (category === "gadget") {
  //   product = Gadget;
  // } else {
  //   product = Product;
  // }

  return new Promise((resolve, reject) => {
    Product.find(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Product: result,
            Status: `Success`
          })
        );
      }
    });
  });
};

let getProductByKeyWords = (keyword, category) => {
  let product;
  if (category === "men") {
    product = MenProduct;
  } else if (category === "women") {
    product = WomenProduct;
  } else {
    product = Product;
  }

  return new Promise((resolve, reject) => {
    product
      .find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } }, function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`
            })
          );
        }
      })
      .sort({ score: { $meta: "textScore" } });
  });
};

let getProductsByKeyWordsService = (category, keyword) => {
  return new Promise((resolve, reject) => {
    Product.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } },
      // { $and: [{ category: { $eq: category } }, { $text: { $search: keyword } }] },
      // { score: { $meta: "textScore" } },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`
            })
          );
        }
      }
    ).sort({ score: { $meta: "textScore" } });
  });
};

let updateProductById = (body, category, id) => {
  let product;
  if (category === "men") {
    product = MenProduct;
  } else if (category === "women") {
    product = WomenProduct;
  } else {
    product = Product;
  }

  return new Promise((resolve, reject) => {
    product.update(
      { url: id },
      {
        $set: body
      },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Product updated Successfully in category: ${body}`
            })
          );
        }
      }
    );
  });
};

let deleteProductService = url => {
  return new Promise((resolve, reject) => {
    Category.deleteOne({ url: { $eq: url } }, function(err, result) {
      if (err) {
        reject(err);
        // console.error("error in saveNewKeyword");
      } else {
        resolve(result);
        // console.log("New Keyword added successfully");
      }
    });
  });
};
module.exports = {
  addProductToDb,
  getProductByCategory,
  getProductByKeyWords,
  saveNewKeyword,
  updateProductById,
  deleteProductService,
  getProductsByKeyWordsService
};
