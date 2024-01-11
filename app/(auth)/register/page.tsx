"use client";
import React, { useState } from "react";
import "../login/login.css";
import { Button, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TheRegister = () => {
  const router = useRouter();

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
  const validateForm = () => {
    let isValid = true;
    if (!user.username) {
      message.warning("Please enter your username");
      isValid = false;
    }

    if (!user.nickname) {
      message.warning("Please enter your nickname");
      isValid = false;
    }

    if (!user.email) {
      message.warning("Please enter your email");
      isValid = false;
    }

    if (!user.password) {
      message.warning("Please enter your password");
      isValid = false;
    }
    return isValid;
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý phản hồi từ máy chủ sau khi đăng ký thành công
          message.success("Đăng ký thành công");
          router.push("/login");
        })
        .catch((error) => {
          // Xử lý khi có lỗi xảy ra
          message.error(error.message);
        });
    }
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
                  style={{
                    backgroundColor: "black",
                    marginTop: "16px",
                    width: "100%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng ký
                </Button>
              </div>
              <span className="text-sm flex justify-end">
                Do you have an account?
                <Link className="underline ml-2 text-blue-500" href="/login">
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
