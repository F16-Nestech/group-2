import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import {Default,Content,Footer} from './Defaultstyle';
const DefaultComponent = ({ children }) => {
    return (
        <Default>
            <HeaderComponent />
            <Content>{children}</Content>
            <Footer>
                <FooterComponent />
            </Footer>
        </Default>
    )
}
export default DefaultComponent
