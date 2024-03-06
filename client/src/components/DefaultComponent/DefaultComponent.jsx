import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import './DefualtStyle.css';
const DefaultComponent = ({ children }) => {
    return (
        <div className='Default'>
            <div className='HeaderComponent'><HeaderComponent /></div>
            <div className='children'>{children}</div>
            <div className='FooterComponent'><FooterComponent /></div>
        </div>

    )
}
export default DefaultComponent
