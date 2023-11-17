import React from 'react';
import { Col, Input } from 'antd';
import { WrapperHeader, WrapperTextHeader } from './style';


function HeaderComponent() {
    return (
        <div class="Header">
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>OSM</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <Input placeholder="Search" />;
                </Col>
                <Col span={6}>GIO HANG</Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent
