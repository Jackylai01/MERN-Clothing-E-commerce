# MERN-Clothing-E-commerce




<p align="left">
</p>

<h3 align="left">使用技術:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>


#
資料架構說明
#



```
backend/   後端
├── models  //資料庫
    ├── Cart.js        //購物車-建立購物車不等於訂單成立，我們可以透過這個Schema 設計關聯性資料，知道說哪一些商品曾經被哪一個顧客放到購物車，但沒有付款成功
    └── Newsletter.js  //訂閱電子報功能，未來擴充在後台可以發生郵件
    └── Order.js       //訂單，付款成功將改變裡面的status為true，幫助我們後台確認使用者是否付款
    └── Product.js     //商品資料
    └── User.js        //使用者資料，包含姓名、信箱、加密後的密碼、圖像、登入權限、地址、手機、性別(enum設計為男、女、其他)
└── routes
    ├── auth.js        //權限路由-設計註冊-登入-加密-生成認證的jwt
    └── cart.js        //購物車路由-建立、刪除、更新、根據userId找到顧客購買資訊
    ├── LinePay.js     //LinePay 金流-金流格式轉換、轉址設定、跨域請求、格式加密
    └── newslettter.js //電子報路由-使用者Post 到資料庫，後台Get所有的Email    
    ├── order.js       //訂單完成路由-建立訂單、刪除訂單、更新訂單、根據id找到單一筆訂單、根據id刪除單一筆訂單、LinePay資料格式轉換、每月收入計算
    └── product.js     //產品路由-建立、刪除、更新、讀取
    ├── user.js        //使用者路由-建立會員系統、後台管理系統統計
    └── verifyToken.js //權限路由 - Admin權限、一般登入權限
├── .env               //環境變數-隱藏相關私密資訊
├── .gitignore         //設定不上傳之檔案
├── .package-lock.json //鎖定版本
├── .package.json      //紀錄專案中所使用的所有套件與版本

client/   前端

├── public  
    ├── index.js       //渲染後要覆蓋的根目錄
└── src
    ├── components     //組件
    └── pages          //頁面
    └── Redux          //狀態管理
└── App.js             //路由管理
└── index.js           //渲染主入口
└── data.js            //輪播圖資料存放位置


```




