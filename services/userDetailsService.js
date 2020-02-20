const { User } = require("../model/schema");

let checkAndUpdateUserDetails = emailId => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { emailId: emailId },
      { $set: { emailId: emailId } },
      { upsert: true, returnOriginal: true },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(
            (response = {
              user: result.emailId,
              Status: `Email added successfully `
            })
          );
        }
      }
    );
  });
};

module.exports = {
  checkAndUpdateUserDetails
};
