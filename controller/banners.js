let {
  addSlidingBannerService,
  deleteSlidingBannerService,
  getSlidingBannerService
} = require("../services/bannerService");

let addSlidingBanner = async (req, res) => {
  let body = req.body;
  let name = req.body.name;
  let category = req.body.category;
  let imgUrl = req.body.imgUrl;
  let keyword = req.body.keyword;
  let sequence = req.body.sequence;

  let response;

  if (name && category && imgUrl && keyword && sequence) {
    try {
      let response = await addSlidingBannerService(body);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Product: product,
      Status: "name, category,imgUrl,keyword,sequence on of this parameter is missing or empty"
    };
    res.send(response);
  }
};

let deleteSlidingBanner = async (req, res) => {
  let sequenceNumber = req.body.sequenceNumber;

  let response;

  if (sequenceNumber) {
    try {
      let response = await deleteSlidingBannerService(sequenceNumber);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  } else {
    response = {
      Message: "Failed",
      Status: "sequenceNumber is missing or empty"
    };
    res.send(response);
  }
};

let getSlidingBanners = async (req, res) => {
  try {
    let response = await getSlidingBannerService();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addSlidingBanner,
  deleteSlidingBanner,
  getSlidingBanners
};
