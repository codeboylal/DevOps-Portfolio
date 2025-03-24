import React, { useState, useEffect } from 'react';
import styles from "./locationModal.module.css";
import location from './location.png';
import HorizontalLinearAlternativeLabelStepper  from '../../../progressBar/progressBar.jsx';
import { useToaster } from '../../../Toaster.js';
import CountrySelect from '../../../Input/Country/Country.jsx';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
function LocationModal({back, skip, next,handleCurrentModal }) {
  const showToaster = useToaster();
  const [inputValue, setInputValue] = useState('');
  const [isRemotePreferred, setIsRemotePreferred] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("Remote Preferred");
    if (storedValue !== null) {
      setIsRemotePreferred(storedValue === "true"); 
    }
    if(!localStorage.getItem("Remote Preferred")){
      localStorage.setItem("Remote Preferred",'false')
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isRemotePreferred;
    setIsRemotePreferred(newValue); 
    localStorage.setItem("Remote Preferred", newValue); 
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("City");
    if (storedValue) {
      setInputValue(storedValue);
    }else{
      localStorage.setItem("City",'')
    }
  }, []);

  // const storeData = (inputValue) => {
  //   localStorage.setItem("City", inputValue);
  //   setInputValue(inputValue); 
  // };

  function checkData(){
    if(localStorage.getItem("Country")?.length < 1){
      showToaster('Please enter your Country', 'warning');
    }else if(localStorage.getItem("City")?.length < 1){
      showToaster('Please enter your city', 'warning');
    }else{
      next()
    }
  }


  return (
    <div className={styles.responsiveContainer}>
      <div className={styles.modal} >
        <div className={styles.modalContent}>
            <div style={{ position:'relative',left:'-90px'}}>
              <HorizontalLinearAlternativeLabelStepper  activeStep={0} />
            </div>
          <div>
            
            <label style={{ color: "#4B4B4B", fontSize: '25px', fontWeight: '500', padding: '0'  }}>
              Your Current Location?
            </label>
            <p style={{ color: "#2A85FE", fontSize: '12px', fontWeight: '400', margin: '0' }}>
              We’ll use this to find job matches in your area
            </p>
          </div>
          <div style={{width:'100%', display:'flex',justifyContent:'center'}}>
            <img src={location} alt="Choose Location" style={{height: '245.84px' , width: '333.335px', marginTop:'10px'}} />
          </div>
          <div className={styles.inputGroup}>
            <div style={{width:'100%'}}>
              <CountrySelect className={styles.inputCheck}>
              </CountrySelect>
              {/* <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' , height:'30px' } }}
                noValidate
                autoComplete="off"
              > 
                <TextField id="outlined-basic" value={inputValue } label="City" variant="outlined" onChange={(e) => { const inputValue = e.target.value; storeData(inputValue);}}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '30px',
                      padding: '0',
                      // paddingLeft: '10px',
                      fontSize: '14px',
                      borderRadius: '8px',
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
                      top: inputValue ? '' : '-12px',
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
                  />
              </Box> */}
              {/* <input className={styles.inputCheck} value={inputValue}  onChange={(e) => { const inputValue = e.target.value; storeData(inputValue);}}/> */}
            </div>  
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className={styles.switch}>
                <input type='checkbox' checked={isRemotePreferred} onChange={handleToggle} />
                <span className={styles.slider}></span>
              </label>
              <span style={{ marginLeft: '10px', color: '#6c757d' }}>I prefer remote job options</span>
            </div>
          </div>
          <div>
            <div className={styles.buttoncontainer}>
              <button className={styles.backbtn} onClick={back}>Back</button>
              <div className={styles.centersection}>
                <button className={styles.skipbtn} onClick={skip}>Skip</button>
                <button className={styles.nextbtn} onClick={()=>{checkData()}}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationModal;
