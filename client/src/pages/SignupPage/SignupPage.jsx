import React, { useState } from "react";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import request from "../../utils/request";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./SignupPage.css";

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
      const response = await request('../../../../server/routes/auth', 'post', values);
      setStatus({ success: true, message: response.message });
      resetForm();
      //Chuyển sang trang đăng nhập khi đăng ký thành công
      window.location.href = "/login";
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <HeaderComponent />
      <div className="signup-container">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, status }) => (
            <Form>
              <h2>Đăng ký</h2>

              <label htmlFor="name">Họ và tên:</label>
              <Field type="text" id="name" name="name" required />
              <ErrorMessage name="name" component="div" />

              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" required />
              <ErrorMessage name="email" component="div" />

              <label htmlFor="phone">Số điện thoại:</label>
              <Field type="tel" id="phone" name="phone" required />
              <ErrorMessage name="phone" component="div" />

              <label htmlFor="address">Địa chỉ:</label>
              <Field type="text" id="address" name="address" required />
              <ErrorMessage name="address" component="div" />

              <label htmlFor="password">Mật khẩu:</label>
              <Field type="password" id="password" name="password" required />
              <ErrorMessage name="password" component="div" />

              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" required />
              <ErrorMessage name="confirmPassword" component="div" />

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
