const {
  Product,
  MenProduct,
  WomenProduct,
  Gadget,
  NewKeyword,
  Website,
} = require("../model/schema");

let saveNewKeyword = (keyword) => {
  let newKeywords = new NewKeyword({ query: keyword });
  return new Promise((resolve, reject) => {
    newKeywords.save(function (err, result) {
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

let addProductToDb = (body) => {
  var product = new Product(body);
  return new Promise((resolve, reject) => {
    product.save(function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Product: result,
            Status: `Product added Successfully in category`,
          })
        );
      }
    });
  });
};

let getProductByCategory = (obj) => {
  let query;
  let sortQuery = obj.sort ? { price: obj.sort } : { _id: -1 };
  // let sortQuery = { _id: -1 };

  if (!obj.website) {
    obj.website = [];
  }

  if (obj.category === "new" && obj.website.length > 0) {
    query = { website: { $in: obj.website } };
  } else if (obj.category === "gifts") {
    // query = { subCategory: { $in: ["watch","headphone","coffee mug","accessories"] } };
    query = {
      subCategory: {
        $in: ["gifts", "watch", "headphone", "coffee mug", "accessories"],
      },
    };
  } else if (obj.category === "new" && obj.website.length == 0) {
    query = {};
  } else if (obj.subCategory && obj.website.length > 0) {
    query = {
      $and: [
        { category: { $eq: obj.category } },
        { subCategory: { $eq: obj.subCategory } },
        { website: { $in: obj.website } },
      ],
    };
  } else if (!obj.subCategory && obj.website.length > 0) {
    query = {
      $and: [
        { category: { $eq: obj.category } },
        { website: { $in: obj.website } },
      ],
    };
  } else if (obj.subCategory && obj.website.length == 0) {
    query = {
      $and: [
        { category: { $eq: obj.category } },
        { subCategory: { $eq: obj.subCategory } },
      ],
    };
  } else {
    query = { category: obj.category };
  }

  return new Promise((resolve, reject) => {
    Product.find(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Product: result,
            Status: `Success`,
          })
        );
      }
    })
      .sort(sortQuery)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(obj.page * obj.limit)
      .limit(obj.limit);
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
      .find(
        { $text: { $search: keyword } },
        { score: { $meta: "textScore" } },
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(
              (response = {
                Product: result,
                Status: `Success`,
              })
            );
          }
        }
      )
      .sort({ score: { $meta: "textScore" } });
  });
};

let getProductsByKeyWordsService = (keyword) => {
  return new Promise((resolve, reject) => {
    Product.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } },
      // { $and: [{ category: { $eq: category } }, { $text: { $search: keyword } }] },
      // { score: { $meta: "textScore" } },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`,
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
        $set: body,
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Product updated Successfully in category: ${body}`,
            })
          );
        }
      }
    );
  });
};

let deleteProductService = (id) => {
  return new Promise((resolve, reject) => {
    Product.findOneAndDelete({ _id: id }, function (err, result) {
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

let getProductByPriceService = (category, subCategory, sort) => {
  return new Promise((resolve, reject) => {
    if (category === "new") {
      Product.find(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`,
            })
          );
        }
      }).sort({ price: sort });
    } else if (subCategory) {
      Product.find(
        {
          $and: [
            { category: { $eq: category } },
            { subCategory: { $eq: subCategory } },
          ],
        },
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(
              (response = {
                Product: result,
                Status: `Success`,
              })
            );
          }
        }
      ).sort({ price: sort });
    } else {
      Product.find({ category: category }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`,
            })
          );
        }
      }).sort({ price: sort });
    }
  });
};

let getProductByWebsiteService = (category, subCategory, websites) => {
  return new Promise((resolve, reject) => {
    if (category === "new") {
      Product.find({ website: { $in: websites } }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              Product: result,
              Status: `Success`,
            })
          );
        }
      });
    } else if (subCategory) {
      Product.find(
        {
          $and: [
            { category: { $eq: category } },
            { subCategory: { $eq: subCategory } },
            { website: { $in: websites } },
          ],
        },
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(
              (response = {
                Product: result,
                Status: `Success`,
              })
            );
          }
        }
      );
    } else {
      Product.find(
        { $and: [{ category: category }, { website: { $in: websites } }] },
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(
              (response = {
                Product: result,
                Status: `Success`,
              })
            );
          }
        }
      );
    }
  });
};

let getWebsitesService = () => {
  return new Promise((resolve, reject) => {
    Product.distinct("website", function (err, result) {
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

let getCategoriesService = (id) => {
  return new Promise((resolve, reject) => {
    Product.aggregate(
      [
        {
          $group: {
            _id: { category: "$category", subCategory: "$subCategory" },
          },
        },
      ],
      function (err, result) {
        if (err) {
          reject(err);
          // console.error("error in saveNewKeyword");
        } else {
          resolve(result);
          // console.log("New Keyword added successfully");
        }
      }
    );
  });
};

let updateSubCatagoryService = (oldSubCategory, newSubCategory) => {
  return new Promise((resolve, reject) => {
    Product.updateMany(
      { subCategory: oldSubCategory },
      { $set: { subCategory: newSubCategory } },
      function (err, result) {
        if (err) {
          reject(err);
          // console.error("error in saveNewKeyword");
        } else {
          resolve(result);
          // console.log("New Keyword added successfully");
        }
      }
    );
  });
};

let getProductByIdService = (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, function (err, result) {
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

let getWebsiteDetailsService = (website) => {
  console.log(">>>>>>>>>>>>>>>website", website);
  return new Promise((resolve, reject) => {
    Website.find({ name: website }, function (err, result) {
      if (err) {
        reject(err);
        // console.error("error in saveNewKeyword");
      } else {
        console.log(">>>>>>>>>>>>>>rating", result);
        resolve(result);
        // console.log("New Keyword added successfully");
      }
    });
  });
};

let deletedProductsbyDateService = (date, category, subCategory) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, function (err, result) {
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
  getProductsByKeyWordsService,
  getProductByPriceService,
  getProductByWebsiteService,
  getWebsitesService,
  getCategoriesService,
  updateSubCatagoryService,
  getProductByIdService,
  getWebsiteDetailsService,
};
