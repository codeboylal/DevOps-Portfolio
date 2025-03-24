import React, { useEffect, useState } from "react";
import styles from "./ContactUs.module.css";

import cx from "classnames";

import { useToaster } from "../../Toaster"; 
import DeleteIcon from '@mui/icons-material/Delete';

// icons import
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutral from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfied from '@mui/icons-material/SentimentVerySatisfied';
import SidebarDashboard from "../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../Common Components/Header Dashboard Page/headerDashboardPage";
import Base_URL from "../../const/const";
import LoadingSpinner from "../../Common Components/Loader/Loader";
import CustomButton from "../../Common Components/Button Component/Coustom Button/customButton";

function ContactPage() {
    const showToaster = useToaster();

    const [selectedIcons, setSelectedIcons] = useState([]); // Store multiple selected icons
    const [query, setQuery] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [isError, setIsError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [userId, setUserId] = useState('')

    const [fileName, setFileName] = useState("");
    const [selectedLevel, setSelectedLevel] = useState(0);

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
    },[])


    const handleIconClick = (icon) => {
        setSelectedIcons((prevIcons) =>
            prevIcons.includes(icon) ? prevIcons.filter((i) => i !== icon) : [...prevIcons, icon]
        );
    };

    const levels = [
        { component: SentimentVeryDissatisfied, value: 1 },
        { component: SentimentDissatisfied, value: 2 },
        { component: SentimentNeutral, value: 3 },
        { component: SentimentSatisfied, value: 4 },
        { component: SentimentVerySatisfied, value: 5 },
      ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log("selectedIcons", selectedIcons);
    }, [selectedIcons]);

    // Check if the Send button should be disabled based on these conditions
    const isSendDisabled = query === "";

    // console.log(isSendDisabled)

    async function sendMailFunction() {
        const sendContactUsEmail = async (query) => {
            try {
                setIsLoading(true); // Start loading
                const response = await fetch(`${Base_URL}/api/contact/send-mail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',  // Specify the content type
                    },
                    body: JSON.stringify({
                        name: 'Annant', 
                        email: 'ch.developer.annant@gmail.com', 
                        query,
                        suggestion,
                        userId
                    }) 
                });

                const result = await response.json(); // Parse the response

                if (response.ok) {
                    // Success handling
                    console.log(result.message); // "Email sent successfully"
                    showToaster('Feedback Sent!', 'success')
                } else {
                    // Error handling
                    console.error(result.error);
                    showToaster('There was an error sending your query.', 'error')
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An unexpected error occurred. Please try again.");
            } finally {
                setIsLoading(false); // Stop loading
            }
        };        
        if(query.length >= 1){
            sendContactUsEmail(query);
        }else{
            setIsError(true)
        }
        console.log(query);
    }

    return (
        <div className={styles.container} style={{ display: 'flex' }}>
            <SidebarDashboard page={"Contact"}/>
            <div className={styles.contentContainer}>
                <HeaderDashboardPage 
                pageText={"Contact and Support"}
                AppBarText={"We're here for you, anytime!"}/>
                {isLoading ? ( // Show loading spinner if loading
                    <LoadingSpinner />
                ) : (
                    <div className={styles.containerContact}>
                        <div className={styles.divInput}>
                            <div className={styles.inputDivTop}>
                            <div className={styles.selectContainer}>
                                <select
                                    className={cx(
                                        styles.inputDes,
                                        styles.querySelect,
                                        styles.selectElement
                                    )}
                                    value={query}
                                    style={{ height: '45px', minHeight: '45px',
                                        color:isError && 'red'
                                     }}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        if (isError) {
                                            setIsError(false);
                                        }
                                    }}
                                >
                                    <option className={styles.placeholderOption} value="">
                                        Query Type
                                    </option>
                                    <option className={styles.option} value="Suggestion">Suggestion</option>
                                    <option className={styles.option} value="Bug Raise">Bug Raise</option>
                                    <option className={styles.option} value="Improvement">Improvement</option>
                                </select>
                            </div>

                                {/* <textarea 
                                    className={styles.inputDes}
                                    placeholder="Query Description"
                                    value={suggestion}
                                    // disabled={query === ""} // Disable if query is not selected
                                    onChange={(e) => { setSuggestion(e.target.value); }} 
                                /> */}


                            <textarea
                            className={`${styles.inputDes} ${isFocused ? styles.focused : ''}`}
                            placeholder="Query Description"
                            value={suggestion}
                            onChange={(e) => setSuggestion(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            />

                            </div>
                            <div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
                                <label>
                                    {fileName.length > 0 ? fileName : 'No File Selected'} 
                                </label>
                                {fileName.length > 0 && (
                                    <button onClick={() => {setFileName("")
                                        document.getElementById('fileInput').value = ""}
                                    } style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <DeleteIcon sx={{ color: '#FF702D' }} />
                                    </button>
                                )}
                            </div>
                            <div className={styles.chooseFileOuterBox}>
                                <div className={styles.chooseFile} onClick={() => document.getElementById('fileInput').click()}>
                                    Choose File 
                                </div>
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                className={styles.hiddenInput}
                                onInput={(e) => {console.log(e.target.files[0]); showToaster("Image Inserted","success"); setFileName(e.target.files[0].name)}}
                            />
                            <div className={styles.ratingContainer}>
                                <label className={styles.ratingLabel}>
                                    Wanna rate us? (Optional)
                                </label>
                                {/* <div className={styles.ratingIcons}>
                                    <SentimentVeryDissatisfied
                                        className={selectedIcons.includes('veryDissatisfied') ? styles.selectedPointer : styles.pointer}
                                        fontSize="large"
                                        color={selectedIcons.includes('veryDissatisfied') ? "#FF702D" : "disabled"}
                                        onClick={() => handleIconClick('veryDissatisfied')}
                                    />
                                    <SentimentDissatisfied
                                        className={selectedIcons.includes('dissatisfied') ? styles.selectedPointer : styles.pointer}
                                        fontSize="large"
                                        color={selectedIcons.includes('dissatisfied') ? "#FF702D" : "disabled"}
                                        onClick={() => handleIconClick('dissatisfied')}
                                    />
                                    <SentimentNeutral
                                        className={selectedIcons.includes('neutral') ? styles.selectedPointer : styles.pointer}
                                        fontSize="large"
                                        color={selectedIcons.includes('neutral') ? "#FF702D" : "disabled"}
                                        onClick={() => handleIconClick('neutral')}
                                    />
                                    <SentimentSatisfied
                                        className={selectedIcons.includes('satisfied') ? styles.selectedPointer : styles.pointer}
                                        fontSize="large"
                                        color={selectedIcons.includes('satisfied') ? "#FF702D" : "disabled"}
                                        onClick={() => handleIconClick('satisfied')}
                                    />
                                    <SentimentVerySatisfied
                                        className={selectedIcons.includes('verySatisfied') ? styles.selectedPointer : styles.pointer}
                                        fontSize="large"
                                        color={selectedIcons.includes('verySatisfied') ? "#FF702D" : "disabled"}
                                        onClick={() => handleIconClick('verySatisfied')}
                                    />
                                </div> */}

                        <div className={styles.ratingIcons}>
                            {levels.map(({ component: Icon, value }) => (
                                <Icon
                                key={value}
                                className={value <= selectedLevel ? styles.selectedPointer : styles.pointer}
                                fontSize="large"
                                style={{ color: value <= selectedLevel ? '#FF702D' : 'gray' }}
                                onClick={() => setSelectedLevel(value)}
                                />
                            ))}
                            </div>
                            </div>
                            <div className={styles.buttonContainer}>
                                {/* <button 
                                    className={styles.ButtonDes}
                                    style={{
                                        cursor: isSendDisabled && 'default',
                                        backgroundColor: isSendDisabled && '#FFEDDE',
                                        color: isSendDisabled && '#FF702D'
                                    }}
                                    disabled={isSendDisabled}
                                    onClick={sendMailFunction}
                                >
                                    Send
                                </button> */}

                                <CustomButton
                                    buttonType="save"
                                    buttonText="Save"
                                    //   className={styles.ButtonDes}

                                    customStyles={{
                                        cursor: isSendDisabled && 'not-allowed',
                                        backgroundColor: isSendDisabled && '#FFEDDE',
                                        color: isSendDisabled && '#FF702D'
                                    }}
                                    disabled={isSendDisabled}
                                    onClick={sendMailFunction}

                                />





                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactPage;
