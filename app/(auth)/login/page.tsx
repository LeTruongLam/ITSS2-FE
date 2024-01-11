"use client"
import React, { useState } from "react";
import "./login.css";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const TheLogin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
    // Thực hiện logic đăng nhập ở đây
    console.log("Đăng nhập thành công!");
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
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
              <Input.Password
                className="mb-3 flexCenter"
                placeholder="Enter password"
                name="password"
                value={user.password}
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
                  style={{ backgroundColor: "black", marginTop: "16px", width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </div>

              <div className="mb-3 flex justify-end">
                <Link href="/forgot-password" className="text-sm text-blue-500">
                  Forgot password
                </Link>
              </div>
              <span className="text-sm flex justify-end">
                Don't you have an account?
                <Link className="underline text-blue-500" href="/register">
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