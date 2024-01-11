"use client";
import React from "react";
import {
  CaretDownFilled,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";

const items: MenuProps["items"] = [
  {
    label: <span>User infor</span>,
    key: "0",
    icon: <UserOutlined />,
  },
  {
    label: <span>Setting</span>,
    key: "1",
    icon: <SettingOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: <span>Logout</span>,
    key: "3",
    icon: <LogoutOutlined />,
  },
];

const AuthProviders: React.FC = () => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar/>
        <CaretDownFilled />
      </Space>
    </a>
  </Dropdown>
);

export default AuthProviders;
