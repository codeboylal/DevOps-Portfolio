// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { City } from 'country-state-city';
// import { countries } from './Country'; // Assuming you have your country data in this file
// import { FaTimes } from 'react-icons/fa';

// export default function CountryCitySelect({inputStyle}) {
//   const [selectedCountry, setSelectedCountry] = React.useState(null);
//   const [selectedCity, setSelectedCity] = React.useState(null);
//   const [cities, setCities] = React.useState([]);

//   // Load initial country from localStorage
//   React.useEffect(() => {
//     const storedCountryValue = localStorage.getItem("Country");
//     if (storedCountryValue) {
//       const matchedCountry = countries.find(country => country.label === storedCountryValue);
//       setSelectedCountry(matchedCountry);
//       loadCitiesByCountry(storedCountryValue); // Load cities if a country is stored
//     }
//   }, []);

//   // Function to load cities based on the selected country
//   const loadCitiesByCountry = (country) => {
//     let cityList = [];
//     if (country === 'Nepal') {
//       cityList = City.getCitiesOfCountry('NP'); // Nepal
//     } else if (country === 'United States') {
//       cityList = City.getCitiesOfCountry('US'); // United States
//     } else if (country === 'India') {
//       cityList = City.getCitiesOfCountry('IN'); // India
//     }
//     setCities(cityList);
//   };

//   // Handle country selection
//   const handleCountryChange = (event, value) => {
//     if (value) {
//       localStorage.setItem('Country', value.label);
//       setSelectedCountry(value);
//       loadCitiesByCountry(value.label); // Load cities based on selected country
//       setSelectedCity(null); // Reset selected city
//     } else {
//       localStorage.removeItem('Country');
//       setSelectedCountry(null);
//       setCities([]); // Clear cities if no country is selected
//       setSelectedCity(null);
//     }
//     localStorage.removeItem('City');
//   };

//   // Handle city selection
//   const handleCityChange = (event, value) => {
//     if (value) {
//       localStorage.setItem('City', value.name);
      
//       if (inputStyle === "JobPrefrence") {
//         let Preferred_Work_Location = localStorage.getItem("Preferred Work Location");
        
//         if (Preferred_Work_Location) {
//           Preferred_Work_Location = JSON.parse(Preferred_Work_Location);
//         } else {
//           Preferred_Work_Location = [];
//         }
        
//         Preferred_Work_Location.push([value.name, localStorage.getItem("Country")]);
//         localStorage.setItem("Preferred Work Location", JSON.stringify(Preferred_Work_Location));
//       }
      
//       setSelectedCity(value);
//     } else {
//       localStorage.removeItem('City');
//       setSelectedCity(null);
//     }
//   };
  
//   //handle remove deletion
//   const handleRemoveLocation = (indexToRemove) => {
//     let preferredWorkLocation = JSON.parse(localStorage.getItem("Preferred Work Location")) || [];
  
//     preferredWorkLocation = preferredWorkLocation.filter((_, index) => index !== indexToRemove);
  
//     localStorage.setItem("Preferred Work Location", JSON.stringify(preferredWorkLocation));

//   };

//   return (
//     <div>
//       <div style={{display:'flex' , width:'100%' , gap:'10px'}}>
//         <Autocomplete
//           id="country-select-demo"
//           sx={{ width: '100%', margin: '0', height: '40px', border: 'transparent',
//             ...(inputStyle === "JobPrefrence" ? {marginBottom:'10px' } : {})}}
//           options={countries}
//           autoHighlight
//           getOptionLabel={(option) => option.label}
//           value={selectedCountry}
//           onChange={handleCountryChange}
//           renderOption={(props, option) => (
//             <Box component="li" style={{display:'flex',alignItems:'center',gap:'5px'}} {...props}>
//               <img
//                 loading="lazy"
//                 width="20"
//                 srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//                 src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//                 alt=""
//               />
//               {option.label}
//             </Box>
//           )}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Choose a country"
//               InputLabelProps={{
//                 shrink: params.inputProps.value ? true : undefined,
//               }}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   height: '30px',
//                   padding: '0',
//                   paddingLeft: '10px',
//                   fontSize: '14px',
//                   borderRadius: '8px',
//                   ...(inputStyle === "JobPrefrence" ? { height: '40px' , borderRadius:'5px' } : {})
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     border: '1px solid #D2D2D2',
//                     borderColor: '#BDBDBD',
//                   },
//                   '&:hover fieldset': {
//                     border: '2px solid #2A85FE',
//                     borderColor: '#2A85FE',
//                   },
//                   '&.Mui-focused fieldset': {
//                     border: '2px solid #2A85FE',
//                     borderColor: '#2A85FE',
//                   },
//                 },
//                 '& .MuiInputLabel-root': {
//                   fontSize: '15px',
//                   position: 'absolute',
//                   ...(inputStyle === "JobPrefrence" ?{top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-7px', }: { top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-11px', })
//                   ,color: '#BDBDBD',
//                   padding: '0',
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#2A85FE',
//                   top: '0px',
//                 },
//                 '&:hover .MuiInputLabel-root': {
//                   color: '#2A85FE',
//                 },
//               }}
//               slotProps={{
//                 htmlInput: {
//                   ...params.inputProps,
//                   autoComplete: 'new-password',
//                 },
//               }}
//             />
//           )}
//         />
        
