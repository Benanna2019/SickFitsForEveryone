import { Link } from "react-router-dom";
// import styled from "styled-components";
import Nav from "../Nav";
// import Cart from "./Cart";
// import Search from "./Search";
import "./header.css";

export default function Header() {
  return (
    <header>
      <div className="bar">
        <h1>
          <Link to="/">Sick Fits</Link>
        </h1>
        <Nav />
      </div>
      <div className="sub-bar">{/* <Search /> */}</div>
      {/* <Cart /> */}
    </header>
  );
}
