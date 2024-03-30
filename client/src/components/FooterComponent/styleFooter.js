import { Row } from "antd";
import styled from "styled-components";
export const LastFooter = styled(Row)`
    background-color: #262626;
  height: 30vh; /* Thay đổi tỷ lệ theo yêu cầu */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  a{
    color:white;
    :hover {
        color: #429A9D;
      }
  }
  p{
    color:white;
  }
`;
