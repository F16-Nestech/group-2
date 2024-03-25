import "../../styles/SigninPage.css";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import request from "../../utils/authRequest";
import { SIGNIN_API } from "../../utils/apiConfig";

const SigninPage = () => {
  // Giá trị ban đầu cho form
  const initialValues = {
    email: "",
    password: "",
  };
  const [signinStatus, setSigninStatus] = useState({});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      // Gửi yêu cầu đăng nhập đến server
      const response = await request(SIGNIN_API, 'post', values);
      
      // Cập nhật trạng thái đăng nhập và reset form
      if (response.success) {
        setSigninStatus({ success: true, message: response.message });
      } else {
        setSigninStatus({ success: false, message: response.message});
      }
    } catch (error) {
      // Xử lý lỗi trong quá trình đăng nhập
      setSigninStatus({ success: false, message:"Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại." });
      setSubmitting(false);
    };
  }
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#429A9D',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#429A9D',
    },
  }));

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="signin-container">
        <Typography variant="h6">
          <span style={{ color: '#429a9d' }}> ĐĂNG NHẬP </span>
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="textField">
                <Typography>Email:</Typography>
                <Field as={TextField} type="email" name="email" required />
                <ErrorMessage name="email" component="div" />
              </div>

              <div className="textField">
                <Typography>Mật khẩu:</Typography>
                <Field as={TextField} type="password" name="password" required />
                <ErrorMessage name="password" component="div" />
              </div>
              <CustomButton variant="contained" disabled={isSubmitting} type="submit" className={signinStatus.message ? `message ${signinStatus.success ? 'success' : 'error'}` : ''}>
                Đăng nhập
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SigninPage;
