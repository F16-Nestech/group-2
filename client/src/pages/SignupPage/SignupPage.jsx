import React from "react";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./SignupPage.css";

import request from "../../utils/request";
import { SIGNUP_API } from "../../utils/apiConfig";

const SignupPage = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      //Call API đăng ký
      const response = await request(SIGNUP_API, 'post', values);
      setStatus({ success: true, message: response.message });
      resetForm();
      //Chuyển sang trang đăng nhập khi đăng ký thành công
      // const navigate = useNavigate();
      // navigate('/login', { replace: true });
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
