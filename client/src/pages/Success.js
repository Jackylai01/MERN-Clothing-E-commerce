import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const SuccessContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const P = styled.p``;

const H3 = styled.h3`
  margin: 1rem 0rem;
`;

const Success = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];

  return (
    <>
      <Navbar />
      <SuccessContainer>
        <H3>付款成功</H3>
        <P>
          您的訂單編號:<span>{orderId}</span>
        </P>
        <Link
          to="/"
          className="link"
          style={{ margin: "1rem 0rem", color: "teal", fontWeight: "600" }}
        >
          回首頁
        </Link>
      </SuccessContainer>
      <Footer />
    </>
  );
};

export default Success;
