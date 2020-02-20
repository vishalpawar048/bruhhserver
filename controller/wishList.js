const {
  addWishListToDb,
  removefromWishlistService,
  getWishListByEmailService,
  getWishlistByIds
} = require("../services/wishListService");
const { checkAndUpdateUserDetails } = require("../services/userDetailsService");

let addToWishlist = async (req, res) => {
  let emailId = req.body.emailId;
  let productId = req.body.productId;

  let response;

  if (emailId) {
    try {
      let userDetails = await checkAndUpdateUserDetails(emailId);
      if (userDetails.user) {
        let response = await addWishListToDb(emailId, productId);
        res.send(response);
      } else {
        res.send("error");
      }
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

let getWishlist = async (req, res) => {
  let emailId = req.params.emailId;
  let response = await getWishListByEmailService(emailId);
  let wishlist = await getWishlistByIds(response[0].wishlist);
  if (wishlist) {
    res.send(wishlist);
  } else {
    res.send("Error");
  }
};

let removefromWishlist = async (req, res) => {
  let emailId = req.body.emailId;
  let productId = req.body.productId;

  let response;

  if (emailId) {
    try {
      let userDetails = await checkAndUpdateUserDetails(emailId);
      if (userDetails.user) {
        let response = await removefromWishlistService(emailId, productId);
        res.send(response);
      } else {
        res.send("error");
      }
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Messege: "Email not exist"
    };
    res.send(response);
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removefromWishlist
};