//         <Autocomplete
//           id="city-select-demo"
//           sx={{ width: '100%', margin: '0', height: '30px', border: 'transparent' }}
//           options={cities}
//           autoHighlight
//           getOptionLabel={(option) => option.name} // Use 'name' instead of 'label'
//           value={selectedCity}
//           onChange={handleCityChange}
//           disabled={!selectedCountry} // Disable if no country is selected
//           renderOption={(props, option) => (
//             <Box component="li" {...props}>
//               {option.name}
//             </Box>
//           )}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={selectedCountry ? `Choose a city (${selectedCountry.label})` : 'No country selected'}
//               InputLabelProps={{
//                 shrink: params.inputProps.value ? true : undefined,
//               }}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   height: '30px',
//                   padding: '0',
//                   paddingLeft: '10px',
//                   fontSize: '14px',
//                   borderRadius: '8px',
//                   ...(inputStyle === "JobPrefrence" ? { height: '40px', borderRadius:'5px'  } : {})
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     border: '1px solid #D2D2D2',
//                     borderColor: '#BDBDBD',
//                   },
//                   '&:hover fieldset': {
//                     border: '2px solid #2A85FE',
//                     borderColor: '#2A85FE',
//                   },
//                   '&.Mui-focused fieldset': {
//                     border: '2px solid #2A85FE',
//                     borderColor: '#2A85FE',
//                   },
//                 }, '& .MuiInputLabel-root': {
//                   fontSize: '15px',
//                   position: 'absolute',
//                   ...(inputStyle === "JobPrefrence" ?{top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-7px', }: { top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-11px', })
//                   ,color: '#BDBDBD',
//                   padding: '0',
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#2A85FE',
//                   top: '0px',
//                 },
//                 '&:hover .MuiInputLabel-root': {
//                   color: '#2A85FE',
//                 },
//               }}
//               slotProps={{
//                 htmlInput: {
//                   ...params.inputProps,
//                   autoComplete: 'new-password',
//                 },
//               }}
//             />
//           )}
//         />
        
//       </div>
//       {inputStyle === "JobPrefrence" ? 
//       <div>
//         {JSON.parse(localStorage?.getItem("Preferred Work Location") || "[]")
//           ?.reduce((rows, location, index, array) => {
//             if (index % 2 === 0) {
//               rows.push(array.slice(index, index + 2));
//             }
//             return rows;
//           }, [])
//           ?.map((row, rowIndex) => (
//             <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '8px' }}>
//               {row.map((location, index) => (
//                 <div key={index} style={{ display: 'flex',alignItems:'center', gap: '7px' ,color:'#2A85FE',backgroundColor:'#E4F1FF',border:'1px solid #2A85FE',padding:'5px 10px',borderRadius:'5px'}}>
//                   <div style={{display:'flex' ,alignItems:'center',gap:'3px'}}>
//                     <span>{location[0]},</span>
//                     <span>{location[1]}</span>
//                   </div>
//                   <FaTimes style={{cursor:'pointer'}} onClick={() => handleRemoveLocation(index)} />
//                 </div>
//               ))}
//             </div>
//           ))}
//       </div>
//       : ''
//     }
//     </div>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { City } from 'country-state-city';
import { countries } from './Country'; // Assuming you have your country data in this file
import { FaTimes } from 'react-icons/fa';

