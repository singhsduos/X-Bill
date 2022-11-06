import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const navigatePage = () => router.push("/");

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div onClick={navigatePage} className="sidebar__header">
          <div className="sidebar__logo">
            <h2>X-Bill</h2>
          </div>
        </div>

        <div className="sidebar__bottom">
          <Image src="/images/logo.png" alt="avatar" width="50" height="50" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
