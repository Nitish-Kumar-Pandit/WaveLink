import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-lg bg-white text-gray-900 outline-none
          focus:ring-2 focus:ring-orange-500 focus:border-orange-500
          duration-200 border-2 border-gray-200 w-full shadow-sm
          hover:border-gray-300 font-medium tracking-wide ${className}`}>

          {/* By default we are taking arrays as options */}
        {/* checking that the given array is not empty else confirm error = ? */}
        {options?.map((option) => (
          <option key={option} value={option} className="text-gray-900 bg-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select); //aise bhi ref send kr skte hai
