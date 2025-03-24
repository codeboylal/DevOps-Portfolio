// import React, { useState, useEffect } from "react";
// import styles from '../dashboard.module.css';

// import card1 from '../images/card1.png';
// import card2 from '../images/card2.png';
// import card3 from '../images/card3.png';


// import cx from 'classnames';

// // icons for page navigation in continue watching
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// // progress bar
// import { styled } from '@mui/material/styles';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// // progress bar in card description in continue watching
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: '6px',
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#D9D9D9',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#D9D9D9',
//         }),
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: '#FF702D',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#FF702D',
//         }),
//     },
// }));


// function ContinueWatching({continueWatchingListProp}) {

//     const [cardsData , setcardsData]=useState([]);

// useEffect(() => {
//     const filteredCards = continueWatchingListProp.filter(card => card.progress !== 100);
//     setcardsData(filteredCards);
// }, [continueWatchingListProp]);


//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 3;
//     const totalPages = Math.ceil(cardsData.length / itemsPerPage);

//     const handleNextPage = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Calculate the items to display for the current page
//     const startIndex = currentPage * itemsPerPage;
//     const currentCards = cardsData.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <div className={styles.continueWatchingDiv}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <label style={{ color: '#000000', fontWeight: '600', fontSize: '20px' }}>
//                     Continue Watching
//                 </label>
//                 <div className={styles.arrowNavigation}>
//                     <div className={styles.circle} onClick={handlePrevPage} style={{ cursor: currentPage > 0 ? 'pointer' : 'not-allowed' }}>
//                         <FontAwesomeIcon icon={faChevronLeft} />
//                     </div>
//                     <div className={styles.circle} onClick={handleNextPage} style={{ cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed' }}>
//                         <FontAwesomeIcon icon={faChevronRight} />
//                     </div>
//                 </div>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '24px' , position: 'relative'}}>
//                 {currentCards.map((card) => (
//                     <div className={styles.cardDes} key={card.id}>
//                         <img src={card.image ==="card1" ? card1 : card.image==="card2" ? card2 : card3 } alt={`card ${card.id}`} className={styles.cardImageDes} />
//                         <label className={styles.cardHeading}>
//                             {card.title}
//                         </label>
//                         <label className={styles.cardDesc}>
//                             {card.description}
//                         </label>
//                         <div style={{padding:'0px 24px', display: 'flex', flexDirection: 'column', gap: '10px',position: 'absolute', bottom: '24px', left: '0', right: '0'}}> 
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end' }}>
//                                 <label className={styles.lessonStyling}>
//                                     {card.lessons}
//                                 </label>
//                                 <label className={cx(styles.lessonStyling, styles.lessonStyling2)}>
//                                     Lessons
//                                 </label>
//                             </div>
//                             <div>
//                                 <BorderLinearProgress variant="determinate" value={card.progress} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 {currentCards?.length > 0 ? '' : 'Please enroll a course first.'}
//             </div>
//         </div>
//     );
// }

// export default ContinueWatching;













// import React, { useState, useEffect } from "react";
// // import styles from '../dashboard.module.css';
// import styles from './continueWatching.module.css';
// import card1 from '../images/card1.png';
// import card2 from '../images/card2.png';
// import card3 from '../images/card3.png';

// import cx from 'classnames';

// // icons for page navigation in continue watching
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// // progress bar
// import { styled } from '@mui/material/styles';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// // progress bar in card description in continue watching
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: '6px',
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#D9D9D9',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#D9D9D9',
//         }),
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: '#FF702D',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#FF702D',
//         }),
//     },
// }));


// function ContinueWatching({ continueWatchingListProp }) {
//     const [cardsData, setcardsData] = useState([]);
//     const [itemsPerPage, setItemsPerPage] = useState(3);
//     const [currentPage, setCurrentPage] = useState(0);

//     useEffect(() => {
//         const filteredCards = continueWatchingListProp.filter(card => card.progress !== 100);
//         setcardsData(filteredCards);
//     }, [continueWatchingListProp]);

//     // Adjust the number of items per page based on window width
//     const updateItemsPerPage = () => {
//         if (window.innerWidth <= 900) {
//             setItemsPerPage(1);
//         } else {
//             setItemsPerPage(3);
//         }
//     };

//     useEffect(() => {
//         updateItemsPerPage(); // initial check
//         window.addEventListener('resize', updateItemsPerPage); // update on window resize

//         return () => {
//             window.removeEventListener('resize', updateItemsPerPage); // cleanup on component unmount
//         };
//     }, []);

//     const totalPages = Math.ceil(cardsData.length / itemsPerPage);

