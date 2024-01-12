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
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;

    if (!user.email) {
      message.warning("Please enter your email");
      isValid = false;
    }

    if (!user.password) {
      message.warning("Please enter your password");
      isValid = false;
    }

    if (!user.name) {
      message.warning("Please enter your name");
      isValid = false;
    }

    if (!user.nickname) {
      message.warning("Please enter your nickname");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        user: {
          email: user.email,
          password: user.password,
          name: user.name,
          nickname: user.nickname,
        },
      };
      fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server after successful registration
          message.success("Đăng ký thành công");
          router.push("/login");
        })
        .catch((error) => {
          // Handle errors that occur
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
                placeholder="Enter your Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your password"
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
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
              <Input
                className="mb-3 flexCenter"
                placeholder="Enter your nickname"
                name="nickname"
                value={user.nickname}
                onChange={handleInputChange}
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
