import React from "react";
import { FaTwitter } from "react-icons/fa";
import IconButton from "./IconButton";

const MenuBar = () => {
  return (
    <>
      <div className="ml-50">
        <IconButton
          icon={<FaTwitter size={28} />}
          iconText={"Twitter"}
          iconColor={"text-blue-400"}
        />
      </div>
    </>
  );
};

export default MenuBar;
