const router = require("express").Router();
const Order = require("../models/Order");

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//建立新訂單
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//根據訂單id去修改
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deletd...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//linePay 指定資料格式

router.get("/linePayOrder/:_id", async (req, res) => {
  try {
    let data = await Order.findById(req.params._id, [
      "_id",
      "amount",
      "currency",
      "packages.id",
      "packages.amount",
      { "packages.products.name": "packages.products.title" },
      "packages.products.quantity",
      "packages.products.price",
      "orderId",
    ]);

    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//後端管理員的api 根據id 找到註冊這個電商平台的使用者是誰
router.get("/find/:userId", async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//獲得全部的訂單-(有包含已付款、未付款)
//未付款可能的情況，顧客點擊購買但到了轉址的付款頁面，沒付錢就關掉
//或是網頁出現bug
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//獲得月收入數據
router.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**未完成
 * *  * /統計每一天內店鋪商品的最低價和最高價，平均最低價
 *案例參考:
 *Goods.aggregate([
  {
    $match: {
      number: {$gte:100} //匹配number>=100的记录
   }
  },
  {
     $project : {
         day : {$substr: [{"$add":["$createTime", 28800000]}, 0, 10] },//时区数据校正，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
         "nowPriceL": 1, //设置原有nowPriceL为1，表示结果显示原有字段nowPriceL
         "nowPriceH":1, //设置原有nowPriceH为1，表示结果显示原有字段nowPriceH
         avgNowPriceL:{$toDouble:"$nowPriceL"},//把最低价转换为小数
         avgNowPriceH:{$toDouble:"$nowPriceH"},//把最高价转换为小数
         "dayNumber":1 //每组内有多少个成员
     },
  },

{
  $group: {
    _id:"$day", //按照$day进行分组（一组为1天）
    nowPriceL:{$min: "$nowPriceL"}, //查找组内最小的nowPriceL
    nowPriceH:{$max: "$nowPriceH"}, //查找组内最大的nowPriceH
    avgNowPriceL:{$avg:"$avgNowPriceL"},//统计每一天内店铺商品的平均最低价
    avgNowPriceH:{$avg:"$avgNowPriceH"},//统计每一天内店铺商品的平均最高价
    dayNumber:{$sum:1}
  }
},
{
  $sort: {
    nowPriceL: 1//执行完 $group，得到的结果集按照nowPriceL升序排列
  }
}]).exec(function (err, goods){
//返回结果
console.log(goods);
});
 */
//統計每一天內店鋪商品的最低價和最高價，平均最低價，

module.exports = router;
