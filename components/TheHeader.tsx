"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Dropdown, Menu, Space, Avatar } from "antd";
import {
  CaretDownFilled,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";

const TheHeader = () => {
  const [session, setSession] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = localStorage.getItem("token");
    setSession(sessionData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSession(null);
    router.push("/login");
  };

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-base gap-7">
          {NavLinks.map((link) => (
            <li key={link.text}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {!session ? (
          <>
            <Button style={{ backgroundColor: "black" }} type="primary">
              <Link href="/login">Login</Link>
            </Button>
            <Button style={{ backgroundColor: "white" }}>
              <Link href="/register">Register</Link>
            </Button>
          </>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0" icon={<UserOutlined />}>
                  User info
                </Menu.Item>
                <Menu.Item key="1" icon={<SettingOutlined />}>
                  Setting
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  key="3"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar />
                <CaretDownFilled />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
    </nav>
  );
};

export default TheHeader;