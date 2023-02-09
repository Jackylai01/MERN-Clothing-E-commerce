import React from "react";
import StyledBadge from "@mui/material/Badge";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  text-align: center;
  align-items: center;
  margin-left: 25px;
  display: flex;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px 15px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "flex-end" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
   margin-right: 30px;
  ${mobile({ fontSize: "12px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  // const [allProducts, setAllProducts] = useState(null);
  // const [searchedResults, setSearchedResults] = useState(null);
  // const [searchText, setSearchText] = useState("");
  // const [searchTimeout, setSearchTimeout] = useState(null);

  //step 1 製作搜尋產品的功能。每個component，只要有用到navbar，一開始載入頁面fetch所有的產品資料
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await publicRequest.get("/products");
  //       if (res.statusText === "OK") {
  //         setAllProducts(res.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  //step 2 目前產品數量較少，之後產品超過20個才會製作。以下程式碼為參考 Stack Overflow 將每個字給切出來。如果是搜尋中文字把toLowerCase拿掉

  // const handleSearchChange = (e) => {
  //   clearTimeout(searchTimeout);
  //   setSearchText(e.target.value);

  //   setSearchTimeout(
  //     setTimeout(() => {
  //       const searchResults = allProducts.filter(
  //         (item) =>
  //           item.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //           item.desc.toLowerCase().includes(searchText.toLowerCase())
  //       );
  //       setSearchedResults(searchResults);
  //     })
  //   );
  // };

  //step 3搜尋的結果將開新的路由
  // const handleSearch = async () => {};

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder="Search"
              id="searchText"
              name="searchText"
              required
            />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" className="link">
            <Logo>JACKY.</Logo>
          </Link>
        </Center>
        <Right>
          <Link to={`/cart`}>
            <MenuItem>
              <StyledBadge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </StyledBadge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
