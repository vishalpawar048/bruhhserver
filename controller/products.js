const service = require("../services/productService");
const fs = require("fs");
const csv = require("fast-csv");
const { regex } = require("./keywords");
var _ = require("lodash");

let getProductsByCategory = async (req, res) => {
  console.log("****************[ getProductsByCategory ]******************", req.body);
  var selectedWebsites;
  if (req.body.website) {
    try {
      selectedWebsites = JSON.parse(req.body.website);
    } catch (error) {
      selectedWebsites = req.body.website;
    }
  } else {
    selectedWebsites = [];
  }

  let obj = {
    category: req.body.category.toLowerCase(),
    subCategory: req.body.subCategory.toLowerCase().replace(/ /g,''),
    page: req.body.page == 0 ? "0" : req.body.page - "1",
    limit: 10,
    website: selectedWebsites,
    // website: req.body.subCategory.toLowerCase(),
    sort: req.body.sort == "0" ? null : req.body.sort,
  };
  // console.log(">>>>>>>>>>>>>>>>>obj", obj);
  let response = await service.getProductByCategory(obj);
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
  let response = await service.getProductsByKeyWordsService(keyword);

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
      let response = await service.addProductToDb(body);
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

let deleteProduct = async (req, res) => {
  console.log("****************[ deleteProduct ]*****************");

  let id = req.body.id;

  let response;

  if (id) {
    try {
      let response = await service.deleteProductService(id);
      res.send(response);
    } catch (error) {
      res.send(error);
      
    }
  } else {
    response = {
      Message: "Failed",
      Status: "url is missing or empty",
    };
    res.send(response);
  }
};

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let addProductCSV = async (req, res) => {
  console.log("****************** addProductCSV *********************",req.file.path)
  let productData = [];

  if (req.file.path) {
    await csv
      .parseFile(req.file.path)
      .on("data", function (data) {
        let imgArray = [];
      
          imgArray.push(data[3], data[4], data[5], data[6])

      
        // imgArray.push(data[3]),

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
            url: data[12],
            createdAt: new Date()
          });
      })
      .on("end", async function () {
       if(productData.length > 1){
        productData.shift();

        productData = shuffle(productData);
       }
        
        let response;
        let resArray = [];
         console.log(">>>>>>>>>>>>>>>>>>>>>", productData);
        try {
          productData.forEach((ele) => {
            
            response = service.addProductToDb(ele);
            resArray.push(response);

          })

         
        } catch (error) {
          res.send(error);
        } // remove temp file
      });
  } else {
    try {
      let response = await service.addProductToDb(req.body);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
};

let getProductByPrice = async (req, res) => {
  console.log("****************[ getProductsByKeyWords ]*****************");

  //let category = req.body.category.toLowerCase();
  let sort = req.body.sort;
  let category = req.body.category.toLowerCase();
  let subCategory = req.body.subCategory.toLowerCase();

  let response = await service.getProductByPriceService(category, subCategory, sort);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getProductByWebsite = async (req, res) => {
  console.log("****************[ getProductsByKeyWords ]*****************");
  let websites = req.body.websites;
  let category = req.body.category.toLowerCase();
  let subCategory = req.body.subCategory.toLowerCase();

  let response = await service.getProductByWebsiteService(category, subCategory, websites);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getProductById = async (req, res) => {
  console.log("****************[ getProductById ]*****************");
 
  let id = req.body.id;

  let response = await service.getProductByIdService(id);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let getWebsites = async (req, res) => {
  console.log("****************[ getWebsites ]*****************");

  let category = req.body.category.toLowerCase();
  let subCategory = req.body.subCategory ? req.body.subCategory.toLowerCase() : null;

  let response = await service.getWebsitesService(category, subCategory);
  if (response) {
    res.send(response.Product[0]).website;
  } else {
    res.send("Error");
  }
};


let getWebsiteDetails = async (req, res) => {
  console.log("****************[ getCategories ]*****************",req.body);
  let website = req.body.website.toLowerCase();
  let response = await service.getWebsiteDetailsService(website);
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

let updateSubCatagory = async (req, res) => {
  console.log("****************[ updateCatagoryString ]*****************", req.body);

  let subCategory = req.body.subCategory.toLowerCase();
  let newSubCategory = req.body.newSubCategory.toLowerCase();

  let response = await service.updateSubCatagoryService(subCategory, newSubCategory );
  if (response) {
    res.send(response);
  } else {
    res.send("Error");
  }
};

// let deletedProductsbyDate = async (req, res) => {
//   console.log("****************[ updateCatagoryString ]*****************", req.body);

//   let date = req.body.date;
//   let category = req.body.category.toLowerCase();
//   let subCategory = req.body.subCategory.toLowerCase();

//   let response = await service.deletedProductsbyDateService(date, category, subCategory);
//   if (response) {
//     res.send(response);
//   } else {
//     res.send("Error");
//   }
// };

module.exports = {
  getProductsByCategory,
  getProductsByKeyWords,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductCSV,
  getProductByPrice,
  getProductByWebsite,
  getWebsites,
  updateSubCatagory,
  getProductById,
  getWebsiteDetails
};
