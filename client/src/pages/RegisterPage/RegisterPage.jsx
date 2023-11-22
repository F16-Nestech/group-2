import React from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import './Register.css'

function RegisterPage() {
    return (
        <div className='container'>
            <HeaderComponent />

            <div className='register-content'>
                <h1>RegisterPage</h1>
            </div>

            <FooterComponent />
        </div>
        
    )
}

export default RegisterPage