//     const handleNextPage = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Calculate the items to display for the current page
//     const startIndex = currentPage * itemsPerPage;
//     const currentCards = cardsData.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <div className={styles.continueWatchingDiv}>
//             <div className={styles.arrowContinue} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <label style={{ color: '#000000', fontWeight: '600', fontSize: '20px' }}>
//                     Continue Watching
//                 </label>
//                 <div className={styles.arrowNavigation}>
//                     <div className={styles.circle} onClick={handlePrevPage} style={{ cursor: currentPage > 0 ? 'pointer' : 'not-allowed' }}>
//                         <FontAwesomeIcon icon={faChevronLeft} />
//                     </div>
//                     <div className={styles.circle} onClick={handleNextPage} style={{ cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed' }}>
//                         <FontAwesomeIcon icon={faChevronRight} />
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.cardsContainer}>
//                 {currentCards.map((card) => (
//                     <div className={styles.cardDes} key={card.id}>
//                         <img src={card.image === "card1" ? card1 : card.image === "card2" ? card2 : card3} alt={`card ${card.id}`} className={styles.cardImageDes} />
//                         <label className={styles.cardHeading}>
//                             {card.title}
//                         </label>
//                         <label className={styles.cardDesc}>
//                             {card.description}
//                         </label>
//                         <div style={{ padding: '0px 24px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'absolute', bottom: '24px', left: '0', right: '0' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end' }}>
//                                 <label className={styles.lessonStyling}>
//                                     {card.lessons}
//                                 </label>
//                                 <label className={cx(styles.lessonStyling, styles.lessonStyling2)}>
//                                     Lessons
//                                 </label>
//                             </div>
//                             <div>
//                                 <BorderLinearProgress variant="determinate" value={card.progress} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 {currentCards?.length > 0 ? '' : 'Please enroll a course first.'}
//             </div>
//         </div>
//     );
// }

// export default ContinueWatching;













import React, { useState, useEffect } from "react";
// import styles from '../dashboard.module.css';
import styles from './continueWatching.module.css';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';

import cx from 'classnames';

// icons for page navigation in continue watching
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// progress bar
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";

// progress bar in card description in continue watching
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: '6px',
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#D9D9D9',
        ...theme.applyStyles('dark', {
            backgroundColor: '#D9D9D9',
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#FF702D',
        ...theme.applyStyles('dark', {
            backgroundColor: '#FF702D',
        }),
    },
}));

function ContinueWatching({ continueWatchingListProp }) {
    const [cardsData, setcardsData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCards = continueWatchingListProp.filter(card => card.progress !== 100);
        setcardsData(filteredCards);
    }, [continueWatchingListProp]);

    // Adjust the number of items per page based on window width
    const updateItemsPerPage = () => {
        if (window.innerWidth <= 900) {
            setItemsPerPage(1);
        } else {
            setItemsPerPage(3);
        }
    };

    const handleContinueWatching=()=>{
        navigate('/allCourse')
    }

    useEffect(() => {
        updateItemsPerPage(); // initial check
        window.addEventListener('resize', updateItemsPerPage); // update on window resize

        return () => {
            window.removeEventListener('resize', updateItemsPerPage); // cleanup on component unmount
        };
    }, []);

    const totalPages = Math.ceil(cardsData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculate the items to display for the current page
    const startIndex = currentPage * itemsPerPage;
    const currentCards = cardsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className={styles.continueWatchingDiv}>
            <div className={styles.arrowContinue} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ color: '#000000', fontWeight: '600', fontSize: '20px' }}>
                    Continue Watching
                </label>
                <div className={styles.arrowNavigation} style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
                    <div className={styles.circle} onClick={handlePrevPage} style={{ cursor: currentPage > 0 ? 'pointer' : 'not-allowed' }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={styles.circle} onClick={handleNextPage} style={{ cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed' }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
            <div className={styles.cardsContainer} onClick={handleContinueWatching}>
                {currentCards.map((card) => (
                    <div className={styles.cardDes} key={card.id}>
                        <img src={card.image === "card1" ? card1 : card.image === "card2" ? card2 : card3} alt={`card ${card.id}`} className={styles.cardImageDes} />
                        <label className={styles.cardHeading}>
                            {card.title}
                        </label>
                        <label className={styles.cardDesc}>
                            {card.description}
                        </label>
                        <div style={{ padding: '0px 24px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'absolute', bottom: '24px', left: '0', right: '0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end' }}>
                                <label className={styles.lessonStyling}>
                                    {card.lessons}
                                </label>
                                <label className={cx(styles.lessonStyling, styles.lessonStyling2)}>
                                    Lessons
                                </label>
                            </div>
                            <div>
                                <BorderLinearProgress variant="determinate" value={card.progress} />
                            </div>
                        </div>
                    </div>
                ))}
                {currentCards?.length > 0 ? '' : 'Please enroll a course first.'}
            </div>
        </div>
    );
}

export default ContinueWatching;
