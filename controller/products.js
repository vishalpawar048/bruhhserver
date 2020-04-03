const {
  addProductToDb,
  getProductByCategory,
  getProductByKeyWords,
  saveNewKeyword,
  updateProductById,
  deleteProductService,
  getProductsByKeyWordsService
} = require("../services/productService");
const fs = require("fs");
const csv = require("fast-csv");
const { regex } = require("./keywords");
var _ = require("lodash");

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
      let response = await addProductToDb(body);
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

let addProductCSV = async (req, res) => {
  let productData = [];

  if (req.file.path) {
    await csv
      .parseFile(req.file.path)
      .on("data", function(data) {
        let imgArray = [];
        imgArray.push(data[3], data[4], data[5], data[6]),
          productData.push({
            name: _.upperFirst(data[0]),
            price: data[1],
            website: _.upperFirst(data[2]),
            imgUrls: imgArray,
            category: data[7].toLowerCase(),
            subCategory: data[8].toLowerCase(),
            keywords: data[9].toLowerCase(),
            rating: data[10],
            description: _.upperFirst(data[11]),
            url: data[12]
          });
      })
      .on("end", async function() {
        productData.shift();
        // fs.rmdir("./tmp/csv", err => {
        //   if (err) throw err;
        //   console.log("******* [ file Deleted Successfully ] ******");
        // });
        let response;
        let resArray = [];
        try {
          productData.forEach(ele => {
            response = addProductToDb(ele);
            resArray.push(response);
          });

          res.send(resArray);
        } catch (error) {
          res.send(error);
        } // remove temp file
      });
  } else {
    try {
      let response = await addProductToDb(req.body);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
};

module.exports = {
  getProductsByCategory,
  getProductsByKeyWords,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductCSV
};
