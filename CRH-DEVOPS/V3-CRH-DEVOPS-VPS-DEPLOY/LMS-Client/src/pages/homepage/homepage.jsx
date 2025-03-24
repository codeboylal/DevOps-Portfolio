import React, { useState, useEffect } from 'react';

import styles from './homepage.module.css';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import HeaderLandingPage from '../../Common Components/Header Landing Page/headerLandingPage';
import Footer from '../../Common Components/Footer/footer';
import CustomSearch from '../../Common Components/Input Component/Custom Search/customSearch';
import { HowToReg, AccessTime } from '@mui/icons-material'; 
import { Book } from '@mui/icons-material';
import DevIcon from '../homepage/LSM SVG AND IMG NEW/Development.svg';
import TechIcon from '../homepage/LSM SVG AND IMG NEW/Technology.svg';
import TchIcon from '../homepage/LSM SVG AND IMG NEW/Technology.svg';
import AiIcon from '../homepage/LSM SVG AND IMG NEW/Ai.svg';
import DataIcon from '../homepage/LSM SVG AND IMG NEW/Data Science.svg';
import GraIcon from '../homepage/LSM SVG AND IMG NEW/Gra.svg'
import WebIcon from '../homepage/LSM SVG AND IMG NEW/Web Designing.svg'
import SoftIcon from '../homepage/LSM SVG AND IMG NEW/Software Development.svg'
import GameIcon from '../homepage/LSM SVG AND IMG NEW/Game Development.svg'
import ThreeIcon from '../homepage/LSM SVG AND IMG NEW/Three.svg'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

import teacherImage1 from "./images/teacher i.png";
import teacherImage2 from "./images/teacher 2.png";
import teacherImage3 from "./images/teacher 3.png";
import teacherImage4 from "./images/teacher 4.png";
import backgroundImage from './images/bb.png';
import EnrollCourseCard from '../../Common Components/Course Cards Component/Enroll Course/enrollCourse';
import sideimg from './images/Hero.png'; 
import { getExploreCourses } from '../../services/Courses/GetCourses';

import { ReactComponent as SignUpIcon } from '../homepage/LSM SVG AND IMG NEW/signup.svg';
import { ReactComponent as BrowseCoursesIcon } from '../homepage/LSM SVG AND IMG NEW/Browse.svg';
import { ReactComponent as TrackProgressIcon } from '../homepage/LSM SVG AND IMG NEW/Track.svg'
import Signup from '../../components/container/Signup/Signup';
import LoginPopUP from '../../components/container/Login/Login';



const categories = [
  { name: 'Development', courses: 3, bgColor: '#E5F6F7', color: '#0E61D3', icon: DevIcon },
  { name: 'Technology', courses: 3, bgColor: '#FFF7E8', color: '#F8B554', icon: TchIcon },
  { name: 'Artificial Intelligence', courses: 3, bgColor: '#FDE8EC', color: '#F04B54', icon: AiIcon },
  { name: 'Data Science', courses: 3, bgColor: '#F5FAE7', color: '#77A103', icon: DataIcon },
  { name: 'Graphics and Multimedia', courses: 3, bgColor: '#E7FAFD', color: '#028CA2', icon: GraIcon },
  { name: 'Web Designing', courses: 3, bgColor: '#F3E5F5', color: '#4F0673', icon: WebIcon },
  { name: 'Software Development', courses: 3, bgColor: '#FCE9F4', color: '#C182EE', icon: SoftIcon },
  { name: 'Game Development', courses: 3, bgColor: '#FFF7E8', color: '#E77346', icon: GameIcon },
  { name: '3D + Animation', courses: 3, bgColor: '#FDE8EC', color: '#8D001B', icon: ThreeIcon },
];



const teachers = [
  {
    name: "Chris Watson",
    title: "Python teacher",
    image: teacherImage1,   
  },
  {
    name: "Chris Watson",
    title: "Python teacher",
    image: teacherImage2,   
  },
  {
    name: "Chris Watson",
    title: "Python teacher",
    image: teacherImage3,   
  },
  {
    name: "Chris Watson",
    title: "Python teacher",
    image: teacherImage4, 
  },
];



