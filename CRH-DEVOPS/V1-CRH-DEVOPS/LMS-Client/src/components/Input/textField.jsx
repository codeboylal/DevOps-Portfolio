import React from "react";
import TextField from '@mui/material/TextField';

function InputMaterialUI({ title, errorState=false , helperText, value, onChange, onKeyDown, customWidth, onClick }) {
    return (
        <TextField
            id="outlined-error-helper-text"
            label={title}
            error={errorState}
            onKeyDown={onKeyDown}
            onClick={onClick}
            helperText={helperText}
            value={value}
            onChange={onChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: '36px',
                    borderRadius:'8px',
                    
                    width: !customWidth ? "100%" : customWidth,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: errorState ? 'red' : '#FF702D',
                    },'& .MuiOutlinedInput-notchedOutline': {
                        borderColor: errorState && 'red',
                    }
                },
                '& .MuiOutlinedInput-input': {
                    height: '36px',
                    padding: '8px 14px',
                },
                '& .MuiInputLabel-root': {
                    top: '-9px',
                    color:  errorState && 'red',
                    '&.Mui-focused': {
                        color:  errorState ? 'red' : '#FF702D',
                    }
                },
                '& .MuiInputLabel-shrink': {
                    top: '0px',
                },
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                    height: '18px',
                    WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset',
                }
            }}
        />
    );
}

export default InputMaterialUI;






// ComboBox
// import React from "react";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// function InputMaterialUI({ title, errorState, helperText, value = '', onChange, onKeyDown, customWidth, onClick, options = [] }) {
//     return (
//         <Autocomplete
//             freeSolo={options.length === 0} // Allow free typing only if there are no options
//             options={options}
//             value={value}
//             onChange={(event, newValue) => {
//                 onChange(newValue || ''); // Handle newValue correctly
//             }}
//             disableClearable={options.length === 0}
//             popupIcon={options.length > 0 ? undefined : null} // Hide dropdown arrow if no options
//             renderInput={(params) => (
//                 <TextField
//                     {...params}
//                     id="outlined-error-helper-text"
//                     label={title}
//                     error={errorState}
//                     onKeyDown={onKeyDown}
//                     onClick={onClick}
//                     helperText={helperText}
//                     sx={{
//                         '& .MuiOutlinedInput-root': {
//                             height: '36px',
//                             borderRadius: '8px',
//                             width: !customWidth ? "100%" : customWidth,
//                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: '#FF702D',
//                             }
//                         },
//                         '& .MuiOutlinedInput-input': {
//                             height: '36px',
//                             padding: '8px 14px',
//                         },
//                         '& .MuiInputLabel-root': {
//                             top: '-9px',
//                             '&.Mui-focused': {
//                                 color: '#FF702D',
//                             }
//                         },
//                         '& .MuiInputLabel-shrink': {
//                             top: '0px',
//                         },
//                         '& .MuiOutlinedInput-input:-webkit-autofill': {
//                             height: '18px',
//                             WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset',
//                         }
//                     }}
//                 />
//             )}
//         />
//     );
// }

// export default InputMaterialUI;
