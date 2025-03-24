import React, {useState , useEffect} from 'react';
import styles from "./jobSeeking.module.css";
import jobSeeking from './JobRoles.png';
import HorizontalLinearAlternativeLabelStepper from '../../../progressBar/progressBar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { useToaster } from '../../../Toaster.js';
import { Base_URL } from '../../../../const/const.js';
function JobSeeking({handleCurrentModal, back, next, skip}) {
  const showToaster = useToaster();
  const [selectedValue, setSelectedValue] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem("Job Titles");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries)); 
    }else{
      localStorage.setItem("Job Titles" , [])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Job Titles", JSON.stringify(entries));
  }, [entries]);

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter' && inputValue.trim() !== '') {
  //     if (entries.length < 11) {
  //       setEntries([...entries, inputValue]);
  //       setInputValue(''); 
  //     } else {
  //       showToaster('Delete a job title to add more', 'warning');
  //     }
  //   }
  // };  

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedValue("Select"); 
    handleKeyPress(value);
  };

  const handleKeyPress = (value) => {
    if (entries.length < 3) {
      if (value !== "" && !entries.includes(value)) {  
        setEntries([...entries, value]);
      } else if (entries.includes(value)) {
        showToaster('This job title is already added','warning');
      }
    } else {
      showToaster('Delete a job title to add more', 'warning');
    }
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index); 
    setEntries(newEntries); 
  };

  // function checkData(){
  //   const jobRole = localStorage.getItem("Job Titles");
  //   if(jobRole.length <= 0){
  //     showToaster('Please add at least one Job Role', 'warning');
  //   }else{
  //     next()
  //   }
  // }

  function retriveData(){
    const personalize = localStorage?.getItem("personalize");
    const city = localStorage?.getItem("City");
    const expectedSalary ={} 
    expectedSalary.currency = localStorage?.getItem("AmountCode");
    expectedSalary.amount = localStorage?.getItem("Amount");
    const availability = localStorage?.getItem("Preffered Pay Period");
    const jobTitles = localStorage?.getItem("Job Titles");
    const jobList = JSON.parse(jobTitles); 
    let address = {}
    let remoteOptions = {}
    address.country = localStorage?.getItem("Country")
    address.city = localStorage?.getItem("City");
    remoteOptions.remote = localStorage?.getItem("Remote Preferred");
    const data = {personalize, city, expectedSalary, availability, jobList , address ,remoteOptions}
    data.name = localStorage?.getItem("name")
    data.email = localStorage?.getItem("email")
    data.password = localStorage?.getItem("password")
    data.mobileNumber = localStorage?.getItem("mobile")
    data.currentLocation = localStorage?.getItem("Country")
    

    fetch(`${Base_URL}/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) { 
              localStorage.clear()
              next()
              // navigate('/login', { state: { active: "signup" } })
          } else {
              showToaster(`Registration Failed! \n ${data.error}`, 'error');
              handleCurrentModal(); 
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
    <div className={styles.responsiveContainer}>
      <div className={styles.modal}>
        <div className={styles.modalContent} style={{overflowX:'hidden'}} >
          <div style={{ position:'relative',left:'-90px'}}>
          <HorizontalLinearAlternativeLabelStepper  activeStep={2} />
          </div>
          <div style={{paddingBottom:'20px', display:'flex',flexDirection:'column' ,justifyContent:'center'}}>
            <label style={{color: "#4B4B4B", fontWeight: '500' ,fontSize:'25px'}}>
              What type of job are you seeking?
            </label>
            <p className={styles.para}>This enables us to begin displaying to you the jobs that are most relevant. You can alter this at a later time.</p>
          </div>
          <div style={{width:'100%', display:'flex',justifyContent:'center'}}>
            <img src={jobSeeking} alt='Job Roles' style={{height: '200px' , width: '400px'}} />
          </div>
          <div className={styles.bottomInputDiv}>
            <div className={styles.labelQuestion}>
            <label className={styles.bottomInputlabel}>
              Desired Job Titles 
            </label>
            <label style={{color: '#7E7E7E',fontSize:'15px'}}>
              (You can add up to 3 job titles)
            </label>
            </div>
            {/* <input
                className={styles.inputDES}
                placeholder="Type Job title..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              /> */}
              <select 
                className={styles.inputDES}
                id="dropdown"
                value={selectedValue}
                onChange={handleOptionChange}
              >
                <option value="">Select</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Engineer">Engineer</option>
                <option value="Consultant">Consultant</option>
              </select>
              <div style={{ width: '100%' }}>
                {entries.map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                      padding: '10px 10px 0px 10px',
                    }}
                  >
                    <label>{entry}</label>
                    <FontAwesomeIcon
                      style={{ color: '#2A85FE', cursor: 'pointer' }}
                      icon={faTrashAlt}
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.buttoncontainer}>
              <button className={styles.backbtn} onClick={back}>Back</button>
              <div className={styles.centersection}>
                <button className={styles.nextbtn} onClick={() => { retriveData() }}>Confirm</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeeking;
