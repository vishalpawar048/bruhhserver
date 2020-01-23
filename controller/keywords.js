const regex = {
  menPattern: new RegExp("^(men|man|mens|boy|boys|mans|him|he)", "i"),
  womenPattern: new RegExp(
    "^(women|womens|women|woman|womans|girl|girls|gil|her|she|ladies|lady)",
    "i"
  )
};

module.exports = {
  regex
};
