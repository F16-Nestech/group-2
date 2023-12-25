import React from "react";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./SignupPage.css";

import request from "../../utils/request";
import { SIGNUP_API } from "../../utils/apiConfig";
import { callCMSAPI } from "../../utils/apiUtils";

const SignupPage = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, responseStatus }) => {
    const navigate = useNavigate();

    try {
      //Call API đăng ký
      const response = await request(SIGNUP_API, 'post', values);
      
      if (response.success) {
        // Call API đăng ký trên CMS
        const cmsResponse = await callCMSAPI(values);

        if (cmsResponse.success) {
          responseStatus({ success: true, message: 'Đăng ký thành công' });
          resetForm();
          //Chuyển sang trang đăng nhập khi đăng ký thành công
          navigate('/login', { replace: true });
        } else {
          // Phản hồi từ CMS thất bại
          responseStatus({ success: false, message: 'Đăng ký thất bại trên CMS' });
        }
      } else {
        responseStatus({ success: true, message: response.message });
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const formField = ({ label, type, id, name }) => {
    <div className="textField">
      <label htmlFor={id}>{label}</label>
      <Field type={type} id={id} name={name} required />
      <ErrorMessage name={name} component="div" />
    </div>
  }

  return (
    <div className="container">
      <HeaderComponent />
      <div className="signup-container">
        <p>
          <a href="/homePage">Trang chủ</a> &#62&#62
          <b style={{ color: '#429a9d' }}>Đăng ký tài khoản</b>
        </p>
        <h1 className="title">
          <span> ĐĂNG KÝ TÀI KHOẢN </span>
        </h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, status }) => (
            <Form>
              <h2>Đăng ký</h2>

              {formField('Họ và tên:', 'text', 'name', 'name')}
              {formField('Email:', 'email', 'email', 'email')}
              {formField('Số điện thoại:', 'tel', 'phone', 'phone')}
              {formField('Địa chỉ:', 'text', 'address', 'address')}
              {formField('Mật khẩu:', 'password', 'password', 'password')}
              {formField('Xác nhận mật khẩu:', 'password', 'confirmPassword', 'confirmPassword')}

              <button type="submit" disabled={isSubmitting}>Đăng ký</button>
              
              {status && (
                <div className={`message ${status.success ? 'success' : 'error'}`}>
                  {status.message}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <FooterComponent />
    </div>
  );
};

export default SignupPage;
