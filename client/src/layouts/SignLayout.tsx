import react from "react";
import { Outlet } from "react-router-dom";
export const SignLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
