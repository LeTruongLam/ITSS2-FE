"use client";

import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constants";
import { Button } from "antd";
import AuthProviders from "./AuthProviders";
import React, { useState, useEffect } from "react";
const TheHeader = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem("token");
      setSession(sessionData);
    }
  }, []);
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
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
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default TheHeader;