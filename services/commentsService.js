const {
    WebsiteComments,
    ProductComments
} = require("../model/schema");



let addWebsiteCommentToDb = (obj) => {
    var websiteComments = new WebsiteComments(obj);
    return new Promise((resolve, reject) => {
        websiteComments.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(
                    (response = {
                        Product: result,
                        Status: `Website's Comment and Rating added Successfully `,
                    })
                );
            }
        });
    });
};

let addProductCommentToDB = (obj) => {
    var productComments = new ProductComments(obj);
    return new Promise((resolve, reject) => {
        productComments.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(
                    (response = {
                        Product: result,
                        Status: `Products's Comment and Rating added Successfully `,
                    })
                );
            }
        });
    });
};

let getProductCommentsService = (id) => {
    return new Promise((resolve, reject) => {
        ProductComments.find({ productId: id }, null, { sort: { created_at: -1 } }, function (err, result) {
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

let getWebsiteCommentService = (website) => {
    return new Promise((resolve, reject) => {
        WebsiteComments.find({ website: website }, null, { sort: { created_at: -1 } }, function (err, result) {
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

let deleteProductCommentByIdService = (id) => {
    return new Promise((resolve, reject) => {
        ProductComments.findOneAndDelete({ _id: id }, function (err, result) {
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

let deleteWebsiteCommentByIdService = (id) => {
    return new Promise((resolve, reject) => {
        WebsiteComments.findOneAndDelete({ _id: id }, function (err, result) {
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
    addWebsiteCommentToDb,
    addProductCommentToDB,
    getWebsiteCommentService,
    getProductCommentsService,
    deleteProductCommentByIdService,
    deleteWebsiteCommentByIdService
};
