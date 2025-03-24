import React, { useEffect, useState } from "react";
import styles from "./EditEducation.module.css";
import cx from "classnames";
import InputMaterialUI from "../../../../../components/Input/textField";
import Checkbox from '@mui/material/Checkbox';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SelectInput from "../../../../../components/Input/selectInput";
import ErrorComponent from "../../../../../components/Error/Error";
import { updateEducationProfile } from "../../../../../services/Tasks/updateTasks";

import { useToaster } from "../../../../../Toaster";
import LoadingSpinner from "../../../../../Common Components/Loader/Loader";
import { Flag } from "@mui/icons-material";



const EditEducationPopUp = ({setSaveState, showHideEduPopup, setShowHideEduPopup }) => {


    const showToaster = useToaster();


    const [eduIndex, setEduIndex] = useState();
    const [eduDataLocal, setEduDataLocal ] = useState();
    useEffect(()=>{
        if(showHideEduPopup){
            setEduIndex(localStorage.getItem("EducationIndex"))
            setEduDataLocal(JSON.parse(localStorage.getItem("EducationData")))
        }
    },[showHideEduPopup])

    // useEffect(()=>{
    //     if(eduIndex){
    //         console.log(eduIndex)
    //     }
    // },[eduIndex])

    // Value Fields
    const [universityNameValue, setUniversityNameValue] = useState("");
    const [courseNameValue, setCourseNameValue] = useState("");
    const [specializationValue, setSpecializationValue] = useState("");
    const [marksValue, setMarksValue] = useState("");

    
    // Change value of input fields
    
    const changeUniversityName = (e) => {
        const value = e.target.value;
        setUniversityNameValue(value);
        // if (!/^[a-zA-Z\s]*$/.test(value)) {
        //     setUniversityNameError("Only alphabets and spaces are allowed.");
        if (!/^[^0-9]*$/.test(value)) {
            setUniversityNameError("Numbers are not allowed.");
        }else{
            if(value.length > 30){
                setUniversityNameError("Cannot exceed 30 Characters");
            }else{
                setUniversityNameError("")
            }
        }
    };
    
    const changeCourseName = (e) => {
        const value = e.target.value;
        setCourseNameValue(value);
    
        // if (!/^[a-zA-Z\s]*$/.test(value)) {
        //     setCourseNameError("Only alphabets and spaces are allowed.");
        if (!/^[^0-9]*$/.test(value)) {
            setCourseNameError("Numbers are not allowed.");
        } else if (value.length > 30) {
            setCourseNameError("Cannot exceed 30 characters.");
        } else {
            setCourseNameError("");
        }
    };
    
    const changeSpecialization = (e) => {
        const value = e.target.value;
        setSpecializationValue(value);
    
        // if (!/^[a-zA-Z\s]*$/.test(value)) {
        //     setSpecializationError("Only alphabets and spaces are allowed.");
        if (!/^[^0-9]*$/.test(value)) {
            setSpecializationError("Numbers are not allowed.");
        } else if (value.length > 30) {
            setSpecializationError("Cannot exceed 30 characters.");
        } else {
            setSpecializationError("");
        }
    };
    
    const [marksError, setMarksError] = useState("")

    const changeMarks = (e) => {
        const value = e.target.value;
        setMarksValue(value);
        // if (!/^[0-9]*$/.test(value)) {
        //     setMarksError("Only numbers are allowed.");
        // } else 
        if (value.length > 10) {
            setMarksError("Cannot exceed 10 characters.");
        } else {
            setMarksError("");
        }
    };


    // Error fields
    const [educationError, setEducationError] = useState("");
    const [universityNameError, setUniversityNameError] = useState("");
    const [courseNameError, setCourseNameError] = useState("");
    const [specializationError, setSpecializationError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [radioError, setRadioError] = useState("")


    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedValue(value); 
        setRadioError("")
        // console.log(value);
    };

    const [Education, setEducation] = useState('');

    const handleEducationChange = (event) => {
        setEducation(event.target.value);
        setEducationError("")
    };

    const handleEducationClear = () => {
        setEducation(''); 
        setUniversityNameValue("");
        setCourseNameValue("");
        setSpecializationValue("");
        setEducationError("");
        setUniversityNameError("");
        setCourseNameError("");
        setSpecializationError("");
    };

    const [startDate, setStartDate] = useState('');

    const handleStartDateChange = (event) => {
        // setStartDate(event.target.value);
        if(endDate > 0){
            if(endDate >= event.target.value){
                setStartDate(event.target.value);
                setStartDateError("")  
            }else{
                setStartDateError("Start year Can't be greater")
            }
        }else{
            setStartDate(event.target.value);
            setStartDateError("")  
        }
        setEndDateError("")
    };
    const handleStartDateClear = () => {
        setStartDate(""); 
        setEndDate("")
        setStartDateError("")
        setEndDateError("")
    };


    const [endDate, setEndDate] = useState('');

    const handleEndDateChange = (event) => {
        if(startDate > event.target.value){
            setEndDateError("End year Can't be smaller")
        }else{
            setEndDateError("")
            setEndDate(event.target.value);
        }
        // setStartDateError("")
    };

    const handleEndDateClear = () => {
        setEndDate(''); 
        setEndDateError("")
    };


    const [errorState,  setErrorState] = useState(false);
    useEffect(()=>{
        if(educationError.length > 0 || universityNameError.length > 0 || courseNameError.length > 0 || startDateError.length > 0 || endDateError.length > 0 || radioError?.length > 0){
            setErrorState(true)
        }else{
            setErrorState(false)
        }
    },[educationError, universityNameError, courseNameError, specializationError, startDateError, endDateError, radioError])


    // checkbox 
    const [isPrimaryEducation, setIsPrimaryEducation] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsPrimaryEducation(event.target.checked);
        // console.log(event.target.checked)
    };


    useEffect(()=>{
        if(eduDataLocal){
            // console.log(eduDataLocal)
            setEducation(eduDataLocal?.Education || "")
            setUniversityNameValue(eduDataLocal?.universityNameValue || "")
            setCourseNameValue(eduDataLocal?.courseNameValue || "")
            setSpecializationValue(eduDataLocal?.specializationValue || "")
            setSelectedValue(eduDataLocal?.selectedValue || "")
            setStartDate(eduDataLocal?.startDate || "")
            setEndDate(eduDataLocal?.endDate || "")
            setMarksValue(eduDataLocal?.marksValue || "")
            // if(eduIndex===0){
            //     setIsPrimaryEducation(eduDataLocal?.isPrimaryEducation || false)
            // } 
            setEducationError("");
            setUniversityNameError("");
            setCourseNameError("");
            setSpecializationError("");
            setMarksError("");
            setEndDateError("");
            setStartDateError("");
            setRadioError("")
        }
    },[eduDataLocal])

    const [loadingState, setLoadingState] = useState(false)

    const updateEducation = () => {
        const eduData = {
            Education,
            universityNameValue,
            courseNameValue,
            specializationValue,
            selectedValue,
            startDate,
            endDate,
            marksValue,
            isPrimaryEducation
        }
        console.log(eduData)
        if(eduData?.Education?.length === 0 || eduData?.universityNameValue?.length === 0 || eduData?.courseNameValue?.length === 0 || eduData?.selectedValue?.length === 0 || eduData?.startDate?.length === 0 || eduData?.endDate?.length === 0){
            if(eduData?.Education?.length === 0 ){
                setEducationError("This field can not be empty")
            }
            if(eduData?.universityNameValue?.length === 0){
                setUniversityNameError("This field can not be empty")
            }
            if(eduData?.courseNameValue?.length === 0){
                setCourseNameError("This field can not be empty")
            }
            if(eduData?.startDate?.length === 0){
                setStartDateError("This field can not be empty")
            }
            if(eduData?.endDate?.length === 0){
                setEndDateError("This field can not be empty")
            }
            if(eduData?.selectedValue?.length === 0){
                setRadioError("This field can not be empty")
            }
        }else{
            setLoadingState(true)
            try{
                const id = localStorage.getItem("id")
                updateEducationProfile({eduData,id, eduIndex}).then(response=>{
                    // console.log("education Added Successfully")

                    if(eduIndex){
                        showToaster('Education Updated Successfully', 'success')
                    }else{
                        showToaster('Education Added Successfully', 'success')
                    }
                    setSaveState(true)
                })
                try{
                    localStorage.removeItem("EducationIndex")
                    localStorage.removeItem("EducationData")
                }catch{
                    
                }
            }catch{
                console.log("Id is not defined")
                showToaster('Education Updation Failed','error')
            }
            setLoadingState(true)
            setShowHideEduPopup(false)
        }
    }


    return (
        showHideEduPopup && (
            <div className={styles.outerDiv} style={{ zIndex: showHideEduPopup ? "60" : "" }}>
                <div style={{display:loadingState ? 'block' : 'none'}}>
                    <LoadingSpinner />
                </div>
                <div className={styles.EditEduContainer} style={{display:loadingState ? 'none' : 'flex'}}>
                    <div>
                        <label className={styles.EduLabel}>Education</label>
                    </div>
                    <div className={styles.CourseDetailDiv}>
                        <div className={styles.courseDetailChildrenDiv}>
                            {/* <InputMaterialUI title={"Select Education"} customWidth="300px" /> */}
                            <div>
                                <SelectInput handleClear={handleEducationClear} value={Education} setValue={setEducation} handleChange={handleEducationChange} width={"300px"} title={"Select Education"} options={["Masters", "Bachelors", "School", "Diploma", "PhD"]} />
                                <ErrorComponent error={educationError} />
                            </div>
                            <div>
                                <InputMaterialUI
                                    title={"University Name"} 
                                    customWidth="300px" 
                                    value={universityNameValue}
                                    onChange={changeUniversityName}
                                />
                                <ErrorComponent error={universityNameError} />
                            </div>
                        </div>
                        <div className={styles.courseDetailChildrenDiv}>
                            <div>
                                <InputMaterialUI 
                                    title={"Course Name"} 
                                    customWidth="300px"
                                    value={courseNameValue} 
                                    onChange={changeCourseName}
                                />
                                <ErrorComponent error={courseNameError} />
                            </div>
                            <div>
                                <InputMaterialUI  
                                    title={"Specialization"} 
                                    customWidth="300px"
                                    value={specializationValue} 
                                    onChange={changeSpecialization}
                                />
                                <ErrorComponent error={specializationError} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.CourseDetailDiv} style={{gap:'0px'}}>
                        <div>
                            <label className={styles.labelDes}>Course type</label>
                        </div>
                        <div className={styles.inlineOptions}>
                            <RadioGroup
                            className={styles.radioGroup}
                                name="courseType"
                                value={selectedValue}
                                onChange={handleChange}
                                row
                                sx={{
                                    height: '24px',
                                }}
                            >
                                <FormControlLabel 
                                    value="Full Time" 
                                    control={<Radio sx={{
                                        color: "black",
                                        '&.Mui-checked': {
                                            color: "black",
                                        }
                                    }} />} 
                                    label="Full time" 
                                />
                                <FormControlLabel 
                                    value="Part Time" 
                                    control={<Radio sx={{
                                        color: "black",
                                        '&.Mui-checked': {
                                            color: "black",
                                        }
                                    }} />} 
                                    label="Part time" 
                                />
                                <FormControlLabel 
                                    value="Distance Learning" 
                                    control={<Radio sx={{
                                        color: "black",
                                        '&.Mui-checked': {
                                            color: "black",
                                        }
                                    }} />} 
                                    label="Distance learning" 
                                />
                            </RadioGroup>
                        </div>
                        <div style={{paddingTop:'10px', display:radioError.length > 0 ? 'block' : 'none'}}>
                            <ErrorComponent error={radioError} />
                        </div>
                    </div>
                    <div className={styles.CourseDetailDiv}>
                        <div>
                            <label className={styles.labelDes}>Duration</label>
                        </div>
                        <div className={styles.courseDetailChildrenDiv} style={{ gap: "10px" }}>
                            {/* <InputMaterialUI title={"Start Year"} customWidth="292.5px" /> */}
                            <div>
                                <SelectInput 
                                    value={startDate} 
                                    setValue={setStartDate} 
                                    handleChange={handleStartDateChange} 
                                    width={"292.5px"} 
                                    title={"Start Year"} 
                                    handleClear={handleStartDateClear}
                                    options={[2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]}
                                />
                                <ErrorComponent error={startDateError} />
                            </div>
                            <label className={styles.labelDes} style={{ fontWeight: "500", paddingTop:'10px' }}>To</label>
                            {/* <InputMaterialUI title={"End Year"} customWidth="292.5px" /> */}
                            <div>
                                <SelectInput 
                                    value={endDate} 
                                    disabled={startDate.length === 0} 
                                    setValue={setEndDate} 
                                    handleChange={handleEndDateChange} 
                                    width={"292.5px"} 
                                    handleClear={handleEndDateClear}
                                    onClick={() => { 
                                        if (startDate.length === 0) { 
                                            setEndDateError("Please Select Start Year first"); 
                                        }
                                    }}                            
                                    title={"End Year"} 
                                    options={[2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]}
                                />
                                <ErrorComponent error={endDateError}/>
                            </div>
                        </div>
                        <div>
                            <InputMaterialUI 
                                title={"Marks"} 
                                customWidth="624px" 
                                value={marksValue}
                                onChange={changeMarks}
                            />
                            <ErrorComponent error={marksError} />
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',gap:'12px', alignItems:'center',paddingLeft:'10px'}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPrimaryEducation}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: "black",
                                        '&.Mui-checked': {
                                            color: "black",
                                        },
                                        width: '20px',
                                        height: '20px',
                                        paddingRight:'5px'
                                    }}
                                />
                            }
                            label="Make this as my primary Education"
                            labelPlacement="end" 
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    marginLeft: '10px', 
                                }
                            }}
                        />
                    </div>
                    <div className={styles.buttonDiv}>
                        <button
                            className={cx(styles.cancelDes, styles.pointer)}
                            onClick={() => {
                                setShowHideEduPopup(false);
                                setEducation("")
                                setUniversityNameValue("")
                                setCourseNameValue("")
                                setSpecializationValue("")
                                setSelectedValue("")
                                setStartDate("")
                                setEndDate("")
                                setMarksValue("")
                                setIsPrimaryEducation("")
                                try{
                                        localStorage.removeItem("EducationIndex")
                                        localStorage.removeItem("EducationData")
                                }catch{
                                    
                                }
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            style={{
                                color: errorState && '#FF702D',
                                border: errorState && '1px solid #FFEDDE',
                                backgroundColor: errorState && '#FFEDDE',
                                cursor: errorState && 'default',
                            }}
                            className={cx(styles.saveDes, styles.pointer)}
                            onClick={() => {
                                if (!errorState) {
                                  updateEducation();
                                }
                              }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditEducationPopUp;
