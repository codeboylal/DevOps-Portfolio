import React from "react";
import { Slider, Box } from "@mui/material";

function RangeSlider({ value, onChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        step={1}
        sx={{
          "& .MuiSlider-rail": {
            color: "#E5E5E5", // Light grey rail
          },
          "& .MuiSlider-root": {
            height: "2px",
            color: "#000000", // Black color for the slider track and thumb
          },
          "& .MuiSlider-track": {
            color: "#000000", // Black color for the slider track
          },
          "& .MuiSlider-thumb": {
            color: "#000000", // Black color for the thumb
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#BDBDBD", // Grey background for the value label
            color: "white", // White text for visibility
            borderRadius: "50%", // Optional: round the value label
          },
          "& .MuiSlider-thumb:focus, & .MuiSlider-thumb:active": {
            backgroundColor: "#000000", // Keep thumb color unchanged on active/focus
            outline: "none", // Remove the default outline on focus
          },
          "& .MuiSlider-thumb:focus-visible": {
            backgroundColor: "#000000", // Prevent thumb color change on focus
            boxShadow: "0 0 0 6px rgba(189, 189, 189, 0.5)", // Apply grey focus ring instead of blue
          },
        }}
      />
    </Box>
  );
}

export default RangeSlider;
