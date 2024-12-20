/*
    Button component
*/

import React from "react";
import "./Layout.scss";
import Footer from "../Footer";

interface LayoutProps {
  children?: React.ReactNode;
  type?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, type }) => {
  return (
    <>
      <div className={type ? "layout background-" + type : "layout"}>
        {children}
        <div className="push"></div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
