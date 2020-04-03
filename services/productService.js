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

let addProductToDb = body => {
  var product = new Product(body);
  return new Promise((resolve, reject) => {
    product.save(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Product: result,
            Status: `Product added Successfully in category`
          })
        );
      }
    });
  });
};

let getProductByCategory = (category, subCategory) => {
  return new Promise((resolve, reject) => {
    if (category === "new") {
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
      }).sort({ _id: -1 });
    } else if (subCategory) {
      Product.find(
        { $and: [{ category: { $eq: category } }, { subCategory: { $eq: subCategory } }] },
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
      );
    } else {
      Product.find({ category: category }, function(err, result) {
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
    }
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

let getProductsByKeyWordsService = keyword => {
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

let updateProductById = (body, id) => {
  return new Promise((resolve, reject) => {
    Product.update(
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

let deleteProductService = id => {
  return new Promise((resolve, reject) => {
    Product.findOneAndDelete({ _id: id }, function(err, result) {
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
