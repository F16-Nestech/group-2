import { Row } from "antd";
import styled from "styled-components";
export const WrapperHeader = styled(Row)`
  background-color: #262626;
  height: 15vh; /* Thay đổi tỷ lệ theo yêu cầu */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  a{
    .anticon {
      color: white;
      font-size: 2em;
      padding-right: 10px;
    }
    font-size: 1em;
    color: white;
    :hover {
      color: #429A9D;
    }
  }

`;
export const FirstHeader = styled(Row)`
  padding: 0.05em 1%;
  background-color: #333333;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const FisrtHeaderLink = styled.div`
display: flex;
flex-direction: row;
align-items: center;

a {
  color: white;
  text-decoration: none;
  margin-right: 2px; /* Khoảng cách giữa các liên kết */
  &:hover {
    color: #ffd700;
  }
}

/* Cách riêng cho từng liên kết */
#quantri {
  margin-right: 100px; /* Khoảng cách giữa 'Quản trị Website' và 'Đăng kí' */
}

#register {
  margin-right: 20px; /* Khoảng cách giữa 'Đăng kí' và 'Đăng nhập' */
}
`;
export const LastHeader = styled(Row)`
padding: 0.5em;
background-color: #429A9D;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
color: white;
`;
export const LastHeaderLink = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
a {
  margin: 0 2em;
  text-decoration: none;
  color: white;
  &:hover {
    color: #ffd700;
  }
}
`;