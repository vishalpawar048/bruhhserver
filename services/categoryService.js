const { Category } = require("../model/schema");

let addCategoryService = body => {
  let category = new Category(body);
  return new Promise((resolve, reject) => {
    category.save(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

let deleteCategoryService = categoryName => {
  return new Promise((resolve, reject) => {
    Category.deleteOne({ sequence: { $eq: categoryName } }, function(err, result) {
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

let getCategoriesService = () => {
  return new Promise((resolve, reject) => {
    Category.find(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Banners: result,
            Status: `Success`
          })
        );
      }
    });
  });
};

let updateCategoryService = (body, category, id) => {
  return new Promise((resolve, reject) => {
    Category.update(
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
              Status: `Category updated Successfully: ${body}`
            })
          );
        }
      }
    );
  });
};

module.exports = {
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getCategoriesService
};
