import Home from "./pages/Home";
import ProdictList from "./pages/ProdictList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  //登入後的權限，限制非登入的狀態去某些路由
  const user = useSelector((state) => state.user.currentUser);

  // console.log(user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProdictList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/api/payment/linePay/confirm" element={<Confirm />} />
        <Route path="/success/:id" element={<Success />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
