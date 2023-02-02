import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const Confirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionId = async () => {
      let orderId = window.location.search.slice(43, 82);
      let transactionId = window.location.search.slice(15, 34);
    
      
      try {
        //要在前端get到url 後端才有辦法，送出你的資料給linePay 做最後確認，所以要用window.location.search
        const res = await publicRequest.post(`/payment/linePay/confirm`, {
          orderId,
          transactionId,
        });

        await publicRequest.put(`/payment/paymentStatus`, {
          orderId,
        });

        if (res.data !== "付款成功") {
          navigate(`/success/${orderId}`);
        } else {
          window.alert("發生錯誤，付款失敗。請聯繫工作人員");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactionId();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
        }}
      >
        付款確認中...
      </div>
    </>
  );
};

export default Confirm;
