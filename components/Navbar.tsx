import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constants";
import { Button } from "antd";
import AuthProviders from "./AuthProviders";

const Navbar = async () => {
  const session = {};

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            <Button style={{backgroundColor: "black"}} type="primary">
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button style={{backgroundColor: "white"}}>
              <Link href="/register">Đăng ký</Link>
            </Button>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
