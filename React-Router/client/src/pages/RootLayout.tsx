// import { Outlet } from "react-router";
import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import "./root.css";

function Root() {
  return (
    <>
      <Header />
      <div className="outlet__div">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
