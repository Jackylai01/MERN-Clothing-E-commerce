const mongoose = require("mongoose");

//購物車-建立購物車不等於訂單成立，我們可以透過這個schema 知道說哪一些商品曾經被顧客放到購物車，但沒有買到
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    packages: [],
    orderId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
