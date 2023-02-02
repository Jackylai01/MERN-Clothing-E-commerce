const mongoose = require("mongoose");

//訂閱電子報或最新產品資訊
const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", NewsletterSchema);
