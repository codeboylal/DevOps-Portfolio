import React from "react";
import styles from "./Footer.module.css";
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';


const Footer = () => {
    return(
        <div className={styles.footer}>
            <div style={{color:'white', height:'100%', width:'100%' ,display:'flex' , position:'relative'}}>
            <div className={styles.header__logo}>
                <div className={styles.logoButton} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
                    <div style={{ borderLeft: '5px solid white', height: '35px', margin: '0px 0px 0px 10px' }}></div>
                    </div>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <label style={{ color: '#2A85FE', padding: '0', fontSize: '28px', cursor: 'pointer' }}>
                        Job
                    </label>
                    <label style={{ fontSize: '28px', padding: '0', cursor: 'pointer' }}>
                        Sphere
                    </label>
                    </div>
                </div>
            </div>
            <div style={{position:'absolute',right:'30px', bottom:'35px',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                <div style={{display:'flex',flexDirection:'column',paddingBottom:'15px', alignItems:'flex-end'}}>
                    <label style={{fontSize:'17px'}}>
                        A dynamic career gateway that connects job seekers and employers, offering 
                    </label>
                    <label style={{fontSize:'17px'}}>
                        endless opportunities to shape futures and build dream careers.
                    </label>
                </div>
                <label style={{fontSize:'14px'}}>
                <FontAwesomeIcon icon={faCopyright} style={{marginRight:'5px'}} />2024, JobSphere. All rights reserved.
                </label>
            </div>
            </div>
        </div>
    );
};

export default Footer;