import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverBgColor = "hover:bg-blue-700",
  textColor = "text-white",
  focusRing = "focus:ring-2 focus:ring-blue-300",
  transition = "transition duration-200 ease-in-out",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${hoverBgColor} ${textColor} ${focusRing} ${transition} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
