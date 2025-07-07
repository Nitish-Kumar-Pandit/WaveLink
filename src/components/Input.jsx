import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-900"
          htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-3 md:py-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 duration-200 border-2 border-gray-200 w-full placeholder-gray-500 font-medium tracking-wide hover:border-gray-300 text-base md:text-sm ${className}`}
        ref={ref}
        {...props}
        id={id} //used so that each input has its own unique id
      />
    </div>
  );
});

export default Input;
