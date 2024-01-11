import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoPurple from "../public/logo-purple.svg";
import LogoFaceBook from "../public/logo-facebook.svg";
import LogoGitHub from "../public/logo-github.svg";
import { footerLinks } from "@/constants";
type Link = { link: string; icon: string };
type ColumnProps = {
  title: string;
  links: Array<Link>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <div style={{ display: 'flex', gap: "10px" }}>
      {links.map((e) => (
        <Link href={e.link}>
          <Image src={e.icon === "LogoFaceBook" ? LogoFaceBook : LogoGitHub} width={32} height={32} alt={e.icon} />
        </Link>
      ))}
    </div>
  </div >
);
const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src={LogoPurple} width={115} height={38} alt="Flexibble" />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Gioi thieu nhom.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map((footerLink, index) => (
            <div className="flex-1 flex flex-col gap-4" key={index}>
              <FooterColumn title={footerLink.title} links={footerLink.links} />
            </div>
          ))}
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p>@ 2023 Flexibble. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,214</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
