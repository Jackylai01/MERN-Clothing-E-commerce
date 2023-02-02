const router = require("express").Router();
const axios = require("axios");
const uuid = require("uuid4");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");
const Order = require("../models/Order");
const Carts = require("../models/Cart");

const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_RETURN_HOST,
  LINEPAY_SITE,
  LINEPAY_VERSION,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env;

//從order models 裡面找到相關數值再引入
//取出.env 的環境變數

const orders = {};

//route API測試
router.get("/", (req, res) => {
  res.json({ msg: "APItest" });
});

//依據_id找到每一筆商品資料，並將整筆資料新增一個訂單(orderId)。依照官網文件所寫，要跟linePay API 溝通需要OrderId
router.get("/checkout/:_id", async (req, res) => {
  try {
    const id = await Carts.findById(req.params); //根據id網址找到整筆資料
    id.orderId = uuid();
    orders[id.orderId] = id;
    id.save();
    res.json(id);
  } catch (err) {
    res.json(err.messages);
  }
});

//linepay 指定的資料格式 body
router.get("/linePayOrder/:_id", async (req, res) => {
  try {
    //step1 先從購物車當中篩選出需要的body
    let data = await Carts.findById(req.params._id, [
      "packages.name",
      "packages.quantity",
      "packages.price",
      "orderId",
    ]);

    //step2 fetch 到的資料有陣列的格式，這裡我先預設一些變數，後面用foreach或.map來展開並放到變數內。需注意資料格式，否則金流不會過
    let quantity = 0;
    let price = 0;
    let products = [];

    data.packages.forEach((item) => {
      quantity += item.quantity;
      price += item.price * item.quantity;
      products.push(item);
      return { quantity, price, products };
    });

    //step3 整理完成LINEPAY 要的格式並存在 Order裡面
    const LinePayData = await Order.create({
      amount: price,
      currency: "TWD",
      orderId: data.orderId,
      packages: [
        {
          id: uuid(),
          amount: price,
          products: products,
        },
      ],
    });

    //step4 完成
    res.json(LinePayData);
  } catch (err) {
    console.log(err);
  }
});

//lienPay 指定格式，資料格式須注意跟linePay 的格式一樣，否則將會報錯--參考官方文件
router.post("/checkout/:_id", async (req, res) => {
  //若傳送非linePay指定之資料格式，會報錯，所以要先把_id 之類的資料先篩選出來
  const id = await Order.findById(req.params._id).select(
    "-_id -createdAt -updatedAt -__v -packages.products._id -packages.products.title -status -address -phone -username -email -packages._id "
  );
  try {
    const linePayBody = createLinePayBody(id);
    const uri = "/payments/request";
    const headers = createSignature(uri, linePayBody);
    //送出給linePay的資訊
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const LinePayRes = await axios.post(url, linePayBody, { headers });
    if (LinePayRes?.data?.returnCode === "0000") {
      res.json(LinePayRes?.data?.info.paymentUrl.web);
    }
  } catch (err) {
    res.json(err.messages);
  }
});

//lienPay 指定格式，產品繳費成功後，要做這個路由來做最後的驗證--參考官方文件
router.post("/linePay/confirm", async (req, res) => {
  try {
    //step1 前端將網址上的url擷取下來後，送req.body
    let { transactionId, orderId } = req.body;

    //step2 根據找到的結果，在order資料庫找到對應的orderId
    let data = await Order.find({ orderId });

    //step3 LinePay 指定傳送的格式--參考官方文件
    const uri = `/payments/${transactionId}/confirm`;
    const linePayBody = {
      amount: data[0].amount,
      currency: "TWD",
    };
    //step4--建立加密內容-跟前面的做法一樣
    const headers = createSignature(uri, linePayBody);

    //step5--將結果發送到LinePay API
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });

    //step6 前端收到這個付款成功，導向success的page
    if (linePayRes?.data?.returnCode === "0000") {
      res.json({ msg: "付款成功" });
    } else {
      res.status(400).send({
        message: linePayRes,
      });
    }
  } catch (err) {
    res.json(err.messages);
  }
});

//當顧客付款成功，將路由重新導向/success/id 這個page
router.get("/success/:id", async (req, res) => {
  const { orderId } = req.params;
  res.json({ orderId });
});

//這個api 是針對 status 購買完成的狀態設計，防止顧客進入付款頁面後，沒付款關掉網頁
//當付款成功 到路由/linePay/confirm 後，呼叫這支api改變資料庫的的status 為true 代表付款完成
router.put("/paymentStatus", async (req, res) => {
  try {
    let orderId = req.body.orderId;
    let data = await Order.find({ orderId });

    data[0].status = true;
    data[0].save();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//建立傳送linePay body的格式
function createLinePayBody(id) {
  return {
    ...id._doc,
    currency: "TWD",
    redirectUrls: {
      confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
      cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
    },
  };
}

//將產品資料與路由進行hash加密，LinePay 規定要用SHA256
function createSignature(uri, linePayBody) {
  const nonce = new Date().getTime();
  const encrypt = hmacSHA256(
    `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
      linePayBody
    )}${nonce}`,
    LINEPAY_CHANNEL_SECRET_KEY
  );
  const signature = Base64.stringify(encrypt);
  //linePay 指定headers格式
  const headers = {
    "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
    "Content-Type": "application/json",
    "X-LINE-Authorization-Nonce": nonce,
    "X-LINE-Authorization": signature,
  };
  return headers;
}
module.exports = router;
