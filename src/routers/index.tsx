import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import NftDetailPage from "containers/NftDetailPage/NftDetailPage";
import PageCollection from "containers/PageCollection";
import Collection from "containers/Collection";
import PageSearch from "containers/PageSearch";
import PageUploadItem from "containers/PageUploadItem";
import CreateCollection from "containers/CreateCollection";
import EditCollection from "containers/EditCollection";
import ItemList from "containers/Item"
import EditItem from "containers/EditItem"
import PageConnectWallet from "containers/PageConnectWallet";
import PageHome2 from "containers/PageHome/PageHome2";
import PageHome3 from "containers/PageHome/PageHome3";
import CreateListItem from "containers/CreateListItem";

export const pages: Page[] = [
  { path: "/", component: PageHome2 },
  { path: "/#", component: PageHome2 },
  { path: "/home2", component: PageHome },
  { path: "/home3", component: PageHome3 },
  { path: "/home-header-2", component: PageHome },
  { path: "/nft-detailt/:id", component: NftDetailPage },
  { path: "/page-collection", component: PageCollection },
  { path: "/collection", component: Collection },
  { path: "/page-search", component: PageSearch },
  { path: "/page-author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/page-upload-item", component: PageUploadItem },
  { path: "/connect-wallet", component: PageConnectWallet },
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
  { path: "/create-collection", component: CreateCollection },
  { path: "/collection/:id", component: ItemList },
  { path: "/edititem/:id", component: EditItem },
  { path: "/editcollection/:id", component: EditCollection },
  { path: "/createListItem/:id", component: CreateListItem }
];

const MyRoutes = () => {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "" : ""}
    >
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
