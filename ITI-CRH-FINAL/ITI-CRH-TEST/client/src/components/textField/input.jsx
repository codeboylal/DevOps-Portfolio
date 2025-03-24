import React from 'react';
import styles from "./input.module.css";
import TextField from '@mui/material/TextField';

const CommonInputField = ({
  label,
  value,
  onChange,
  onFocus,
  height = '',
  width = '',
  borderRadius = '',
  type = 'text',
  placeholder = '',
  error = false,
  helperText = '',
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  required = false,
  errorText = '',
  ...rest
}) => {
  return (
    <div className={styles.widthFull}>
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            onFocus={onFocus}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            disabled={disabled}
            required={required}
            {...rest}
            sx={{
            '& .MuiOutlinedInput-root': {
                    paddingLeft: height === '42px' ? '30px' : '',
                    height: height?.length > 0 ? height : '72px',
                    backgroundColor:  '#F8F8F8',
                    
                '& input': {
                    // padding: '30px 12px',
                    color:  '#9999A0',
                    fontWeight:'400',
                    fontSize: '16px',
                    lineHeight:'18.85px',
                },
                '&:hover input':{
                   color: value ? 'black' : errorText & 'red',
                },
                '&.Mui-focused input':{
                    color: value ? 'black' : errorText && 'red',
                 },
                '& fieldset': {
                    borderRadius: borderRadius?.length > 0 ? borderRadius : '6px',
                    borderColor: '#EDEEF0',
                    // backgroundColor: '#F8F8F8',
                },
                '&:hover fieldset': {
                    border:'2px solid',
                    borderColor: 'black',
                 
                    // backgroundColor: '#F8F8F8',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    // backgroundColor: '#F8F8F8',
                },
            },
            '& .MuiInputLabel-root': {
                paddingLeft: height === '42px' && !value  ? '20px' : '',
                    position:'absolute',
                    top: height === '42px' ? !value && '-6px' : height === '54px' ? !value && '-1px' : height === '70px' ? value ? '0px' : '7px' : !value && '7px',
                    color: '#9999A0',
                '&:hover': {
                    paddingLeft: '0px',
                    color: 'black',
                },
                '&.Mui-focused': {
                    paddingLeft: '0px',
                    color: 'black',
                    top: '0px',
                },
            },
            '&:hover .MuiInputLabel-root': {
                    color: 'black',
            },
            '&:hover .MuiOutlinedInput-root fieldset': {
                    borderColor: 'black',
            },
            '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-endAdornment': {
                    height: '36px',
            },
            '& .MuiAutocomplete-listbox': {
                    padding: 0,
                    margin: 0,
            },
            '& .MuiOutlinedInput-input:-webkit-autofill': {
                height: height=== '42px' ? '7px' : height=== '54px' ? '18px': '38px',
                borderRadius:  borderRadius?.length > 0 ? borderRadius : '6px' ,
                WebkitBoxShadow: '0 0 0 42px rgb(234, 234, 234) inset',
            },
            }}
        />
        <div style={{display: errorText?.length > 0 ? '' :  'none'}} className={styles.errorDes}>
            <label>
                {errorText}
            </label>
        </div>
    </div>
  );
};

export default CommonInputField;
