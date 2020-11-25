import React from "react";
import "./styles.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Login</Link>
      </li>

      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
}
