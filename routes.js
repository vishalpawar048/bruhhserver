const route = require("express").Router();
const products = require("./controller/products");
const banners = require("./controller/banners");
const categories = require("./controller/categories");
const wishlist = require("./controller/wishlist");
const user = require("./controller/user");
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

//User

route.post("/user/saveFcmToken", user.saveFcmToken);

//Products
route.post("/products/addProduct", products.addProduct);
route.post("/products/updateProduct", products.updateProduct);
route.post("/products/getProductsByCategory/", products.getProductsByCategory);
route.post("/products/getWebsiteDetails/", products.getWebsiteDetails);
route.post("/products/getProductsByKeyWords/", products.getProductsByKeyWords);
route.post("/products/updateSubCatagory/", products.updateSubCatagory);
route.post("/products/deleteProduct", products.deleteProduct);
route.post("/products/addProductCSV", upload.single("CSV"), products.addProductCSV);
route.post("/products/getProductByPrice", products.getProductByPrice);
route.post("/products/getProductByWebsite", products.getProductByWebsite);
route.get("/products/getWebsites", products.getWebsites);
route.post("/products/getProductById", products.getProductById);



//Categories
route.post("categories/addCategory", categories.addCategory);
route.post("categories/updateCategory", categories.updateCategory);
// route.get("categories/getCategories", categories.getCategories);
route.get("categories/deleteCategory", categories.deleteCategory);

//Banner
route.post("/banners/addBanner/", banners.addBanner);
//route.post("/banners/UpdateBanner/", banners.UpdateBanner);
route.post("/banners/getBanners/", banners.getBanners);
route.post("/banners/deleteBanner/", banners.deleteBanner);

//Wishlist
route.post("/wishlist/addToWishlist", wishlist.addToWishlist);
route.post("/wishlist/removefromWishlist", wishlist.removefromWishlist);
route.get("/wishlist/getWishlist/:emailId", wishlist.getWishlist);
// route.get("wishlist/deleteCategory", wishlist.deleteCategory);

//Banner: NewArrivals
// route.post("/banners/addSlidingBanner/", banners.addSlidingBanner);
// route.post("/banners/UpdateSlidingBanner/", banners.UpdateSlidingBanner);
// route.get("/banners/getSlidingBanners/", banners.getSlidingBanners);
// route.post("/banners/deleteSlidingBanner/", banners.deleteSlidingBanner);

// //Banner: Middle
// route.post("banners/addMiddleBanner", banners.addMiddleBanner);
// route.post("/banners/UpdateSlidingBanner/", banners.UpdateSlidingBanner);
// route.get("banners/getMiddleBanner", banners.getMiddleBanner);
// route.get("banners/deleteMiddleBanner", banners.deleteMiddleBanner);

// //Banner: ShopByCategory
// route.post("banners/addMiddleBanner", banners.addMiddleBanner);
// route.post("/banners/UpdateSlidingBanner/", banners.UpdateSlidingBanner);
// route.get("banners/getMiddleBanner", banners.getMiddleBanner);
// route.get("banners/deleteMiddleBanner", banners.deleteMiddleBanner);

// //Banner: Last
// route.post("banners/addMiddleBanner", banners.addMiddleBanner);
// route.post("/banners/UpdateSlidingBanner/", banners.UpdateSlidingBanner);
// route.get("banners/getMiddleBanner", banners.getMiddleBanner);
// route.get("banners/deleteMiddleBanner", banners.deleteMiddleBanner);

module.exports = route;
