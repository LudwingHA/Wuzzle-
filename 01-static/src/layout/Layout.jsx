import React from "react";
import { NavBar } from "./components/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
