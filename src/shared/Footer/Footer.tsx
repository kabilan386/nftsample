import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/page-search", label: "Market Place" },
      { href: "/activity", label: "Acitivity" },
      { href: "/connect-wallet", label: "Connect Wallet" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Cicryp" },
      { href: "#", label: "Email: info@cicryp.com" },
      { href: "#", label: "Call: +1 645 4554 764" },
      { href: "#", label: "canada: 89755" },
    ],
  },
  // {
  //   id: "2",
  //   title: "Social",
  //   menus: [
  //     { href: "#", label: "Best practices" },
  //     { href: "#", label: "Support" },
  //     { href: "#", label: "Developers" },
  //     { href: "#", label: "Learn design" },
  //     { href: "#", label: "What's new" },
  //     { href: "#", label: "Releases" },
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "Community",
  //   menus: [
  //     { href: "#", label: "Discussion Forums" },
  //     { href: "#", label: "Code of Conduct" },
  //     { href: "#", label: "Community Resources" },
  //     { href: "#", label: "Contributing" },
  //     { href: "#", label: "Concurrent Mode" },
  //     { href: "#", label: "API Reference" },
  //   ],
  // },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-20 lg:pt-32 lg:pb-28 border-t border-neutral-200 dark:border-neutral-700">
  <div className="container flex flex-wrap justify-evenly gap-y-10 gap-x-5 sm:gap-x-8 md:gap-x-10">
    <div className="flex items-center  gap-5">
      <div className="mr-20">
      <Logo />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
    <div className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
        Social Links
      </h2>
      <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
    </div>
  </div>

  <div className="text-center mt-10 font-semibold">
  <p>2023 © All rights reserved by CIcryp</p>
  </div>
</div>

);
};

export default Footer;
