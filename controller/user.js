const { saveFcmTokenService, saveUserDetails } = require("../services/userDetailsService");

let saveFcmToken = async (req, res) => {
  console.log("****************[ addToWishlist ]*****************");
  let fcmToken = req.body.fcmToken;
  let date = req.body.date;

  let response;

  if (fcmToken && date) {
    try {
      response = await saveFcmTokenService(fcmToken, date);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Details: emailId,
      Status: "UserDetails not added"
    };
    res.send(response);
  }
};

let saveUserDetail = async (req, res) => {
  console.log("****************[ updateUser ]*****************",req.body);
  let emailId = req.body.emailId;
  let name = req.body.name ? req.body.name:"NA";

  let response;

  if (emailId) {
    try {
      response = await saveUserDetails(emailId, name);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Details: emailId,
      Status: "UserDetails not added"
    };
    res.send(response);
  }
};

module.exports = {
  saveFcmToken,
  saveUserDetail
};
