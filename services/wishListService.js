const { Wishlist, Product } = require("../model/schema");
var mongoose = require("mongoose");

let addWishListToDb = (emailId, id) => {
  //   let Wishlist = new Wishlist({ emailId: emailId, wishlist: id });
  return new Promise((resolve, reject) => {
    Wishlist.findOneAndUpdate(
      { emailId: emailId },
      { $set: { emailId: emailId }, $addToSet: { wishlist: id } },

      { upsert: true, returnOriginal: false },
      function(err, result) {
        if (err) {
          reject(err);
          console.error("error in saveNewKeyword");
        } else {
          resolve(result);
          console.log("New Keyword added successfully");
        }
      }
    );
  });
};

let getWishListByEmailService = emailId => {
  return new Promise((resolve, reject) => {
    Wishlist.find({ emailId: emailId }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

let removefromWishlistService = (emailId, id) => {
  return new Promise((resolve, reject) => {
    Wishlist.findOneAndUpdate(
      { emailId: emailId },
      { $set: { emailId: emailId }, $pull: { wishlist: id } },

      { upsert: true, returnOriginal: false },
      function(err, result) {
        if (err) {
          reject(err);
          console.error("error in saveNewKeyword");
        } else {
          resolve(result);
          console.log("New Keyword added successfully");
        }
      }
    );
  });
};

let getWishlistByIds = ids => {
  let arr = ids.map(ele => mongoose.Types.ObjectId(ele.id));
  return new Promise((resolve, reject) => {
    Product.find(
      {
        _id: {
          $in: ids
        }
      },
      function(err, result) {
        if (err) {
          reject(err);
          console.error("error in saveNewKeyword");
        } else {
          resolve(result);
          console.log("New Keyword added successfully");
        }
      }
    );
  });
};

module.exports = {
  addWishListToDb,
  getWishListByEmailService,
  removefromWishlistService,
  getWishlistByIds
};
