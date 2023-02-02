import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  font-family: "Noto Sans TC", sans-serif;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-family: "Noto Sans TC", sans-serif;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>JACKY.</Logo>
        <Desc>
          嗨!!我是JACKY，我是一個會因為突然的一個點子，而花費大量時間全力投入的人，因此在因緣際會之下，我開始了學習程式的道路。
          本身自己也有兼職攝影的工作或剪輯的工作，曾經當過剪輯師，IG也歡迎大家追蹤，都多也攝影作品為主。
          建立這個網站是因為除了一方面想練習寫紀錄文章之外呢，一方面我自己也想記錄一下生活，
          並起在這裡販賣一些自己的商品，如:手作甜點、個人產品、蝦皮服飾等等。 (
          網頁開發: 前端:React+Redux 後端:Node.js+Express+MongoDB )
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>首頁</ListItem>
          <ListItem>購物車</ListItem>
          <ListItem>手作</ListItem>
          <ListItem>時尚</ListItem>
          <ListItem>配件</ListItem>
          <ListItem>關於我</ListItem>
          <ListItem>聯絡方式</ListItem>
          <ListItem>團隊</ListItem>
          <ListItem>技術文章</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          Taiwan New Taipei City
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> sn185672@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
