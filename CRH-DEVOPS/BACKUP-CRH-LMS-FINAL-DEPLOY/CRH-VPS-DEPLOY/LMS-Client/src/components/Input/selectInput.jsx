import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function SelectInput({width, title ,options, value , setValue, handleChange, disabled, onClick, handleClear}) {
  const [isFocused, setIsFocused] = React.useState(false); // Track focus state


  return (
    <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center', position: 'relative' }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel
          id="custom-select-label"
          style={{
            position: 'absolute',
            top: value || isFocused ? '0px' : '-9px',
            color: isFocused ? '#FF702D' : '#767676', // Focus color for label
          }}
        >
          {title}
        </InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          label={title}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)} // Set focus state
          onBlur={() => setIsFocused(false)} // Reset focus state
          onClick={onClick}
          disabled={disabled}
          sx={{
            height: '36px',
            width: {width},
            borderRadius: '8px',
            paddingRight: '30px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#BDBDBD', // Default border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black', // Border color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF702D', // Border color on focus
            },
            '&MuiOutlinedInput-input .MuiSelect-select': {
              backgroundColor: '#FFFFFF',
              height:'5px',
            },
            '&:hover .MuiInputLabel-root': {
              color: 'black', // Label color on hover
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#FF702D', // Label color on focus
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '150px', // Adjust the height according to your preference
                overflowY: 'auto', // Enable vertical scrollbar
              },
            },
          }}
        >
            {options.map((item,index)=>(
                <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <IconButton
        onClick={handleClear}
        sx={{
          display: value ? 'flex' : 'none', // Show icon only when there is a value
          position: 'absolute',
          right: '20px',
          cursor: 'pointer',
        }}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
}
