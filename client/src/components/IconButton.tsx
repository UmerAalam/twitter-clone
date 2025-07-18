import React from "react";
import classNames from "classnames";
interface iconStyle extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  flex?: boolean;
  row?: boolean;
  column?: boolean;
}
const IconButton = ({
  children,
  icon,
  flex,
  row,
  column,
  ...rest
}: iconStyle) => {
  let className = classNames(rest.className, {
    flex: flex,
    "flex-row items-center": row,
    "flex-col items-center": column,
  });
  return (
    <button {...rest} className={className}>
      {icon ? icon : <></>}
      {children}
    </button>
  );
};

export default IconButton;
