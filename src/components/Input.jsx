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
          className="inline-block mb-1 pl-1 text-sm font-medium text-[#1C1C1C]"
          htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 rounded-lg bg-[#FAFAFF] text-[#1C1C1C] outline-none focus:ring-2 focus:ring-[#DADDD8] focus:ring-offset-2 focus:ring-offset-[#EEF0F2] duration-200 border border-[#DADDD8] w-full placeholder-gray-400 ${className}`}
        ref={ref}
        {...props}
        id={id} //used so that each input has its own unique id
      />
    </div>
  );
});

export default Input;
