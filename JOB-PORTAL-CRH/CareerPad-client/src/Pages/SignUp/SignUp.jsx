import React, { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faMobileAlt, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import styles from './SignUp.module.css';
import cx from 'classnames';
import signup from './sign up.png';
import PersonalizeExperience from '../../components/Container/signup/personalizeExperience/personalizeExperience.jsx';
import LocationModal from '../../components/Container/signup/locationModal/locationModal.jsx';
import MinSalary from '../../components/Container/signup/minSalary/minSalary.jsx';
import JobSeeking from '../../components/Container/signup/jobSeeking/jobSeeking.jsx';
import AllSet from '../../components/Container/signup/allSet/allSet.jsx';
import SignUpHeader from './signupHeader.png';
import DonePopup from '../../components/DonePopup/DonePopup.jsx';
import search from './1search.png';
import employerFriendly from './2employerFriendly.png';
import secure from './3Secure.png';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { useToaster } from '../../components/Toaster';
const validatePassword = (password) => {
    
    const errors = [];
    
    if (!/[a-z]/.test(password)) {
        errors.push("Password must include at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must include at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
        errors.push("Password must include at least one digit.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push("Password must include at least one special character (e.g., !@#$%^&*).");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    return errors;
};


const SignUp = () => {

    const showToaster = useToaster();
    const location = useLocation();
    const { active } = location.state || {};

    const navigate = useNavigate();
    const [signUpDetails, setsignUpDetails] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });

    useEffect(() => {
        const localID = localStorage.getItem("id");
        window.scrollTo(0, 0);
        if (localID) {
            window.location.replace("/"); 
        }
    }, []);
    
    const changeHanlder = (e) => {
        const { name, value } = e.target;
        setsignUpDetails((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUpDetails.mobile.length !== 10) {
            showToaster('Please Check Your Mobile Number', 'error');
        } else {
            const errors = validatePassword(signUpDetails.password);
            if (errors.length > 0) {
                showToaster(errors.join("\n"), 'error');
            } else {
                localStorage.setItem("name",signUpDetails.name)
                localStorage.setItem("email",signUpDetails.email)
                localStorage.setItem("password",signUpDetails.password)
                localStorage.setItem("mobile",signUpDetails.mobile)
                setShowModal(true);
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);


    const [showModal, setShowModal] = useState(false); 
    const [showLocationModal, setShowLocationModal] = useState(false); 
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false); 
    const [showSetModal, setShowSetModal] = useState(false);
    const [showDonePopup, setShowDonePopup] = useState(false); // State for DonePopup

    const handleCurrentModel = (currentModel) =>{
        currentModel(false)
    }

    const handleCloseModal = (backModalState, setModalState) => {
        setModalState(false);
        backModalState(true);
    };

    const handleNextModal = (prevModalState ,NextModalState) => {
        prevModalState(false);
        NextModalState(true);
    }

    // Modified function to show DonePopup
    const handleEmployerModal = () => {
        setShowDonePopup(true); // Show DonePopup
    }

    return (
        <div style={{backgroundColor: '#F5FAFF'}}>
            <Header active = {active} />
            <div style={{width:'100%', position:'relative'}}>
                <img src={SignUpHeader} alt='Sign Up'  className={styles.imgDEs}/>
                <div style={{color:'white',fontSize:'40px',fontWeight:'500' ,display:'flex',justifyContent:'center' ,position:'relative',bottom:'80px' }}>
                    <label style={{color:'#2A85FE'}}>
                        Find Your Dream Job 
                    </label>
                    <label style={{marginLeft:'5px'}}>
                        or Hire the Best Talent with JobSphere
                    </label>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <div className={cx(styles.loginContainer, { [styles.blurred]: showModal })}>
                    <div className={styles.loginForm}>
                        <div className={styles.leftContainer}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.leftTop}>
                                    <label className={styles.getStarted} > 
                                        LET'S GET STARTED
                                    </label>
                                    <label className={styles.about}> 
                                        Tell us about Yourself !!
                                    </label>
                                </div>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputContainer}>
                                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                                        <input
                                            name='name'
                                            type="text"
                                            value={signUpDetails.name}
                                            onChange={changeHanlder}
                                            className={styles.input}
                                            placeholder='Full Name'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputContainer}>
                                        <FontAwesomeIcon icon={faMobileAlt} className={styles.icon} />
                                        <input
                                            name='mobile'
                                            type="number"
                                            value={signUpDetails.mobile}
                                            onChange={changeHanlder}
                                            className={styles.input}
                                            placeholder='Mobile No.'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputContainer}>
                                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                                        <input
                                            name='email'
                                            type="email"
                                            value={signUpDetails.email}
                                            onChange={changeHanlder}
                                            className={styles.input}
                                            placeholder='E-mail'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputContainer}>
                                        <FontAwesomeIcon icon={faLock} className={styles.icon} />
                                        <input
                                            name='password'
                                            type={showPassword ? "text" : "password"}
                                            value={signUpDetails.password}
                                            onChange={changeHanlder}
                                            className={styles.input}
                                            placeholder='Password'
                                            required
                                        />
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            className={styles.eyeIcon}
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{position:'absolute' , right:'25px' , paddingTop:'15px', cursor: 'pointer'}}
                                        />
                                    </div>
                                </div>
                                <button className={cx(styles.button , styles.pointer)} type="submit">Continue</button>
                                <div className={styles.leftBottom}>
                                    <label className={styles.bottomLabel}> 
                                        Already a member?
                                    </label>
                                    <label onClick={() => navigate('/login' , { state: { active: "signup" } })} className={cx(styles.bottomLabel, styles.bluecolor ,styles.pointer)}> 
                                        Login
                                    </label>
                                </div>
                            </form>
                        </div>
                        <img src={signup} alt='Signup' className={styles.image}/>
                    </div>
                </div>
                <div style={{backgroundColor:'#F5FAFF' , padding:'50px' }}>
                    <div style={{display:'flex',alignItems:'center' , paddingBottom:'50px', flexDirection:'column'}}>
                        <label style={{fontWeight:'500', fontSize:'64px' ,color:'#4B4B4B'}}>
                            WHY CHOOSE JOBSPHERE
                        </label>
                        <label style={{color:'#2A85FE',fontWeight:'500', fontSize:'28px'}}>
                            Thousands of job opportunities at your fingertips. Employers 
                        </label>
                        <label style={{color:'#2A85FE',fontWeight:'500', fontSize:'28px' }}>
                            can reach top talent with just one click.
                        </label>
                    </div>
                    <div style={{display:'flex',alignItems:'center' , justifyContent:'center',gap:'50px' , flexDirection:'row'}}>
                    <div className={styles.disFlex}>
                        <div>
                            <img src={search} alt='Search' className={styles.botImage}/>
                        </div>
                        <div className={styles.disFlex}>
                            <label style={{color:'#2A85FE', fontSize:'28px'}}>
                                Easy Job Search 
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                Advanced filters and personalized  
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                recommendations to match your skills 
                            </label>
                        </div>
                    </div>
                    <div className={styles.disFlex}>
                        <div>
                            <img src={employerFriendly} alt='Employer Friendly' className={styles.botImage}/>
                        </div>
                        <div className={styles.disFlex}>
                            <label style={{color:'#2A85FE', fontSize:'28px'}}>
                                Employer-Friendly 
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                Post jobs and manage applicants  
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                easily with our intuitive dashboard 
                            </label>
                        </div>
                    </div>
                    <div className={styles.disFlex}>
                        <div>
                            <img src={secure} alt='Secure' className={styles.botImage}/>
                        </div>
                        <div className={styles.disFlex}>
                            <label style={{color:'#2A85FE', fontSize:'28px'}}>
                                Secure & Trusted
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                Secure platform trusted by top  
                            </label>
                            <label style={{color:'#4B4B4B', fontSize:'20px'}}>
                                companies and professionals. 
                            </label>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <PersonalizeExperience handleCurrentModal={() => handleCurrentModel(setShowModal)}  
                handleNextModal={() => handleNextModal( setShowModal, setShowLocationModal)}
                handleEmployerModal={() => handleEmployerModal()}
                />
            )}
            {showLocationModal && (
                <LocationModal back={() => handleCloseModal(setShowModal, setShowLocationModal)}  
                    next={() => handleNextModal( setShowLocationModal, setShowSalaryModal)}
                    skip={() => handleNextModal( setShowLocationModal, setShowSalaryModal)}
                    handleCurrentModal={() => handleCurrentModel(setShowLocationModal)} 
                />
            )}
            {showSalaryModal && (
                <MinSalary back={() => handleCloseModal(setShowLocationModal, setShowSalaryModal)}  
                next={() => handleNextModal( setShowSalaryModal, setShowJobModal)}
                skip={() => handleNextModal( setShowSalaryModal, setShowJobModal)}
                handleCurrentModal={() => handleCurrentModel(setShowSalaryModal)} 
                />
            )}
            {showJobModal && (
                <JobSeeking 
                back={() => handleCloseModal(setShowSalaryModal, setShowJobModal)}  
                next={() => handleNextModal( setShowJobModal, setShowSetModal)}
                skip={() => handleNextModal( setShowJobModal, setShowSetModal)}
                handleCurrentModal={() => handleCurrentModel(setShowJobModal)} 
                />
            )}
            {showSetModal && (
                <AllSet handleCurrentModal={() => handleCurrentModel(setShowSetModal)} 
                
                />
            )}
            {showDonePopup && (
                <DonePopup handleCurrentModal={() => setShowDonePopup(false)}
                label1 = "For registering an employer account, email us at"
                label2 = "info@codroidhub.in"
                label3 = "and our team will assist you promptly."
                label4 = "Thank you for your patience!"
                />
            )}
            <Footer />
        </div>
    );
};

export default SignUp;
