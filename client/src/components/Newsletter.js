import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 20px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.form`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Label = styled.label`
  display: none;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  //訂閱電子報-送到後端Newsletter資料庫
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/newsletter", { email });
      setEmail(res.data);
      window.alert("送出成功");
    } catch (err) {
      window.alert(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>訂閱電子報</Desc>
      <Desc>收看最新的活動與產品資訊</Desc>
      <InputContainer onSubmit={sendEmail}>
        <Label htmlFor="email" />
        <Input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
