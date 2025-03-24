// import React from 'react';
// import styles from './footer.module.css';
// import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
// import lmsTransparentLogo from './lmsTransparentLogo.png';  // Assuming you have a profile picture

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//         <div className='threeSection'>
//       <div className={styles.section}>
//         <h4>Policy Info</h4>
//         <ul>
//           <li><a href="#">Terms & Conditions</a></li>
//           <li><a href="#">Privacy Policy</a></li>
//           <li><a href="#">Terms of Use</a></li>
//           <li><a href="#">Disclaimer</a></li>
//         </ul>
//       </div>
//       <div className={styles.section}>
//         <h4>About Us</h4>
//         <ul>
//           <li><a href="#">About Us</a></li>
//           <li><a href="#">Our Team</a></li>
//           <li><a href="#">Testimonials</a></li>
//           <li><a href="#">Upcoming Products</a></li>
//         </ul>
//       </div>
//       <div className={styles.section}>
//         <h4>Business</h4>
//         <ul>
//           <li><a href="#">Franchise</a></li>
//           <li><a href="#">Stores</a></li>
//           <li><a href="#">Decoration Service</a></li>
//           <li><a href="#">Gifts</a></li>
//         </ul>
//       </div>
//       </div>
//       <div className={styles.logoAndIcons}>
//         <div className={styles.logo}>
//         <img src={lmsTransparentLogo} alt="Profile" className={styles.smallProfileImage} />

//         </div>
//         <div className={styles.icons}>
//           <Facebook className={styles.icon} />
//           <Twitter className={styles.icon} />
//           <Instagram className={styles.icon} />
//           <LinkedIn className={styles.icon} />
//           <YouTube className={styles.icon} />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;








import React from 'react';
import styles from './footer.module.css';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import lmsTransparentLogo from './lmsTransparentLogo.png';  // Assuming you have a logo image

import Theme from '../Font/theme';
import { ThemeProvider } from '@mui/material/styles';

const Footer = () => {
  return (
    <ThemeProvider theme={Theme}>

    <footer className={styles.footer} style={{width:'100%'}}>
        <div className='mainContainer'>
      <div className={styles.threeSection}>
        <div className={styles.section}>
          <h4>Policy Info</h4>
          <ul>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>About Us</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Upcoming Products</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Business</h4>
          <ul>
            <li><a href="#">Franchise</a></li>
            <li><a href="#">Stores</a></li>
            <li><a href="#">Decoration Service</a></li>
            <li><a href="#">Gifts</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.logoAndIcons}>
        <img src={lmsTransparentLogo} alt="LMS Logo" className={styles.logo} />
        <div className={styles.icons}>
          <Facebook className={styles.Facebookicon} />
          <Twitter className={styles.Twittericon} />
          <Instagram className={styles.Instagramicon} />
          <LinkedIn className={styles.LinkedInicon} />
          <YouTube className={styles.YouTubeicon} />
        </div>
      </div>
      </div>
    </footer>
    </ThemeProvider>

  );
};

export default Footer;
