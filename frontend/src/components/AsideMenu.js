import "../style/Home.css";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { HiLogout } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "../components/CreatePost";

const AsideMenu = () => {
  const [modalShow, setModalShow] = useState(false);

  function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=0";
  }

  return (
    <>
      <aside>
        <div></div>
        <button
          onClick={() => (window.location.href = "home")}
          className="sidebarBtn"
        >
          <AiFillHome className="iconBtn" />
          <span>Home</span>
        </button>
        <button className="sidebarBtn">
          <BsSearch className="iconBtn" />
          <span>Search</span>
        </button>
        <button onClick={() => setModalShow(true)} className="sidebarBtn">
          <VscAdd className="iconBtn" />
          <span>Crea</span>
        </button>
        <button
          onClick={() => (window.location.href = "profile")}
          className="sidebarBtn"
        >
          <VscAccount className="iconBtn" />
          <span>Profilo</span>
        </button>
        <button
          onClick={() => {
            eraseCookie("user_id");
            window.location.href = "login";
          }}
          className="sidebarBtn"
        >
          <HiLogout className="iconBtn" />
          <span>Logout</span>
        </button>
      </aside>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AsideMenu;
