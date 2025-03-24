import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';
import cx from 'classnames';
import login from './login.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import search from './1search.png';
import employerFriendly from './2employerFriendly.png';
import secure from './3Secure.png';
import { useToaster } from '../../components/Toaster';
import SignUpHeader from './signupHeader.png';

import {Base_URL} from "../../const/const.js";

const Login = () => {
  
    const showToaster = useToaster();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');        //annant@gmail.com
    const [password, setPassword] = useState('');          //cbJH87*&

    const [showPassword, setShowPassword] = useState(false);

    const {active} = location.state || {};

    useEffect(() => {
        const localID = localStorage.getItem("id");
        window.scrollTo(0, 0);
        if (localID) {
            window.location.replace("/"); 
        }
    }, []);



    const clickHandle = () =>{
        showToaster("This feature will be added soon", 'info');
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${Base_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                localStorage.clear();
                // showToaster('Login successful!', 'success');
                console.log(data)
                localStorage.setItem("id", data.id);
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("savedJobs", JSON.stringify(data.savedJobs));
                localStorage.setItem("appliedJobs", JSON.stringify(data.appliedJobs));
                navigate('/', { state: { active: "Find Jobs" } })
            } else {
                showToaster(`Login failed!\nIncorrect email or password !!`, 'error');
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    return (
       <div className={styles.centerDiv}>
        <Header active = {active} />
        <div style={{width:'100%', position:'relative'}}>
            <img src={SignUpHeader} alt='Sign Up'  className={styles.imgDEs}/>
            <div style={{color:'white',fontSize:'40px',fontWeight:'500' , display:'flex',justifyContent:'center' ,position:'relative',bottom:'80px' }}>
                <label style={{color:'#2A85FE'}}>
                    Find Your Dream Job 
                </label>
                <label style={{marginLeft:'5px'}}>
                    or Hire the Best Talent with JobSphere
                </label>
            </div>
        </div>
        
            <div style={{width:'1200px' } }>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <div className={styles.leftContainer}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.leftTop}>
                                <label className={styles.welcome}> 
                                    WELCOME
                                </label>
                                <label className={styles.logintoAccount}> 
                                    Please Login to your Account
                                </label>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputContainer}>
                                    <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.input}
                                        placeholder='Email'
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputContainer}>
                                    <FontAwesomeIcon icon={faLock} className={styles.icon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={styles.input}
                                        placeholder='Password'
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye} 
                                        className={styles.iconVisiblePass}
                                        style={{position:'absolute', right:'10px', cursor:'pointer'}}
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                            </div>
                            <div className={styles.savePasswordDiv}>
                                {/* <div className={styles.checkLabel}>
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={isChecked}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label className={styles.label} >
                                        Save Password
                                    </label>
                                </div> */}
                                <div>
                                    <label onClick={clickHandle} className={cx(styles.label, styles.pointer)}>
                                        Forgot Password?
                                    </label>
                                </div>
                            </div>
                            <button style={{marginTop:'40px'}} className={cx(styles.button, styles.pointer)} type="submit">Login</button>
                            <div className={styles.leftBottom} style={{marginTop:'25px'}}>
                                <label className={styles.bottomLabel}> 
                                    Don't have account?
                                </label>
                                <label onClick={() => navigate('/signup', { state: { active: "login" } })} className={cx(styles.bottomLabel, styles.bluecolor, styles.pointer)}> 
                                    Register Yourself
                                </label>
                            </div>
                        </form>
                    </div>
                    <img src={login} alt='Login' className={styles.image}/>
                </div>
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
        <Footer />
       </div>
    );
};

export default Login;
