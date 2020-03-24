let {
  addBannerService,
  deleteBannerService,
  getBannersService
} = require("../services/bannerService");

let addBanner = async (req, res) => {
  console.log("****************[ addBanner ]*****************");
  let body = req.body;
  let type = req.body.type;
  let banners = req.body.banners;

  let response;

  if (type && banners) {
    try {
      let response = await addBannerService(body);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Status: "type or banners parameter is missing or empty"
    };
    res.send(response);
  }
};

let deleteBanner = async (req, res) => {
  console.log("****************[ deleteBanner ]*****************");

  let sequence = req.body.sequence;
  let type = req.body.type;

  let response;

  if (type && sequence) {
    try {
      let response = await deleteBannerService(type, sequence);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "type or sequence is missing"
    };
    res.send(response);
  }
};

let getBanners = async (req, res) => {
  console.log("****************[ getBanners ]*****************");

  let type = req.body.type;
  let response;
  if (type) {
    try {
      response = await getBannersService(type);
      res.send(response[0]);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "type is missing or empty"
    };
    res.send(response);
  }
};

module.exports = {
  addBanner,
  deleteBanner,
  getBanners
};
