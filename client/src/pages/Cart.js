import styled from "styled-components";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { publicRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  margin: 1rem 0rem;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border: none;
`;

const LineButton = styled.div`
  background-color: rgb(8, 191, 91);
  cursor: pointer;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 10px;
`;

const Navigate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CheckOrderContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #131313;
  opacity: 0.8;
`;

const CheckOrder = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  height: 70%;
  background-color: white;
`;

const MainOrder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding-left: 1.5rem;
`;

const OrderContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Lable = styled.label`
  padding: 1rem 0rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
`;

const initialState = {
  username: "",
  email: "",
  address: "",
  phone: "",
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(initialState);
  const [id, setId] = useState("");

  //讓使用者輸入的inputs= state
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  //給linyPay 的api
  const handleLinePayOrder = async (e) => {
    e.preventDefault();
    try {
      //step 1 送出linePay body 資料格式轉換的請求--需注意如果格是錯誤，linePay金流不會過
      const res = await publicRequest.get(`/payment/linePayOrder/${id}`);

      //step 2儲存到後端order 這個資料庫
      const linePayBody = await publicRequest.post(
        `/payment/checkout/${res.data._id}`
      );

      //step3 進入轉址的付款介面
      window.open(linePayBody.data, "_self"); //進入付款頁面 //_self是在指打開一個新分頁
    } catch (err) {
      console.log(err);
    }
  };

  //建立orderId
  const createOrderId = async () => {
    setOpen(true);
    //step1 將購物車的資料送到後端cart這個資料庫進行處
    const res = await publicRequest.post(`/carts`, cart);
    setId(res.data._id);
    //step2 如果status 200 成功就送出一個get 讓後端生成一筆uuid
    if (res.status === 200) {
      await publicRequest.get(`/payment/checkout/${res.data._id}`);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {open && (
        <>
          <CheckOrderContainer>
            <CheckOrder>
              <MainOrder>
                <OrderContainer onSubmit={handleLinePayOrder}>
                  <Lable>您的付款總金額:${cart.amount}</Lable>
                  <Lable htmlFor="username">姓名</Lable>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChangeInput}
                    required
                  />
                  <Lable htmlFor="email">電子信箱</Lable>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChangeInput}
                    required
                  />
                  <Lable htmlFor="address">請輸入地址</Lable>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    onChange={handleChangeInput}
                    required
                  />
                  <Lable htmlFor="phone">聯絡電話</Lable>
                  <Input
                    id="phone"
                    type="text"
                    name="phone"
                    onChange={handleChangeInput}
                    required
                  />
                  <Button type="submit">前往付款</Button>
                </OrderContainer>
              </MainOrder>
              <CloseIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setOpen(false)}
              />
            </CheckOrder>
          </CheckOrderContainer>
        </>
      )}
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => dispatch(resetCart())}>
            清空購物車
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.quantity === 0 ? (
              <Navigate>
                <div>您的購物車沒有商品</div>
                <Link
                  to="/"
                  className="link"
                  style={{ color: "red", fontWeight: "500" }}
                >
                  回首頁
                </Link>
              </Navigate>
            ) : (
              cart.packages
                .map((product) => (
                  <Product key={Math.floor(Math.random() * 1000)}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))
                .splice(0, 1000)
            )}
            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>訂單資訊</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>小計</SummaryItemText>
              <SummaryItemPrice>$ {cart.amount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>運送費</SummaryItemText>
              <SummaryItemPrice>$ + 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>購物折扣</SummaryItemText>
              <SummaryItemPrice>$ -0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>
                Total <h6>總計</h6>
              </SummaryItemText>
              <SummaryItemPrice>$ {cart.amount}</SummaryItemPrice>
            </SummaryItem>
            <LineButton onClick={createOrderId}>Line Pay</LineButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
