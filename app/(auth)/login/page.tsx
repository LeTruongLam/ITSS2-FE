"use client";
import React, { useState } from "react";
import "./login.css";
import { Button, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TheLogin = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  const handleInputChange = (e: any) => {
    setUser({
      ...user,
      user: { ...user.user, [e.target.name]: e.target.value },
    });
  };

  const validateForm = () => {
    let isValid = true;

    if (!user.user.email) {
      message.warning("Please enter your email");
      isValid = false;
    }

    if (!user.user.password) {
      message.warning("Please enter your password");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (e: any) => {
    console.log(user);
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log(res);
        if (res.ok) {
          const token = res.headers.get('Authorization');
          if (token !== null) {
            localStorage.setItem("token", token);
            message.success("Đăng nhập thành công!");
            router.push("/");
          } else {
            // Handle the case where the token is null, if needed
            console.error("Token is null");
          }
        } else {
          message.error("Thông tin tài khoản hoặc mật khẩu không chính xác");
        }
      } catch (error: any) {
        message.error(error.message);
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth">
      <div className="wrapper-auth">
        <div className="content">
          <h1 className="flexCenter mt-4 text-4xl font-bold">Login</h1>
          <div className="login-form">
            <form className="m-4" onSubmit={handleLogin}>
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="email"
                value={user.user.email}
                onChange={handleInputChange}
              />
              <Input.Password
                className="mb-3 flexCenter"
                placeholder="Enter password"
                name="password"
                value={user.user.password}
                onChange={handleInputChange}
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone onClick={togglePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                  )
                }
                visible={passwordVisible}
              />
              <div className="mb-3 flexCenter">
                <Button
                  style={{
                    backgroundColor: "black",
                    marginTop: "16px",
                    width: "100%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </div>

              <div className="mb-3 flex justify-end">
                <Link href="/forgot-password" className="text-sm text-red-500">
                  Forgot password
                </Link>
              </div>
              <span className="text-sm flex justify-end">
                Don't you have an account?
                <Link className="ml-2 underline text-blue-500" href="/register">
                  Register
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLogin;
