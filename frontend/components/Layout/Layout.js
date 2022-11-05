import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = (props) => {
  return (
    <>
      <Sidebar />
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