export default function CountryCitySelect({setData, inputStyle="", countryData="", cityData="", page}) {
  const [selectedCountry, setSelectedCountry] = React.useState( "");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [cities, setCities] = React.useState([]);

  const [preferredLocation, setPreferredWorkLocation] = React.useState([])
  const [showLocation , setShowLocation] = React.useState([])

  React.useEffect(() => {
    // Check if localStorage is available in the browser
    if (setData) {
      const storedData = localStorage.getItem("Preferred Work Location");
      // Parse data only if it exists and is valid, otherwise default to an empty array
      if (storedData) {
        setPreferredWorkLocation(JSON.parse(storedData));
        setShowLocation(JSON.parse(storedData))
      } else {
        setPreferredWorkLocation([]);
      }
    } 
  }, [setData]);
  

  // Load initial country from localStorage
  React.useEffect(() => {
    const storedCountryValue = localStorage.getItem("Country");
    if (storedCountryValue) {
      const matchedCountry = countries.find(country => country.label === storedCountryValue);
      setSelectedCountry(matchedCountry);
      loadCitiesByCountry(storedCountryValue); // Load cities if a country is stored
      setSelectedCity(localStorage.getItem("City"))
    }
  }, []);
  

  // Function to load cities based on the selected country
  const loadCitiesByCountry = (country) => {
    let cityList = [];
    if (country === 'Nepal') {
      cityList = City.getCitiesOfCountry('NP'); // Nepal
    } else if (country === 'United States') {
      cityList = City.getCitiesOfCountry('US'); // United States
    } else if (country === 'India') {
      cityList = City.getCitiesOfCountry('IN'); // India
    }
    setCities(cityList);
  };

  // Handle country selection
  const handleCountryChange = (event, value) => {
    if (value) {
      localStorage.setItem('Country', (value?.label || value));
      setSelectedCountry(value?.label || value);
      loadCitiesByCountry(value?.label || value); // Load cities based on selected country
      setSelectedCity(""); // Reset selected city
    } else {
      localStorage.removeItem('Country');
      setSelectedCountry("");
      setCities([]); // Clear cities if no country is selected
      setSelectedCity("");
    }
    localStorage.removeItem('City');
  };

  // Handle city selection
  const handleCityChange = (event, value) => {
    if (value) {
      localStorage.setItem('City', value.name);
      
      if (inputStyle === "JobPrefrence") {
        let Preferred_Work_Location = localStorage.getItem("Preferred Work Location");
        
        if (Preferred_Work_Location) {
          Preferred_Work_Location = JSON.parse(Preferred_Work_Location);
          // setShowLocation(Preferred_Work_Location)
        } else {
          Preferred_Work_Location = [];
        }
        
        Preferred_Work_Location.push([value.name, localStorage.getItem("Country")]);
        setShowLocation(Preferred_Work_Location)
        localStorage.setItem("Preferred Work Location", JSON.stringify(Preferred_Work_Location));
      }
      
      setSelectedCity(value);
    } else {
      localStorage.removeItem('City');
      setSelectedCity(null);
    }
  };


  React.useState(()=>{
    if(preferredLocation){
      setShowLocation(preferredLocation)
    }
  },[preferredLocation])

  React.useEffect(()=>{
    if(countryData?.length > 0 ){
      // console.log(countryData)
      setSelectedCountry(countryData)
      localStorage.setItem('Country', (countryData));
      loadCitiesByCountry(countryData)
    }
    if(cityData?.length > 0 ){
      localStorage.setItem('City', (cityData));
      setSelectedCity(cityData)
      // setCities(cityData)
    }
  },[countryData,cityData])
  
  

  //handle remove deletion
  const handleRemoveLocation = (indexToRemove) => {
    let preferredWorkLocation = JSON.parse(localStorage.getItem("Preferred Work Location")) || [];
  
    console.log(preferredWorkLocation,indexToRemove)
    preferredWorkLocation = preferredWorkLocation.filter((_, index) => index !== indexToRemove);
  
    localStorage.setItem("Preferred Work Location", JSON.stringify(preferredWorkLocation));
    setPreferredWorkLocation(preferredWorkLocation)
    setShowLocation(preferredLocation)
  };



  return (
    <div>
      <div style={{display:'flex' , width:'100%' , gap:'10px'}}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: '100%', margin: '0', height: '40px', border: 'transparent',
            ...(inputStyle === "JobPrefrence" ? {marginBottom:'10px' } : {})}}
          options={countries}
          autoHighlight
          // onFocus={CountryFocused}
          getOptionLabel={(option) => option?.label || option}
          value={selectedCountry}
          onChange={handleCountryChange}
          renderOption={(props, option) => (
            <Box component="li" style={{display:'flex',alignItems:'center',gap:'5px'}} {...props}>
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              InputLabelProps={{
                shrink: params.inputProps.value ? true : undefined,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: page === "personalDetails" || inputStyle ==="JobPrefrence" ? "36px"  : '30px',
                  // width: page === "personalDetails" && "300px",
                  padding: '0',
                  paddingLeft: '10px',
                  fontSize: '14px',
                  borderRadius: page === "personalDetails" ? "4px"  : '8px',
                  ...(inputStyle === "JobPrefrence" ? { height: '40px' , borderRadius:'5px' } : {})
                },
                '& .MuiOutlinedInput-input:-webkit-autofill':{
        height: inputStyle !=="JobPrefrence" && page !== "personalDetails" && '15px',
        height: inputStyle === "JobPrefrence" && '23px'
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
                '& .MuiInputLabel-root': {
                  fontSize: '15px',
                  position: 'absolute',
                  ...(inputStyle === "JobPrefrence" || page === "personalDetails" ? inputStyle === "JobPrefrence" ? {top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-6px', } : {top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-8px', } : { top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-11px', }),
                  color: '#BDBDBD',
                  padding: '0',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2A85FE',
                  top: '0px',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#2A85FE',
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
        
        <Autocomplete
          id="city-select-demo"
          sx={{ width: '100%', margin: '0', height: '30px', border: 'transparent' }}
          options={cities}
          autoHighlight
          getOptionLabel={(option) => option?.name || option} // Use 'name' instead of 'label'
          value={selectedCity || ""}
          onChange={handleCityChange}
          disabled={!selectedCountry} // Disable if no country is selected
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={selectedCountry ? `Choose a city (${selectedCountry?.label || selectedCountry})` : 'No country selected'}
              InputLabelProps={{
                shrink: params.inputProps.value ? true : undefined,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: page === "personalDetails" || inputStyle ==="JobPrefrence" ? "36px"  :  '30px',
                  padding: '0',
                  paddingLeft: '10px',
                  fontSize: '14px',
                  borderRadius: page === "personalDetails" ? "4px"  : '8px',
                  ...(inputStyle === "JobPrefrence" ? { height: '40px', borderRadius:'5px'  } : {})
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
                }, '& .MuiInputLabel-root': {
                  fontSize: '15px',
                  position: 'absolute',
                  ...(inputStyle === "JobPrefrence" || page === "personalDetails" ? inputStyle === "JobPrefrence" ? {top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-6px', } : {top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-8px', } : { top: params.inputProps.value || params.InputProps.startAdornment ? '0px' : '-11px', }),
                  color: '#BDBDBD',
                  padding: '0',

                },
                '& .MuiOutlinedInput-input:-webkit-autofill':{
                  height: inputStyle !=="JobPrefrence" && page !== "personalDetails" && '15px',
                  height: inputStyle === "JobPrefrence" && '23px'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2A85FE',
                  top: '0px',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#2A85FE',
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
        
      </div>
      {inputStyle === "JobPrefrence" ? 
      <div>
        {showLocation
          ?.reduce((rows, location, index, array) => {
            if (index % 2 === 0) {
              rows.push(array.slice(index, index + 2));
            }
            return rows;
          }, [])
          ?.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '8px' }}>
              {row.map((location, index) => (
                <div key={index} style={{ display: location?.[0]?.length === 0 ? 'none' : 'flex',alignItems:'center', gap: '7px' ,color:'#2A85FE',backgroundColor:'#E4F1FF',border:'1px solid #2A85FE',padding:'5px 10px',borderRadius:'5px'}}>
                  <div style={{display:'flex' ,alignItems:'center',gap:'3px'}}>
                    <span>{location[0]},</span>
                    <span>{location[1]}</span>
                  </div>
                  <FaTimes style={{cursor:'pointer'}} onClick={() => handleRemoveLocation(index)} />
                </div>
              ))}
            </div>
          ))}
      </div>
      : ''
    }
    </div>
  );
}
