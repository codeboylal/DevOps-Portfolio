import React ,{useState ,useEffect} from 'react';
import styles from "./minSalary.module.css";
import SalaryExpectations from './SalaryExpectations.png';
import HorizontalLinearAlternativeLabelStepper from '../../../progressBar/progressBar.jsx';
import { useToaster } from '../../../Toaster.js';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AmountSelect from '../../../Input/AmountCode/Amount.jsx';

function MinSalary({handleCurrentModal, back, skip, next }) {
  const showToaster = useToaster();
  const [amountValue, setAmountValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    localStorage.setItem("Preffered Pay Period", newValue);
  };
  useEffect(() => {
    const storedValue = localStorage.getItem("Preffered Pay Period");
    if (storedValue) {
      setSelectedValue(storedValue);
    }
    else{
      localStorage.setItem("Preffered Pay Period", "");
    }
  }, []);

  useEffect(() => {
    const storedAmountValue = localStorage.getItem("Amount");
    if (storedAmountValue) {
      const parsedAmount = parseFloat(storedAmountValue); 
      if (parsedAmount > 0) {
        setAmountValue(parsedAmount); 
      }
    }
  }, []);
  

  const storeAmount = (amountValue) => {
    localStorage.setItem("Amount", amountValue);
    if(amountValue < 0){
      showToaster("Amount can't be less than 0", 'warning');
    }else{
      setAmountValue(amountValue); 
    }
  };

  function checkOption(){
    if(!localStorage.getItem("AmountCode")){
      showToaster("Please Enter a Amount Code", 'warning');
    }else if(!localStorage.getItem("Amount")){
      showToaster("Please fill Your base minimum pay", 'warning');
    // }else if(localStorage.getItem("Preffered Pay Period").length === 0){
    //   showToaster("Please select Preffered Pay Period", 'warning');
    }else{
      next()
    }
  }

  return (
    <div className={styles.responsiveContainer} >
      <div className={styles.modal}>
      <div className={styles.modalContent} style={{overflowX:'hidden'}} >
          <div style={{ position:'relative',left:'-90px'}}>
          <HorizontalLinearAlternativeLabelStepper  activeStep={1} />
          </div>
          <div style={{paddingBottom:'20px'}}>
            <label style={{color: "#4B4B4B", fontWeight: '500'  , fontSize:'25px'}}>
              What’s your minimum salary expectation?
            </label>
            <p className={styles.para}>We use this information to connect you with jobs that offer this amount or higher</p>
          </div>
          <div style={{width:'100%', display:'flex',justifyContent:'center'}}>
            <img src={SalaryExpectations} alt='Salar Expectations' style={{height: '200px' , width: '350px'}} />
          </div>
          <div className={styles.bottomInput}>
            <div className={styles.bottomInputDiv} style={{width:'50%'}}>
              <div style={{display:'flex', alignItems:'flex-end' , gap:'3px'}}>
                <label className={styles.bottomInputlabel} style={{fontSize:'12px' }}>
                  What minimum salary are you expecting?
                </label>
                <label style={{color: "#767676" , fontSize:'9px'}} className={styles.bottomInputlabel}>
                  (LPA)
                </label>
              </div>
              <div style={{display:'flex',alignItems:'center' , width:'50%', gap:'10px'}}>
                <AmountSelect />
                <Box
                  component="form"
                  sx={{ '& > :not(style)': { m: 1, width: '20ch' , height:'30px' ,margin:'0',padding:'0'} }}
                  noValidate
                  autoComplete="off"
                > 
                  <TextField id="outlined-basic" value={amountValue} label="Amount" type='number' variant="outlined" onChange={(e) => { const amountValue = e.target.value; storeAmount(amountValue);}}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '30px',
                        padding: '0',
                        // paddingLeft: '10px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        width:'68%'
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
                        top: amountValue ? '' : '-12px',
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
                </Box>
              </div>
              {/* <input type='number' className={styles.inputDES} placeholder='Amount' value={amountValue}  onChange={(e) => { const amountValue = e.target.value; storeAmount(amountValue);}}/> */}
            </div>
            <div className={styles.bottomInputDiv}>
              <label className={styles.bottomInputlabel} style={{fontSize:'12px' }}>
                Notice Period
              </label>
              <select className={styles.inputDES}
                id="dropdown"
                value={selectedValue}
                onChange={handleOptionChange}
              >
                <option value="">Select</option>
                <option value="15 days or less">15 days or less</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Month">2 Month</option>
                <option value="More than 3 Months">More than 3 Months</option>
              </select>
            </div>
          </div>
          <div className={styles.buttoncontainer}>
            <button className={styles.backbtn} onClick={back}>Back</button>
            <div className={styles.centersection}>
              <button className={styles.skipbtn} onClick={skip}>Skip</button>
              <button className={styles.nextbtn} onClick={()=>{checkOption()}}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinSalary;
