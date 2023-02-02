const mongoose = require("mongoose");

//訂單-status 為true 代表完成金流付款
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
    },
    currency: {
      type: String,
      enum: ["TWD", "USD"],
      default: "TWD",
    },
    packages: [
      {
        id: {
          type: String,
          default: Math.floor(Math.random() * 10000 * Math.random() * 20),
        },
        amount: {
          type: Number,
        },
        products: [
          {
            id: {
              type: String,
            },
            quantity: {
              type: Number,
              default: 1,
            },
            name: {
              type: String,
            },
            price: {
              type: Number,
            },
          },
        ],
      },
    ],
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LinePayOrder", OrderSchema);
