import React from "react";
import { Link } from "react-router-dom";

const IconButton = ({ icon, iconText, iconColor, customTailCSS }) => {
  return (
    <div
      className={
        iconColor ? iconColor + " inline-flex" : "text-gray-700 inline-flex"
      }
    >
      <div>{icon}</div>
      <h2 className="ml-3 text-xl font-medium">{iconText}</h2>
    </div>
  );
};

export default IconButton;
