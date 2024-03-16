import "../../styles/SignupPage.css";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import request from "../../utils/authRequest";
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
  // const handleSubmit = async (values, { setSubmitting, resetForm, responseStatus }) => {
  //   const navigate = useNavigate();

  const [signupStatus, setSignupStatus] = useState({});

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.password !== values.confirmPassword) {
        setSignupStatus({
          success: false,
          message: "Mật khẩu xác nhận không khớp.",
        });
        setSubmitting(false);
        return;
      }
      console.log(values);
      const response = await request(SIGNUP_API, "post", values);
      setSignupStatus({ success: true, message: response.message });
      resetForm();
    } catch (error) {
      setSignupStatus({
        success: false,
        message: "Đã xảy ra lỗi trong quá trình đăng ký.",
      });
      setSubmitting(false);
    }
  };
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#429A9D", // Thay đổi màu nền tại đây
    marginTop: "10px", // Thêm khoảng cách phía trên tại đây
    "&:hover": {
      backgroundColor: "#429A9D", // Màu nền khi hover
    },
  }));
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="signup-container">
        <Typography variant="h6">
          <span style={{ color: "#429a9d" }}> ĐĂNG KÝ TÀI KHOẢN </span>
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="textField">
                <Typography>Họ và tên:</Typography>
                <Field as={TextField} type="text" name="name" required />
                <ErrorMessage name="name" component="div" />
              </div>

              <div className="textField">
                <Typography>Email:</Typography>
                <Field as={TextField} type="email" name="email" required />
                <ErrorMessage name="email" component="div" />
              </div>

              <div className="textField">
                <Typography>Số điện thoại:</Typography>
                <Field as={TextField} type="tel" name="phone" required />
                <ErrorMessage name="phone" component="div" />
              </div>

              <div className="textField">
                <Typography>Địa chỉ:</Typography>
                <Field as={TextField} type="text" name="address" required />
                <ErrorMessage name="address" component="div" />
              </div>

              <div className="textField">
                <Typography>Mật khẩu:</Typography>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  required
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="textField">
                <Typography>Xác nhận mật khẩu:</Typography>
                <Field
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  required
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <CustomButton
                variant="contained"
                disabled={isSubmitting}
                type="submit"
                className={
                  signupStatus.message
                    ? `message ${signupStatus.success ? "success" : "error"}`
                    : ""
                }
              >
                Đăng ký
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignupPage;
