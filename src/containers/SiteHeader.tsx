import React from "react";
import { useLocation } from "react-router-dom";
import HeaderLogged from "components/Header/HeaderLogged";
import Header2 from "components/Header/Header2";

const SiteHeader = () => {
  let location = useLocation();

  return sessionStorage.getItem('Connected') ? <HeaderLogged /> : <Header2 /> ;
};

export default SiteHeader;
