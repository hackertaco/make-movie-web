const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  req.body.movieId;

  //mongoDB에서 FAVORITE 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
  //그 다음에 프론트에 숫자 정보 보내주기
});

router.post("/favorited", (req, res) => {
  //내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
  req.body.movieId;

  //mongoDB에서 FAVORITE 숫자를 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
  //그 다음에 프론트에 숫자 정보 보내주기
});
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});
router.post("/addToFavorite", (req, res) => {
  //내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
router.post("/getFavoriteMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
module.exports = router;
