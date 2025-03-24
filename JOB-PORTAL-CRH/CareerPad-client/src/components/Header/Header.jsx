import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBookmark, faCaretDown,  faBell, faUser , faCog, faSignOutAlt    } from "@fortawesome/free-solid-svg-icons"; 
import vector from './Vector.png';
import demo from './demo.jpeg'
import { Base_URL } from "../../const/const";
const Header = ({ active, clearFilter }) => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("");
  const [profileImg , setprofileImg] = useState("")


  //Dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = (event) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  // use effect for profile image

useEffect(() => {
  const fetchProfileImage = async () => {
    try {
      const userID = localStorage.getItem("id");
      const response = await fetch(`${Base_URL}/apiGetIMG/${userID}`);

      if (!response.ok) {
        throw new Error("Failed to fetch profile image");
      }

      const data = await response.json(); 
      setprofileImg(data?.profile?.picImageURL ? `${Base_URL}${data.profile.picImageURL}` : demo);
    } catch (error) {
      console.log("Error Fetching Profile Image:", error);
    }
  };

  if(active!=="signup" && active!=="login"){
    // console.log(active)
    fetchProfileImage();
  }
  }, []);

// Effect to log the profileImg state after it updates
// useEffect(() => {
//   if (profileImg) {
//     console.log(profileImg, profileImg.length); // Logs when profileImg has been set
//   }
// }, [profileImg]);



  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setProfileName(name || "Guest");
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate('/login', { state: { active: "signup" } });
  };

  const handleSignupClick = () => {
    console.log('Signup button clicked');
    navigate('/signup',{state:{active:'login'}});
  };

  const handleLoginClick = () => {
    console.log('Login button clicked');
    navigate('/login',{state:{active:'signup'}});
  };


  return (
    <header 
      className={styles.header} 
    >
       <div className={styles.header__logo}>
       <div 
          className={styles.logoButton} 
          style={{ cursor: 'pointer' }} 
          onClick={(active !== "login" && active !== "signup") ? () => navigate('/', { state: { active: "Find Jobs" }}) : undefined }
        >

          <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <img src={vector} alt="Logo" style={{ width: '30px', height: '30px' }} />
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
      {(active === "Find Jobs" || active === "Saved Jobs" || active === "Profile") &&(
      <div style={{width:'100%' , display:'flex',justifyContent:'center'}}>
        <nav className={styles.header__nav}>
          <button
            className={`${styles.header__button} ${active === "Find Jobs" ? styles.buttonActive : ""}`}
            onClick={() => {navigate('/', { state: { active: "Find Jobs" } }); active==="Saved Jobs" && clearFilter()}}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            Find Jobs
          </button>
          <button
            className={`${styles.header__button} ${active === "Saved Jobs" ? styles.buttonActive : ""}`}
            onClick={() => {navigate('/', { state: { active: "Saved Jobs" } }); }}
          >
            <FontAwesomeIcon icon={faBookmark} />
            Saved Jobs
          </button>
          <button
            className={`${styles.header__button} ${active === "Profile" ? styles.buttonActive : ""}`}
            onClick={() => navigate('/profile', { state: { active: "Profile" } })}
          >
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </button>
          <div className={styles.header__user}>
            <FontAwesomeIcon icon={faBell } style={{ cursor: 'pointer' }} />
            {/* Profile pic */}
            <div style={{height:'35px',width:'35px'  }}>
            <label
              style={{
                backgroundImage: `url(${profileImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%', // Adjust as per your design
                height: '100%', // Adjust as per your design
                borderRadius: '50%', // For a circular image
                display: 'block',
              }}
            >
            </label>
            </div>
            <span className={styles.header__profile}>{profileName}</span>
            {/* <FontAwesomeIcon icon={faCaretDown } style={{ cursor: 'pointer' }} onClick={logOut} /> */}
            <div className="dropdown-container">
              {/* FontAwesomeIcon with onClick event to toggle dropdown */}
              <FontAwesomeIcon
                icon={faCaretDown}
                className="dropdown-icon"
                style={{ cursor: 'pointer' }}
                onClick={toggleDropdown}
              />

              {/* Conditionally render the dropdown */}
              {showDropdown && (
                <div className={styles.dropdownMenu} onClick={(event) => event.stopPropagation()}>
                  <ul className={styles.dropdownList}>
                    <li className={styles.dropdownItem} onClick={() => {setShowDropdown(false); navigate('/profile', { state: { active: "Profile" } })}}>
                      <FontAwesomeIcon icon={faUser  } style={{ cursor: 'pointer' }} />
                      My Profile
                    </li>
                    <li className={styles.dropdownItem} onClick={(event) => { event.stopPropagation(); alert('Settings clicked'); }}>
                      <FontAwesomeIcon icon={faCog  } style={{ cursor: 'pointer' }} />
                      Settings
                    </li>
                    <li className={styles.dropdownItem} onClick={() => {setShowDropdown(false); navigate('/', { state: { active: "Saved Jobs" } })}}>
                      <FontAwesomeIcon icon={faBookmark} style={{ cursor: 'pointer' }}/>
                      Saved
                    </li>
                    <li className={styles.dropdownItem} onClick={(event) => { event.stopPropagation(); logOut(); }}>
                      <FontAwesomeIcon icon={faSignOutAlt   } style={{ cursor: 'pointer' }} />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
        
      </div>
    )}
      {active === "signup" && (
        <nav>
          <button className={styles.HeaderSecondaryButton}
          onClick={handleSignupClick}
          style={{cursor:'pointer'}}
          >
            Sign up
          </button>
        </nav>
      )}
      {active === "login" && (
      <nav>
        <button className={styles.HeaderButton}
          style={{cursor:'pointer'}}
          onClick={handleLoginClick}
          >
            Login
        </button>
      </nav>
      )}
    </header>
  );
};

export default Header;
