/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Col, Input } from "antd";
import {
  WrapperHeader,
  FirstHeader,
  FisrtHeaderLink,
  LastHeader,
  LastHeaderLink,
} from "./styleHeader";
import { ShoppingCartOutlined } from "@ant-design/icons";
import imageSrc from "../../assets/images/logo.png";
const onSearch = (value, _e, info) => console.log(info?.source, value);
function HeaderComponent() {
  return (
    <div className="Header">
      <FirstHeader>
        <p>Hotline: 0911183701</p>
        <FisrtHeaderLink>
          <a id="quantri" href="#">
            Quản trị Website
          </a>
          <a id="register" href="/register">
            Đăng kí
          </a>
          <a id="signin" href="/signin">
            Đăng nhập
          </a>
        </FisrtHeaderLink>
      </FirstHeader>
      <WrapperHeader>
        <Col span={8}>
          <img
            src={imageSrc}
            alt="Description of the image"
            style={{ width: "40%", height: "auto" }}
          />
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <Input.Search placeholder="Search" onSearch={onSearch} enterButton />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <a href="/orders">
            <ShoppingCartOutlined />
          </a>
        </Col>
      </WrapperHeader>
      <LastHeader>
        <LastHeaderLink>
          <a href="/">Trang chủ</a>
          <a href="">Giới thiệu</a>
          <a href="">Sản phẩm</a>
          <a href="">Tin tức</a>
          <a href="">Liên hệ</a>
        </LastHeaderLink>
      </LastHeader>
    </div>
  );
}

export default HeaderComponent;
