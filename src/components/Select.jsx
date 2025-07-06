import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-dark" 
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-lg bg-off-white text-dark outline-none 
          focus:bg-soft-white focus:ring-2 focus:ring-light-gray focus:border-light-gray 
          duration-200 border border-light-gray w-full shadow-sm 
          hover:shadow-md hover:bg-light-gray ${className}`}>
        
          {/* By default we are taking arrays as options */}
        {/* checking that the given array is not empty else confirm error = ? */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select); //aise bhi ref send kr skte hai
