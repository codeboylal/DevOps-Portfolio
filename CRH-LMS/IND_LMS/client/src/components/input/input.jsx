import React, { forwardRef } from "react";

const InputField = forwardRef(
  ({ placeholder, type = "text", className, error, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
          className={`${className}`}
          style={error ? { border: "1px solid red", color: "red" } : {}}
        />
      </>
    );
  }
);

export default InputField;
