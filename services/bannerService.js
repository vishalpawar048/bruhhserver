const { Banner } = require("../model/schema");

let addBannerService = body => {
  let banner = new Banner(body);
  return new Promise((resolve, reject) => {
    banner.save(function(err, result) {
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

let deleteBannerService = (type, sequence) => {
  return new Promise((resolve, reject) => {
    Banner.deleteOne({ type: { $eq: type }, sequence: { $eq: sequence } }, function(err, result) {
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

let getBannersService = type => {
  return new Promise((resolve, reject) => {
    Banner.find({ type: { $eq: type } }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  addBannerService,
  deleteBannerService,
  getBannersService
};
