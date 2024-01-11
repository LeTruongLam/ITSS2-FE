"use client"

import React, { useState } from "react";
import "../login/login.css";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const TheRegister = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Thực hiện logic đăng ký ở đây
    console.log("Đăng ký thành công!");
    console.log(user);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth">
      <div className="wrapper-auth">
        <div className="content">
          <h1 className="flexCenter mt-4 text-4xl font-bold">Register</h1>
          <div className="login-form">
            <form className="m-4" onSubmit={handleRegister}>
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your user name"
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your nick name"
                name="nickname"
                value={user.nickname}
                onChange={handleInputChange}
              />
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your Email"
                name="email"
                value={user.email}
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
                  Đăng ký
                </Button>
              </div>
              <span className="text-sm flex justify-end">
                Do you have an account?
                <Link className="underline text-blue-500" href="/login">
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheRegister;