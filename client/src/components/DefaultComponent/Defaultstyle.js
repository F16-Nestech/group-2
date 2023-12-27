import styled from "styled-components";
export const Default = styled.div`
    max-width: 1000px;
    margin: 0 auto; /* Căn giữa */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`
export const Content = styled.div`
  flex: 1;
`;
export const Footer = styled.footer`
  flex-shrink: 0;
  padding-top: 30px
`;