import React from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function RadioButtonGroup({
  value,
  onChange,
  options = [],
  row = false,
}) {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row={row}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={
              <Radio
                sx={{
                  color: 'grey.800',  // Set the radio button color (grey)
                  '&.Mui-checked': {
                    color: 'black',  // Set the checked color to black
                  },
                  '&.MuiRadio-root:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Add hover effect
                  },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonGroup;
