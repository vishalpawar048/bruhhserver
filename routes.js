const route = require("express").Router();
const products = require("./controller/products");
const banners = require("./controller/banners");
const categories = require("./controller/categories");

//Products
route.post("/products/addProduct", products.addProduct);
route.get("/products/getProductsByCategory/", products.getProductsByCategory);
route.get("/products/getProductsByKeyWords/", products.getProductsByKeyWords);
route.get("/products/getProductsByKeyWords/", products.getProductsByKeyWords);
//Banner
route.post("/banners/addSlidingBanner/", banners.addSlidingBanner);
route.get("/banners/getSlidingBanners/", banners.getSlidingBanners);
route.post("/banners/deleteSlidingBanner/", banners.deleteSlidingBanner);

// route.post("/addSlidingBanner", categories.addCategories);
// route.get("/getSlidingBanner", categories.getCategories);
// route.get("/getSlidingBanner", categories.getCategories);

module.exports = route;