function HomePage() {
  const [courses, setCourse] = useState([]);
const theme = useTheme();

  useEffect(() => {
    async function getCourseDetails() {
      try {
        const response = await getExploreCourses();
        setCourse(response?.data?.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }
    getCourseDetails();
  }, []);


  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const openSignup = () => setIsSignupVisible(true);
  const closeSignup = () => setIsSignupVisible(false);



  const navigate = useNavigate()
  const [loginModel, setLoginModel] = useState(false)
  const [signUpModel, setSignUpModel] = useState(false);
  const exploreCourseLanding = () => {
    try {
      const localID = localStorage.getItem("id");
      if (!localID || localID === "" || localID === null) {
        setLoginModel(true)
        setIsSignupVisible(true)
        document.body.style.overflow = 'hidden';

      } else {
        // console.log(localID)


        // Clean up the overflow when the component is unmounted

        // navigate('/LoginPopUP')
        navigate("/ExploreCourses")
      }
    } catch {
      setLoginModel(true)
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <HeaderLandingPage />

      <div style={{ width: '1440px', display: 'flex', alignItems: 'center', gap: '24px', flexDirection: 'column' }}>
        <Box sx={{
          width: '100%',
          height: '653px',
          display: 'flex', 
          backgroundColor: '#FFEDE5',
          [theme.breakpoints.down('1500')]: {
            width: '1350px', // Width for screens <= 1100px
          
          },
          [theme.breakpoints.down('1300')]: {
            width: '1250px', // Width for screens <= 1100px
          
          },
          
        }}>

          {/* Left Side: Text and CustomSearch */}
          <Box sx={{
            flex: 1,  
            paddingLeft: '96px',
            paddingTop: '118px',
            paddingBottom: '118px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
            <Typography
              variant="h3"
              className='font'
              gutterBottom
              sx={{
                // fontFamily: 'Inter',
                width: '850px',
                fontSize: '94.86px',
                fontWeight: '400',
                lineHeight: '94.86px',
                textAlign: 'left',
                [theme.breakpoints.down('1500')]: {
                
                  fontSize: '92.86px',
                  width: '750px',
                
                },
                [theme.breakpoints.down('1300')]: {
                 
                  fontSize: '64.86px',
                  width: '580px',
                
                },
              }}
            >
              Unlock Your Future <br />
              with World-Class <br />
              <span style={{ color: '#FF702D' }}>Online Learning</span>
            </Typography>

            <Typography
              variant="subtitle1"

              sx={{
                fontFamily: 'Inter',
                fontSize: '26.2px',
                fontWeight: '500',
                color: '#000000',
                textAlign: 'left'
              }}
            >
              Learn at Your Own Pace with Top Instructors!
            </Typography>

            <CustomSearch
              searchType="withButton"
              placeholderText="Search your courses..."
              buttonText="SEARCH"
              customInputStyles={{ borderRadius: '25px' }}
              customButtonStyles={{ backgroundColor: '#FF6F00', color: 'white' }}
            />
          </Box>

          {/* Right Side: Background Image */}
          <Box sx={{
            flex: .70,  // Takes 50% of the width
            backgroundImage: `url(${sideimg})`,   
            backgroundPosition: 'center right',   
            backgroundRepeat: 'no-repeat',  
            backgroundSize: '100%',
            [theme.breakpoints.down('1500')]: {
              // width: '1250px', // Width for screens <= 1100px
              // fontSize: '90.86px',
              backgroundSize:'100%',
            
            },    
            [theme.breakpoints.down('1300')]: {
              // width: '1250px', // Width for screens <= 1100px
              // fontSize: '90.86px',
            // flex: .60,  // Takes 50% of the width
            marginRight:'70px',

              backgroundSize:'100%',
            
            },    

            
          }}>
          </Box>
        </Box>


        {/* Browse by Category */}
        <Box sx={{ padding: '2rem 48px', backgroundColor: '#FDF4F4',
                          [theme.breakpoints.down('1500')]: {
                            width: '1300px', // Width for screens <= 1100px
                          
                          },
                  [theme.breakpoints.down('1200')]: {
                    width: '1200px', // Width for screens <= 1100px
                  
                  },
           [theme.breakpoints.down('1100')]: {
            width: '1070px', // Width for screens <= 1100px
          
          },

          
         }}>
          {/* Title Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ marginBottom: '1rem', textAlign: 'left' }}>
              <span style={{ color: 'black', fontWeight: '500', fontFamily: 'inter' }}>Browse By</span> <span style={{ color: '#FF702D', fontWeight: '700', fontFamily: 'inter' }}>Category</span>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#FF702D',
                cursor: 'pointer',
                fontWeight: 'bold',
                textAlign: 'right',
                fontSize: '20px',
                
              }}
            >
              View All
            </Typography>
          </Box>

          {/* Categories Grid */}
          <Grid container spacing={3} justifyContent="flex-start">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ paddingBottom: '24px' }}>
                <Card
                  sx={{
                    backgroundColor: category.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '24px',
                    gap: '12px',
                    borderRadius: '20px',
                    width: '432px',
                    height: '161px',
                    boxShadow: 'none',
                    [theme.breakpoints.down('1500')]: {
                      width: '370px', // Width for screens <= 1100px
                    
                    },
                    [theme.breakpoints.down('1200')]: {
                      width: '350px', // Width for screens <= 1100px
                    
                    },

                    [theme.breakpoints.down('1100')]: {
                      width: '300px', // Width for screens <= 1100px
                    
                    },

          
                  }}
                >
                  {/* Icon Box */}
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '1rem', // Increase padding for a larger icon container
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '9.5px', // 9.5px space between icon and text
                      width: '80px', // Increase width for a larger icon
                      height: '80px', // Increase height for a larger icon
                    }}
                  >
                    {/* Custom SVG icon */}
                    <img src={category.icon} alt={`${category.name} icon`} style={{ width: '60px', height: '60px' }} />
                  </Box>

                  {/* Text */}
                  <CardContent sx={{
                    padding: 0,
                    paddingTop: '21px'
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: category.color,
                        fontWeight: '600',
                        marginBottom: '12px',
                        textAlign: 'left',
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '24.2px',
                        textAlign: 'left',
                      }}
                    >
                      {category.courses} courses
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>




        {/* categories*/}
        <Box
          sx={{
            position: 'relative', // Set position relative for overlay
            padding: '2rem',
            textAlign: 'center',
            height: '301px',
            display: 'flex',
            justifyContent: 'center', // Center the content horizontally
            alignItems: 'center', // Center the content vertically
            backgroundImage: `url(${backgroundImage})`, // Background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            width: '100vw'// Ensure no overflow
          }}
        >
          {/* Overlay Box */}
          <Box
            sx={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#491700', // Brown color
              opacity: 0.8, // 80% opacity
              zIndex: 1,
            }}
          />

          {/* Main content */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center', // Center content within the grid
            }}
          >
            {[
              { stat: '20+', label: 'Categories' },
              { stat: '105', label: 'Instructors' },
              { stat: '200', label: 'Courses' },
              { stat: '350', label: 'Classes' },
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '78.95px', // Set font size
                    lineHeight: '95.54px', // Set line height
                    letterSpacing: '1%', // Set letter spacing
                    textAlign: 'center', // Align text to center
                  }}
                >
                  {item.stat}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontFamily: 'Inter', // Set font family
                    fontSize: '32.89px', // Set font size
                    fontWeight: 600, // Set font weight
                    lineHeight: '39.81px', // Set line height
                    letterSpacing: '0.01em', // Set letter spacing
                    textAlign: 'center', // Align text to center
                  }}
                >
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

        </Box>


        {/* Most Popular Courses */}
        <div className={styles.popularCoursesContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingLeft: '48px', paddingRight: '48px' }}>
            <Typography variant="h4" sx={{ textAlign: 'left' }}>
              <span style={{ color: 'black', fontWeight: '500', fontFamily: 'inter', fontSize: '32px' }}>Most popular</span> <span style={{ color: '#FF702D', fontSize: '32px', fontWeight: '700' }}>Courses</span>
            </Typography>




            <Typography
              variant="body2"
              sx={{
                color: '#FF702D',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'right',
              }}
            >
              View All
            </Typography>
          </div>

          <div className={styles.gridContainer}>
            {courses.slice(1, 7).map((course, index) => (
              <div key={index}>
                <div onClick={exploreCourseLanding}>
                  <EnrollCourseCard
                    courseImg={course?.image}
                    courseTitle={course.coursename}
                    courseDescription={course.courseDescription}
                    coursePrice={course.courseAmount[1]}
                    courseLesson={course.courseLesson}
                    courseApplied={course.courseDifficulty[0]}
                    courseDifficulty={course.courseDifficulty[1]}
                    courseDuration={course.courseDuration}
                    courseRating0={course.courseRating[0]}
                    courseRating1={course.courseRating[1]}
                    width={"435"}
                    filterShow={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Actions Section */}

        <Box sx={{ paddingLeft: '20px', paddingRight: '20 px', paddingTop: '86px', paddingBottom: '76px', textAlign: 'center',
                                  [theme.breakpoints.down('1200')]: {
                                    width: '1150px', // Width for screens <= 1100px

                                  }, 

                                  [theme.breakpoints.down('1100')]: {
                                    width: '980px', // Width for screens <= 1100px
                                    // paddingRight:'5px'
                                    // paddingLeft: '205px',
                                    // paddingRight: '5px'
                                  
                                  }, 

        }}>
          <Grid container spacing={15} justifyContent="space-between">
            {[
              {
                icon: <SignUpIcon style={{ width: '111.69px', height: '95px', color: '#FF702D' }} />, // Adjusted size
                title: (<>Sign up for<br /> Free</>),
                description: (
                  <>Create a free account to access <br /> our course library</>
                ),
              },
              {
                icon: <BrowseCoursesIcon className={styles.icon} style={{ width: '111.69px', height: '95px', color: '#FF702D' }} />, // Adjusted size
                title: "Browse & Purchase Courses",
                description: (<>Choose from a wide range of <br /> subjects to fit your career goals</>),
              },
              {
                icon: <TrackProgressIcon style={{ width: '111.69px', height: '95px', color: '#FF702D' }} />, // Adjusted size
                title: "Track Progress at Your Own Pace",
                description: (<>Learn at your convenience and <br /> earn certifications</>),
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>{item.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '26.72px',
                      fontWeight: 600,
                      lineHeight: '32.34px',
                      textAlign: 'center',
                      marginTop: 2,
             
                      
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '15.59px',
                      fontWeight: 600,
                      lineHeight: '18.86px',
                      textAlign: 'center',
                      marginTop: 1,
                      color: '#7D7D7D'
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Best Talented Teachers Section */}


        <div style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
        {/* Our Best Talented Teachers Section */}
        <div style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              [theme.breakpoints.down('1500')]: {
                width: '1350px', // Width for screens <= 1100px
                paddingLeft:'33px'
              
              },
              [theme.breakpoints.down('1400')]: {
                width: '1150px', 
                paddingLeft:'50px',
                paddingRight:'50px',
              
              }
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: '32px',
                fontWeight: '500',
                fontFamily: 'Inter',
                color: 'inherit',
                textAlign: 'left',
              }}
            >
              Our best talented{' '}
              <span
                style={{
                  color: '#FF702D',
                  fontSize: '32px',
                  fontWeight: '700',
                }}
              >
                Teachers
              </span>
            </Typography>

            {/* Slider buttons */}
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton
                onClick={exploreCourseLanding} // Trigger the function on click
                sx={{
                  width: '30px',
                  height: '30px',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={exploreCourseLanding} // Trigger the function on click
                sx={{
                  width: '30px',
                  height: '30px',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </div>





          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '170px' }}>
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className={styles.teacherNameContainer}
                // style={{
                //   width: '316px',
                //   height: '365px',
                //   borderRadius: '21.98px',
                //   backgroundColor: '#FEE7DC',
                //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                //   textAlign: 'center',
                //   padding: '20px',
                //   boxSizing: 'border-box',

                // }}
              >
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className={styles.teacherImage}
                  // style={{
                  //   width : '273px',
                  //   height: '315px',
                  //   borderRadius: '21.98px 21.98px 0 0',
                  //   // paddingBottom: '153px',
                  //   objectFit: 'cover',
                  //   position: 'relative',
                  //   bottom: '153px'
                  // }}
                  
                />
                <div className='nameAndTitle' style={{
                  position: 'relative',
                  bottom: '75px'
                }}>
                  <h6 style={{
                    fontFamily: 'Inter',
                    fontSize: '26.37px',
                    fontWeight: '700',
                    lineHeight: '31.92px',
                    textAlign: 'center',
                    margin: '4.4px',
                  }}
                  >
                    {teacher.name}
                  </h6>
                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '15.38px',
                      fontWeight: '500',
                      lineHeight: '18.62px',
                      textAlign: 'center',
                      margin: '4.4px',
                      marginBottom: '48.35px',
                      color: '#8d8d8d',
                    }}
                  >
                    {teacher.title}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>

      </div>


      <Footer />
      <LoginPopUP signUpModel={signUpModel} setSignUpModel={setSignUpModel} loginModel={loginModel} setLoginModel={setLoginModel} />
      <Signup loginModel={loginModel} setLoginModel={setLoginModel} setSignUpModel={setSignUpModel} signUpModel={signUpModel} />
      <div>
        <div className={isSignupVisible ? "dim-background" : ""}>
          {!isSignupVisible && <LoginPopUP openSignup={openSignup} />}
        </div>
        {isSignupVisible && <Signup closeSignup={closeSignup} />}
      </div>

    </div>
  );
}

export default HomePage;


