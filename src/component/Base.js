import React from "react";
import CustomNavbar from "./CustomNavBar";

function Base({ title = "Welcome to blog", children }) {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavbar />
      {children}
      <h2>this is footer</h2>
    </div>
  );
}

export default Base;
