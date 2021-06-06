const { User } = require("../model/schema");

let checkAndUpdateUserDetails = (fcmToken, emailId) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { fcmToken: fcmToken },
      { $set: { emailId: emailId } },
      { upsert: true, returnOriginal: true },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              user: result,
              Status: `Email added successfully `
            })
          );
        }
      }
    );
  });
};

let saveFcmTokenService = (fcmToken, date) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { fcmToken: fcmToken },
      { $set: { fcmToken: fcmToken, date: date } },
      { upsert: true, returnOriginal: true },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              user: result,
              Status: `Email added successfully `
            })
          );
        }
      }
    );
  });
};

let saveUserDetails = (emailId, name) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { emailId: emailId },
      { $set: { emailId: emailId , name: name} },
      { upsert: true, returnOriginal: true },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              user: result,
              Status: `Email added successfully `
            })
          );
        }
      }
    );
  });
};

module.exports = {
  checkAndUpdateUserDetails,
  saveFcmTokenService,
  saveUserDetails
};
