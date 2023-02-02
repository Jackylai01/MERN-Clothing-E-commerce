import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

const Announcement = () => {
  return <Container>超級划算! 本月份全館商品特價中</Container>;
};

export default Announcement;
