import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/pie">Pie Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
