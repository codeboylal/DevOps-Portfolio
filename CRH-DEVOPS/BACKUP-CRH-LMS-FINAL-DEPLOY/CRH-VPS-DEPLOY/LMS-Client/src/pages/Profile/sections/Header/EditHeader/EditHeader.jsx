import React, { useState, useEffect } from "react";
import styles from './Editheader.module.css';
import CloseIcon from '@mui/icons-material/Close';
import InputMaterialUI from "../../../../../components/Input/textField";
import cx from "classnames";
import { updateHeaderProfile } from "../../../../../services/Tasks/updateTasks";


import { useToaster } from "../../../../../Toaster";
import ComboBoxInput from "../../../../../components/Input/ComboBox";
import LoadingSpinner from "../../../../../Common Components/Loader/Loader";



const EditProfilePopup = ({setSaveState,cancelState, setCancelState , setUserData, userData, headerPopupState, setheaderPopupState }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        mobileNo: '',
        location: '',
        Languages: []
    });

    const showToaster = useToaster();
    
    const [inputValue, setInputValue] = useState('');
    const [helperText, setHelperText] = useState({});
    const [id, setId] = useState();

    const [isClicked, setIsClicked] = useState(false);

    useEffect(()=>{
        try{
            setId(localStorage.getItem("id"));
        }catch(err){
            console.log("Error fetching User ID from local storage")
        }
    },[])


    useEffect(() => {
        window.scrollTo(0, 0);
        if (userData) {
            setFormValues({
                name: userData.name || '',
                email: userData.email || '',
                mobileNo: userData.mobileNo || '',
                location: userData.location || '',
                Languages: userData.Languages || [] // Set as an array
            });
        }
    }, [userData, headerPopupState]);

    const validateInput = (field, value) => {
        let error = '';
        switch (field) {
            case 'name':
                const nameRegex = /^[A-Za-z\s]*$/;
                if (!value) error = "Please fill this field";
                else if (!nameRegex.test(value) || value.length > 20)
                    error = value.length > 20 ? "Maximum 20 characters allowed." : "Invalid Name";
                break;

            case 'email':
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value))
                    error = value.length > 0 ? "Please enter a valid email address." : "Please fill this field";
                break;

            case 'mobileNo':
                const mobileRegex = /^[0-9]*$/;
                const mobileLimit = 10;
                if (value.startsWith(0))
                    error = "Mobile number can not start with 0.";
                else if (value.length > mobileLimit)
                    error = "Mobile number can't be greater than 10 digits.";
                else if (!mobileRegex.test(value) && value.length > 0)
                    error = "Please enter a valid mobile number.";
                else if (value.length < mobileLimit && value.length > 0)
                    error = "Mobile number must be 10 digits.";
                break;

            case 'location':
                const locationRegex = /^[A-Za-z\s]*$/;
                const locationLimit = 15;
                if (value.length > locationLimit)
                    error = "Location can't be greater than 15 alphabets.";
                else if (!locationRegex.test(value) && value.length > 0)
                    error = "Please enter a valid location.";
                break;

            case 'Languages':
                const languageRegex = /^[A-Za-z]*$/; // Allow only alphabetic characters
                const languageLimit = 15;
            
                // Ensure value is a string before calling trim
                const stringValue = String(value || ''); // Fallback to empty string if value is undefined
            
                // If the input is empty, don't set an error
                if (stringValue.trim().length > 0) { // Only validate if there's input
                    if (stringValue.trim().length > languageLimit) {
                        error = "Language can't be greater than 15 alphabets.";
                    } else if (!languageRegex.test(stringValue.trim())) { // Check if it only contains alphabets
                        error = "Please enter a valid language.";
                    }
                }
                break;
            
                
            default:
                break;
        }
        return error;
    };

    const handleRemoveLanguage = (language) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            Languages: prevValues.Languages.filter((lang) => lang !== language),
        }));
    };

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value || ''
        }));
        setHelperText((prevHelperText) => ({
            ...prevHelperText,
            [field]: validateInput(field, value)
        }));
    };

    const handleLocationChange = (field) => (newValue) => {
        const value = newValue || ''; // Handle empty value or null case
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value
        }));
        setHelperText((prevHelperText) => ({
            ...prevHelperText,
            [field]: validateInput(field, value)
        }));
    };
    

    const [loadingState, setLoadingState] = useState(false)


    const handleSave = () => {
        setLoadingState(true)
        const newHelperText = {};
        let valid = true;

        for (const field in formValues) {
            if(field !=="Languages"){
                const error = validateInput(field, formValues[field]);
                newHelperText[field] = error;
                if (error) valid = false;
            }
        }
        setIsClicked(true);
        setHelperText(newHelperText);

        if (valid) {
            console.log("All fields are valid. Proceeding with save operation");
            // console.log(formValues)
            setInputValue(undefined)
            updateHeaderProfile({newData: formValues , userId: id }).then(response=>{
                setUserData(response?.data?.data[0]);
                setCancelState(false)
                setSaveState(true)
                showToaster('Profile Updated Successfully', 'success')
            }).catch(err=>{
                showToaster('Profile Updation Failed', 'error')
                
                console.log("Server error while saving profile header data")
            })
            setLoadingState(false)
            setIsClicked(false);
            setheaderPopupState(false); // Close the popup after saving
        }
    };

    const handleLanguages = () => {
        const trimmedValue = inputValue.trim();
        const error = validateInput('Languages', trimmedValue);

        // Check if the input is valid and not a duplicate
        if (!error && trimmedValue && !formValues.Languages.includes(trimmedValue) && formValues.Languages.length < 5) {
            setFormValues((prevValues) => ({
                ...prevValues,
                Languages: [...prevValues.Languages, trimmedValue],
            }));
            setInputValue(''); // Clear the input field
            setHelperText({ ...helperText, Languages: '' }); // Clear any previous error messages
        } else if (!trimmedValue) {
            setHelperText({ ...helperText, Languages: 'Please enter a valid language.' });
        } else {
            if(formValues.Languages.length >= 5){
                setHelperText({ ...helperText, Languages: error || "Delete a Language to add new one" });
            }else{
                console.log(formValues.Languages.length)
                setHelperText({ ...helperText, Languages: error || "Language already exists." });
            }
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value); // Update the input value
        // Validate the input on change
        setHelperText((prevHelperText) => ({
            ...prevHelperText,
            Languages: validateInput('Languages', value)
        }));
    };

    return (
        headerPopupState && (
            <div className={styles.outerDiv} style={{zIndex:headerPopupState ? '60':''}}>
                <div style={{display:loadingState ? 'block' : 'none'}}>
                    <LoadingSpinner />
                </div>
                <div className={styles.popupDes} style={{display:loadingState ? 'none' : 'flex'}}>
                    <label className={styles.HeadingDes}>Edit Profile</label>

                    <InputMaterialUI
                        title="Name"
                        errorState={!!helperText.name}
                        helperText={helperText.name}
                        value={formValues.name}
                        onChange={handleChange('name')}
                    />

                    <InputMaterialUI
                        title="Email"
                        errorState={!!helperText.email}
                        helperText={helperText.email}
                        value={formValues.email}
                        onChange={handleChange('email')}
                    />

                    <InputMaterialUI
                        title="Phone Number"
                        errorState={!!helperText.mobileNo}
                        helperText={helperText.mobileNo}
                        value={formValues.mobileNo}
                        onChange={handleChange('mobileNo')}
                    />

                    {/* <InputMaterialUI
                        title="Location"
                        errorState={!!helperText.location}
                        helperText={helperText.location}
                        value={formValues.location}
                        onChange={handleChange('location')}
                    /> */}

                    <ComboBoxInput
                        title="Location"
                        errorState={!!helperText.location}
                        helperText={helperText.location}
                        value={formValues.location}
                        onChange={handleLocationChange('location')}
                        options={['Chandigarh', 'Kurukshetra', 'Ambala', 'Kathmandu (Nepal)', 'Delhi', 'Gurugram', 'Mohali', 'Panchkula']}
                    />


                    <div className={styles.labelDes}>
                        <label >
                            Language
                        </label>
                        <label style={{fontSize:'12px'}}>
                            (Max 5)
                        </label>
                    </div>

                    <InputMaterialUI
                        title="Add Language"
                        errorState={!!helperText.Languages}
                        helperText={helperText.Languages}
                        value={inputValue} // Use the inputValue state
                        onChange={handleInputChange} // Update input field with validation
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); 
                                handleLanguages();
                            }
                        }}
                    />

                    {/* <button onClick={handleLanguages} className={styles.LanguagesButton}>Add Language</button> */}

                    <div className={styles.languageDataDiv}>
                        {Array.isArray(formValues.Languages) && formValues.Languages.map((language, index) => (
                            <div key={index} className={styles.languageDes}>
                                <label>{language}</label>
                                <CloseIcon 
                                    className={styles.pointer} 
                                    onClick={() => handleRemoveLanguage(language)} 
                                />
                            </div>
                        ))}
                    </div>

                    <div className={styles.saveCancelDiv}>
                        <button
                            className={cx(styles.cancelButton, styles.pointer)}
                            onClick={() => {setheaderPopupState(false); setCancelState(true); setHelperText({})}}
                        >
                            Cancel
                        </button>
                        <button
                            className={cx(styles.saveButton, styles.pointer)}
                            onClick={handleSave}
                            disabled={Object.values(helperText).some(text => text) || isClicked}
                            style={{
                                backgroundColor: Object.values(helperText).some(text => text) || isClicked ? '#FFEDDE' : '',
                                color: Object.values(helperText).some(text => text) || isClicked ? '#FF702D' : '#fff',
                                cursor: Object.values(helperText).some(text => text) || isClicked ? 'default' : 'pointer',
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default EditProfilePopup;
