import React from 'react';
import { Col, Input,Image} from 'antd';
import { LastFooter} from './styleFooter';
import imageSrc from '../../assets/images/Brands.jpg';
function FooterComponent() {
    return (
        <div className="footer">
            <Image
                // width={200}
                src={imageSrc}
                alt="Description of the image"
            />
            <LastFooter>
              <Col span={8}>
                <p>GIỚI THIỆU</p>
                <ul>
                    <li><a  href="">Về chúng tôi</a></li>
                    <li><a  href="">Tổng quan về công ty</a></li>
                    <li><a  href="">Chương trình khuyến mãi</a></li>
                    <li><a  href="">Cẩm nang mua sắm</a></li>
                </ul>
              </Col>
              <Col span={8}>
                <p>LIÊN HỆ - HỢP TÁC</p>
                <ul>
                    <li><a  href="">Dành cho doanh nghiệp</a></li>
                    <li><a  href="">Liên hệ</a></li>
                    <li><a  href="">Tuyển dụng</a></li>
                </ul>
              </Col>
              <Col span={8}>
                <p>THÔNG TIN CÔNG TY</p>
                <p>F16</p>
                <ul>
                    <li><p>Thịnh Liêt, Hoàng Mai, Hà Nội</p></li>
                    <li><p>phungvanduy10a4@gmail.com</p></li>
                    <li><p>Phone: 0911183701</p></li>
                </ul>
              </Col>
            </LastFooter>
        </div>
    )
}

export default FooterComponent;

