const router = require("express").Router();
const Newsletter = require("../models/Newsletter");

//前端送出email，在Admin那裡處理送郵件的功能
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const data = new Newsletter({ email: email });
    data.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
