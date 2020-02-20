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
  let category = req.query.category;
  let response = await getProductByCategory(category);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getProductsByKeyWords = async (req, res) => {
  let category = req.body.category;
  let keyword = req.body.keyword;
  let response = await getProductsByKeyWordsService(category, keyword);
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
  let url = req.body.url;

  let response;

  if (url) {
    try {
      let response = await deleteProductService(url);
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
