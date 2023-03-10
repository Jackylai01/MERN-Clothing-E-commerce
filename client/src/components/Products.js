import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  //呼叫products有cat的產品為優先
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          cat
            ? `https://jacky-clothing-e-commerce.onrender.com/api/products?category=${cat}`
            : "https://jacky-clothing-e-commerce.onrender.com/api/products"
        );

        setProducts(res.data);
      } catch (err) {}
    };
    setLoading(false);
    getProducts();
  }, [cat]);

  //Object.entries() 是直接取得所有 property 的 name 和 value，並以陣列回傳
  useEffect(() => {
    cat &&
      setFilteredProducts(
        //篩選出每個products的值
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  //使用js 原生地sort 進行排列組合
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  //若後端admin 發表產品沒有cat 會導致id不完全會出現警告，故這裡先以index表示
  return (
    <Container>
      {cat
        ? filteredProducts.map((item, index) => (
            <Product item={item} key={index} loading={loading} />
          ))
        : products
            .slice(0, 8)
            .map((item, index) => <Product item={item} key={index} loading={loading} />)}
    </Container>
  );
};

export default Products;
