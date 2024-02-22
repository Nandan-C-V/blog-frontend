import React from "react";
import { Outlet } from "react-router-dom";

function PrivateRouter() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PrivateRouter;
