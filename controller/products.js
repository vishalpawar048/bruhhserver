const {
  addProductToDb,
  getProductByCategory,
  getProductByKeyWords,
  saveNewKeyword,
  updateProductById,
  deleteProductService,
  getProductsByKeyWordsService
} = require("../services/productService");
const { regex } = require("./keywords");

let getProductsByCategory = async (req, res) => {
  console.log("****************[ getProductsByCategory ]*****************");

  let category = req.body.category.toLowerCase();
  let subCategory = req.body.subCategory.toLowerCase();
  let response = await getProductByCategory(category, subCategory);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getProductsByKeyWords = async (req, res) => {
  console.log("****************[ getProductsByKeyWords ]*****************");

  //let category = req.body.category.toLowerCase();
  let keyword = req.body.keyword.toLowerCase();
  let response = await getProductsByKeyWordsService(keyword);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

// let getProductsByKeyWords = async (req, res) => {
//   let keyword = req.query.keyword;
//   if (regex.menPattern.test(keyword)) {
//     try {
//       let response = await getProductByKeyWords(keyword, "men");
//       res.send(response);
//     } catch (error) {
//       res.send("error");
//     }
//   } else if (regex.womenPattern.test(keyword)) {
//     try {
//       let response = await getProductByKeyWords(keyword, "women");
//       res.send(response);
//     } catch (error) {
//       res.send("error");
//     }
//   } else {
//     res.send("Please enter search keywords");
//     saveNewKeyword(keyword);
//   }
// };

let addProduct = async (req, res) => {
  console.log("****************[ addProduct ]*****************");

  let body = req.body;
  let category = req.body.category;
  let response;

  if (category) {
    try {
      let response = await addProductToDb(body, category);
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

let updateProduct = async (req, res) => {
  console.log("****************[ updateProduct ]*****************");

  let body = req.body;
  let id = req.body.URL;
  let category = req.body.category;

  if (category) {
    try {
      let response = await updateProductById(body, category, id);
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

let deleteProduct = async (req, res) => {
  console.log("****************[ deleteProduct ]*****************");

  let id = req.body.id;

  let response;

  if (id) {
    try {
      let response = await deleteProductService(id);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "url is missing or empty"
    };
    res.send(response);
  }
};

module.exports = {
  getProductsByCategory,
  getProductsByKeyWords,
  addProduct,
  updateProduct,
  deleteProduct
};
