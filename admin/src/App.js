import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/UserList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/Login/Login";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  let token = useSelector((state) => state.user.currentUser);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    if (token) {
      token.accessToken ? setAdmin(true) : setAdmin(false);
    }
  }, [token]);

  return (
    <>
      <Topbar />
      {admin && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        {admin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
