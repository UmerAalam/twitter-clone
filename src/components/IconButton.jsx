import React from "react";

const IconButton = ({ icon, iconText, iconColor }) => {
  return (
    <div
      className={
        iconColor ? iconColor + " inline-flex" : "text-gray-700 inline-flex"
      }
    >
      <div>{icon}</div>
      <div className="ml-5 text-2xl">{iconText}</div>
    </div>
  );
};

export default IconButton;
