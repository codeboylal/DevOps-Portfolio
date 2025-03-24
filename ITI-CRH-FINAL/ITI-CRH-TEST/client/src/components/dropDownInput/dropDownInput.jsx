import React, { useState, useEffect, useRef } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function DropdownInput({
  label = "",
  value,
  onChange,
  options = [],
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootContainerRef = useRef(null); // Reference to your root container

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1740) {
        setIsOpen(false); // Close the dropdown on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={rootContainerRef}>
      <FormControl
        fullWidth
        sx={{
          margin: 0,
          "& .MuiOutlinedInput-root": {
            height: "36px",
            borderRadius: "8px",
            "& fieldset": {
              border: "1px solid #E5E5E5",
            },
            "&:hover fieldset": {
              border: "1px solid black",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid black",
            },
          },
          "& .MuiInputLabel-root": {
            top: "-4px",
            fontSize: "14px",
            color: "#666666",
            "&.Mui-focused": {
              color: "black",
            },
            "&.MuiFormLabel-filled": {
              color: "black",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 14px",
          },
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          inputProps={{ "aria-label": label }}
          MenuProps={{
            container: rootContainerRef.current, // Ensure dropdown is within the root container
            PaperProps: {
              style: {
                zIndex: 999999999999999, // Ensure it appears above the popup if needed
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          {placeholder && !isOpen && (
            <MenuItem
              value=""
              disabled
              sx={{
                color: "#BBBBBB",
              }}
            >
              {placeholder}
            </MenuItem>
          )}
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              style={{
                backgroundColor: value === option.value ? 'rgba(156, 154, 154, 0.3)' : 'inherit'
              }}
            >
              {option.label}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}

export default DropdownInput;
