var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  price: String,
  website: String,
  imgUrls: Array,
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

var SlidingBannerSchema = new mongoose.Schema({
  name: String,
  imgUrl: { type: Array, unique: true },
  category: String,
  keyword: String,
  sequence: { type: String, unique: true }
});

var Product = mongoose.model("Product", productSchema);
var MenProduct = mongoose.model("Men", productSchema);
var WomenProduct = mongoose.model("Women", productSchema);
var Gadget = mongoose.model("Gadget", productSchema);
var NewKeyword = mongoose.model("NewKeyword", newKeywordsSchema);

var SlidingBanner = mongoose.model("SlidingBanner", SlidingBannerSchema);

module.exports = {
  Product,
  MenProduct,
  WomenProduct,
  Gadget,
  NewKeyword,
  SlidingBanner
};
