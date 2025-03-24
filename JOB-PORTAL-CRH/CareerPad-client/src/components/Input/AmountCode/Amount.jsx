import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AmountCode as originalAmountCode } from './Amount';

export default function AmountSelect({height =  ""}) {
  const [selectedAmountCode, setSelectedAmountCode] = React.useState(null);

  // Remove duplicate entries from the AmountCode array
  const AmountCode = React.useMemo(() => {
    return originalAmountCode.filter((item, index, self) =>
      index === self.findIndex((t) => t.code === item.code)
    );
  }, []);

  React.useEffect(() => {
    const storedAmountCode = localStorage.getItem('AmountCode');
    if (storedAmountCode) {
      const matchedAmount = AmountCode.find((amount) => amount.code === storedAmountCode);
      if (matchedAmount) {
        setSelectedAmountCode(matchedAmount); 
      }
    }
  }, [AmountCode]);

  const handleAmountChange = (event, value) => {
    if (value) {
      localStorage.setItem('AmountCode', value.code);
      setSelectedAmountCode(value);
    } else {
      localStorage.removeItem('AmountCode');
      setSelectedAmountCode(null);
    }
  };

  return (
    <Autocomplete
      id="Amount-select-demo"
      sx={{ margin: '0', height: height?.length > 0 ? '36px' : '30px', width: '12ch', border: 'transparent' }}
      options={AmountCode}
      autoHighlight
      getOptionLabel={(option) => option.code}
      value={selectedAmountCode} 
      onChange={handleAmountChange} 
      isOptionEqualToValue={(option, value) => option.code === value?.code} // Ensures correct comparison
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Code"
          InputLabelProps={{
            shrink: params.inputProps.value ? true : undefined,
          }}
          sx={{
            '& .MuiInputBase-root': {
              height: height?.length > 0 ? '36px' : '30px',
              padding: '0',
              paddingLeft: '10px',
              fontSize: '14px',
              borderRadius: height?.length > 0 ? '4px' :'8px',
              width:'115px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid #D2D2D2',
                borderColor: '#BDBDBD',
              },
              '&:hover fieldset': {
                border: '2px solid #2A85FE',
                borderColor: '#2A85FE',
              },
              '&.Mui-focused fieldset': {
                border: '2px solid #2A85FE',
                borderColor: '#2A85FE',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2A85FE',
              top: '0px',
            },
            '&:hover .MuiInputLabel-root': {
              color: '#2A85FE',
            },
            '& .MuiInputLabel-root': {
              fontSize: '15px',
              position: 'absolute',
              top: params.inputProps.value || params.InputProps.startAdornment ? '0px' :  height?.length > 0 ? '-8px' : '-12px',
              color: '#BDBDBD',
              padding: '0',
            },
            
          }}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}
        />
      )}
    />
  );
}
