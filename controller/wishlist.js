const {
  addWishListToDb,
  removefromWishlistService,
  getWishListByEmailService,
  getWishlistByIds
} = require("../services/wishListService");
const { checkAndUpdateUserDetails } = require("../services/userDetailsService");

let addToWishlist = async (req, res) => {
  console.log("****************[ addToWishlist ]*****************");

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
  console.log("****************[ getWishlist ]*****************");

  let emailId = req.params.emailId;
  let wishlist;
  let response = await getWishListByEmailService(emailId);
  if (response[0]) {
    wishlist = await getWishlistByIds(response[0].wishlist);
  } else {
    wishlist = null;
  }

  if (wishlist) {
    res.send({ wishlist: wishlist, Status: "success" });
  } else {
    res.send({ Status: "error" });
  }
};

let removefromWishlist = async (req, res) => {
  console.log("****************[ removefromWishlist ]*****************");

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
