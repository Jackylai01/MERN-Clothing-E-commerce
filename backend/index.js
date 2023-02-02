const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const ProductsRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const cors = require("cors");
const LinePayRouter = require("./routes/LinePay");
const CartRouter = require("./routes/cart");
const NewsletterRouter = require("./routes/newsletter");

//連結到mongodb atlas 雲端資料庫
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connection Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

//中間件-middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//跨域設定-非簡單請求
const corsOptions = {
  origin: [
    "https://sandbox-api-pay.line.me/v3/payments/request",
    "http://localhost:8080",
    "https://jacky-clothing-e-commerce.onrender.com"
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

//跨域套件-cors 使用設定參考MDN
app.use(cors(corsOptions));

//中間件-路由位置
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", LinePayRouter);
app.use("/api/newsletter", NewsletterRouter);



const port = process.env.PORT || 8080;

//伺服器
app.listen(port, () => {
  console.log("Server is running on port 8080");
});
