var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  price: String,
  website: String,
  imgUrls: { type: Array },
  category: String,
  keywords: String,
  rating: String,
  description: String,
  url: { type: String, unique: true }
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

var BannerSchema = new mongoose.Schema({
  type: String,
  name: String,
  imgUrl: { type: Array, unique: true },
  category: String,
  keyword: String,
  sequence: { type: String, unique: true }
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
  gender: String
});

var wishlistSchema = new mongoose.Schema({
  emailId: String,
  wishlist: Array,
  gender: String
});

var Product = mongoose.model("Product", productSchema);
var MenProduct = mongoose.model("Men", productSchema);
var WomenProduct = mongoose.model("Women", productSchema);
var Gadget = mongoose.model("Gadget", productSchema);
var NewKeyword = mongoose.model("NewKeyword", newKeywordsSchema);

var Category = mongoose.model("Category", CategorySchema);
var Banner = mongoose.model("Banner", BannerSchema);

var User = mongoose.model("User", userSchema);
var Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = {
  Product,
  MenProduct,
  WomenProduct,
  Gadget,
  NewKeyword,
  Banner,
  Category,
  User,
  Wishlist
};
