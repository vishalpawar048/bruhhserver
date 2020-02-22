let {
  addCategoryService,
  updateCategoryService,
  getCategoriesService,
  deleteCategoryService
} = require("../services/categoryService");

let addCategory = async (req, res) => {
  console.log("****************[ addCategory ]*****************");

  let body = req.body;
  let name = req.body.name;
  let category = req.body.category;
  let imgUrl = req.body.imgUrl;
  let keyword = req.body.keyword;
  let sequence = req.body.sequence;

  let response;

  if (name && category && imgUrl && keyword && sequence) {
    try {
      let response = await addCategoryService(body);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Product: product,
      Status: "name, category,imgUrl,keyword,sequence on of this parameter is missing or empty"
    };
    res.send(response);
  }
};

let updateCategory = async (req, res) => {
  console.log("****************[ updateCategory ]*****************");

  let body = req.body;
  let id = req.body.URL;
  let category = req.body.category;

  if (category) {
    try {
      let response = await updateCategoryService(body, category, id);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Product: product,
      Status: "Please add proper category"
    };
    res.send(response);
  }
};

let getCategories = async (req, res) => {
  console.log("****************[ getCategories ]*****************");

  try {
    let response = await getCategoriesService();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

let deleteCategory = async (req, res) => {
  console.log("****************[ deleteCategory ]*****************");

  let categoryName = req.body.categoryName;

  let response;

  if (categoryName) {
    try {
      let response = await deleteCategoryService(categoryName);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "categoryName is missing or empty"
    };
    res.send(response);
  }
};

module.exports = {
  addCategory,
  updateCategory,
  getCategories,
  deleteCategory
};
