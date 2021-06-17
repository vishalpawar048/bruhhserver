var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  price: String,
  website: String,
  imgUrls: Array,
  category: String,
  subCategory: String,
  keywords: String,
  rating: String,
  description: String,
  url: { type: String, unique: true },
  createdAt: Date,
});

productSchema.index(
  {
    name: "text",
    description: "text",
    keywords: "text",
    website: "text"
  },
  {
    weights: {
      name: 5,
      keywords: 4,
      description: 1
    }
  }
);

var newKeywordsSchema = new mongoose.Schema({
  query: String
});

// var BannerSchema = new mongoose.Schema({
//   type: String,
//   name: String,
//   imgUrl: { type: Array, unique: true },
//   category: String,
//   keyword: String,
//   sequence: { type: String, unique: true }
// });

var BannerSchema = new mongoose.Schema({
  type: String,
  banners: Array
});

var CategorySchema = new mongoose.Schema({
  name: String,
  imgUrl: { type: Array, unique: true },
  category: String,
  keyword: String,
  sequence: { type: String, unique: true }
});

var userSchema = new mongoose.Schema({
  name: String,
  emailId: String,
  gender: String,
  fcmToken: String,
  date: String
},{ timestamps: { createdAt: 'created_at' }});

var wishlistSchema = new mongoose.Schema({
  emailId: String,
  wishlist: Array,
  gender: String
});

var websiteSchema = new mongoose.Schema({
  name:String,
  deliveryRating: String,
  returnPolicy: String,
  productsQuality: String,
  logo: String,
  description: String,
  createdAt: Date,
});

var websiteCommentsSchema = new mongoose.Schema({
  website: String,
  userId: String,
  emailId:String,
  comment:String,
  websiteRating: String,
  productsQualityRating: String,
  deliveryRating: String,
  returnPolicyRating:String,
  createdAt: Date,
});

var productCommentsSchema = new mongoose.Schema({
  productId:String,
  name: String,
  website: String,
  userId: String,
  emailId:String,
  comment:String,
  productRating: String,
  createdAt: Date,
});

var Product = mongoose.model("Product", productSchema);
var Website = mongoose.model("Website", websiteSchema);
var MenProduct = mongoose.model("Men", productSchema);
var WomenProduct = mongoose.model("Women", productSchema);
var Gadget = mongoose.model("Gadget", productSchema);
var NewKeyword = mongoose.model("NewKeyword", newKeywordsSchema);

var Category = mongoose.model("Category", CategorySchema);
var Banner = mongoose.model("Banner", BannerSchema);

var User = mongoose.model("User", userSchema);
var Wishlist = mongoose.model("Wishlist", wishlistSchema);

var WebsiteComments = mongoose.model("WebsiteComments", websiteCommentsSchema);
var ProductComments = mongoose.model("ProductComments", productCommentsSchema);



module.exports = {
  Product,
  MenProduct,
  WomenProduct,
  Gadget,
  NewKeyword,
  Banner,
  Category,
  User,
  Wishlist,
  Website,
  WebsiteComments,
  ProductComments
};
