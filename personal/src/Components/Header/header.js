import React from 'react';
import { GiNotebook } from 'react-icons/gi';

function Header() {
  return (
    <nav className=" navbar-expand-lg bg-body-tertiary">
      <div className="d-flex justify-content-center align-items-center">
        <h1 style={{fontFamily: "Sofia"}}>Personal Budget</h1>
        <GiNotebook className="fs-1 m-3" />
      </div>
    </nav>
  );
}

export default Header;
