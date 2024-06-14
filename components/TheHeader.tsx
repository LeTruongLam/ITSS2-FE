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

    </nav>
  );
};

export default TheHeader;