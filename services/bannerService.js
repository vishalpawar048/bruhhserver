const { SlidingBanner } = require("../model/schema");

let addSlidingBannerService = body => {
  let slidingBanner = new SlidingBanner(body);
  return new Promise((resolve, reject) => {
    slidingBanner.save(function(err, result) {
      if (err) {
        reject(err);
        // console.error("error in saveNewKeyword");
      } else {
        resolve(result);
        // console.log("New Keyword added successfully");
      }
    });
  });
};

let deleteSlidingBannerService = sequenceNumber => {
  return new Promise((resolve, reject) => {
    SlidingBanner.deleteOne({ sequence: { $eq: sequenceNumber } }, function(err, result) {
      if (err) {
        reject(err);
        // console.error("error in saveNewKeyword");
      } else {
        resolve(result);
        // console.log("New Keyword added successfully");
      }
    });
  });
};

let getSlidingBannerService = () => {
  return new Promise((resolve, reject) => {
    SlidingBanner.find(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(
          (response = {
            Banners: result,
            Status: `Success`
          })
        );
      }
    });
  });
};

module.exports = {
  addSlidingBannerService,
  deleteSlidingBannerService,
  getSlidingBannerService
};
