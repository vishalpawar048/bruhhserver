const { saveFcmTokenService } = require("../services/userDetailsService");

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

module.exports = {
  saveFcmToken
};
