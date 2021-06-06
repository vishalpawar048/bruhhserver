const {
  addWishListToDb,
  removefromWishlistService,
  getWishListByEmailService,
  getWishlistByIds
} = require("../services/wishListService");
const { checkAndUpdateUserDetails } = require("../services/userDetailsService");

let addToWishlist = async (req, res) => {
  console.log("****************[ addToWishlist ]*****************");
  // let fcmToken = req.body.fcmToken;
  let emailId = req.body.emailId;
  let productId = req.body.productId;

  let response;

    try {
      // let userDetails = await checkAndUpdateUserDetails(fcmToken, emailId);
      if (emailId && productId) {
        let response = await addWishListToDb(emailId, productId);
        res.send(response);
      } else {
        res.send("No Email or Product Id");
      }
    } catch (error) {
      res.send(error);
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
    console.log(">>>>>>>>>>>>>>>>>>>>res",res)
    res.send({ Status: "error" });
  }
};

let removefromWishlist = async (req, res) => {
  console.log("****************[ removefromWishlist ]*****************");

  let fcmToken = req.body.fcmToken;
  let emailId = req.body.emailId;
  let productId = req.body.productId;

  let response;

  if (emailId) {
    try {
      let userDetails = await checkAndUpdateUserDetails(fcmToken, emailId);
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
