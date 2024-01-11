import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoPurple from "../public/logo-purple.svg";
import { footerLinks } from "@/constants";
type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);
const TheFooter = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src={LogoPurple} width={115} height={38} alt="Flexibble" />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
            turpis tincidunt, scelerisque tortor at, commodo velit. Fusce et
            semper dolor.
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

export default TheFooter;
