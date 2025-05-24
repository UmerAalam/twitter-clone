import React from "react";

const IconButton = ({ icon, iconText, containerCss, iconCss, textCss }) => {
  return (
    <div
      className={
        containerCss ? containerCss : "text-gray-700 inline-flex my-auto"
      }
    >
      <div className={iconCss ? iconCss : "text-gray-700 ml-3"}>{icon}</div>
      <h2
        className={textCss ? iconCss : "text-gray-700 ml-3 text-xl font-medium"}
      >
        {iconText}
      </h2>
    </div>
  );
};

export default IconButton;
