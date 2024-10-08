import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  "/home3"?: {};
  "/nft-detailt/:id"?: {};
  "/page-collection"?: {};
  "/collection"?: {};
  "/page-search"?: {};
  "/page-author"?: {};
  "/page-upload-item"?: {};
  "/home-header-2"?: {};
  "/connect-wallet"?: {};
  "/account"?: {};
  "/blog"?: {};
  "/blog-single"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/create-collection"?: {};
  "/collection/:id"?: {};
  "/edititem/:id"?: {};
  "/editcollection/:id"?: {};
  "/createListItem/:id"?: {};
  "/activity"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  component: ComponentType<Object>;
}
