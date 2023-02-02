const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//註冊-
router.post("/register", async (req, res) => {
  //使用者輸入的內容為req.body。透過crypto-js這個套件進行密碼加密
  const newUser = new User({
    ...req.body,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password, //要加密的字串-密碼
      process.env.PASS_SEC //secretkey
    ).toString(), //一定要加toString()
  });

  try {
    //儲存到後端資料庫
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//登入
router.post("/login", async (req, res) => {
  try {
    //從資料找到是否有這個使用者
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("User not found");

    //比較user的密碼跟當初註冊時password的secret是否一樣並解密
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    //格式轉換
    const OriginalPpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    //比較使用輸入的密碼跟加密過的密碼是否一樣
    if (OriginalPpassword !== req.body.password)
      return res.status(401).json("Wrong credentialsss!");

    //前面以上都一樣才會生成jwt的token。3天後過期自動登出
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" } //登入期限3天自動登出
    );

    //除了password 其它資料傳下去
    const { password, ...others } = user._doc;

    //成功後傳送資料與totoken
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
