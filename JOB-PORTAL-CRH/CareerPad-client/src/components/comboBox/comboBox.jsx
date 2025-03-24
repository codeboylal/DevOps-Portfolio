import React, { useState, useEffect } from "react";
import styles from './comboBox.module.css';

const ComboBox = ({ options, toggleDropdown, onSelect, clearInput }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (clearInput) {
      setInputValue(""); // Clear the input value
      setFilteredOptions(options); // Reset the filtered options
    }
  }, [clearInput, options]); // Ensure it resets when clearInput or options change

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    if (value === "") {
      onSelect("");
    }
    setIsOpen(true);
  };

  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const toggleDropdownInternal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
            onBlur={handleBlur}
            placeholder="Location"
            style={{ padding: '10px 30px 10px 30px' }} className={styles.InputDes}
          />
        </div>
        <div>
          {toggleDropdown && (
            <label onClick={toggleDropdownInternal} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
              {toggleDropdown()}
            </label>
          )}
        </div>
      </div>

      {isOpen && (
        <ul
          style={{
            position: "absolute",
            width: "86%",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            borderRadius: '8px',
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onMouseDown={() => handleSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li style={{ padding: "8px", color: "#999" }}>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
