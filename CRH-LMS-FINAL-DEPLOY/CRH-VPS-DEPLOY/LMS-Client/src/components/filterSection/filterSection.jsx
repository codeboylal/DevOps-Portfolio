import React, { useState , useEffect } from "react";
import styles from './filterSection.module.css';
import { Checkbox } from "@mui/material";

import cx from "classnames";


function FilterSection({courses, setFilteredCourses }) {
    const [selectedFilters, setSelectedFilters] = useState({
        subjects: [],
        languages: [],
        levels: [],
        durations: [],
        skills: [],
        educators: []
    });

    const handleFilterChange = (category, value) => {
        setSelectedFilters(prevState => {
            const isSelected = prevState[category].includes(value);
            const updatedFilters = {
                ...prevState,
                [category]: isSelected
                    ? prevState[category].filter(item => item !== value)
                    : [...prevState[category], value]
            };
            return updatedFilters;
        });
    };

    useEffect(() => {
        const filterCourses = () => {
            const filtered = courses.filter(course => {
                const subjectMatch = selectedFilters.subjects.length ? selectedFilters.subjects.includes(course.courseSubject) : true;
                const languageMatch = selectedFilters.languages.length ? selectedFilters.languages.includes(course.courseLanguage) : true;
                const levelMatch = selectedFilters.levels.length ? selectedFilters.levels.includes(course.courseDifficulty[1]) : true;
                const durationMatch = selectedFilters.durations.length ? selectedFilters.durations.includes(course.courseDuration) : true;
                const skillsMatch = selectedFilters.skills.length ? selectedFilters.skills.includes(course.courseSkills) : true;
                const educator = selectedFilters.educators.length ? selectedFilters.educators.includes(course.courseEducator) : true;
                return subjectMatch && languageMatch && levelMatch && durationMatch && skillsMatch && educator;
            });

            // Update the filteredCourses state in the parent component
            setFilteredCourses(filtered);
        };

        filterCourses();
    }, [selectedFilters, courses, setFilteredCourses]); 

    // useEffect(() => {
    //     const filterCourses = () => {
    //         const filtered = courses.filter(course => {
    //             const subjectMatch = selectedFilters.subjects.length ? selectedFilters.subjects.includes(course.courseSubject) : true;
    //             const languageMatch = selectedFilters.languages.length ? selectedFilters.languages.includes(course.courseLanguage) : true;
    //             const levelMatch = selectedFilters.levels.length ? selectedFilters.levels.includes(course.courseDifficulty[1]) : true;
    //             const skillsMatch = selectedFilters.skills.length ? selectedFilters.skills.includes(course.courseSkills) : true;
    
                // // Convert courseDuration to a comparable format
                // const duration = course.courseDuration.toLowerCase();
                // console.log("Duration",duration)
                // // console.log("selectfilters.durations",selectedFilters.durations)
                // const durationMatch =
                //     selectedFilters.durations.length 
                //         ? selectedFilters.durations.some(selectedDuration => {
                //             console.log("select duration:",selectedDuration.toLowerCase())
                //             // Check against the various duration categories
                //             if (selectedDuration.toLowerCase() === "less than 2 hrs") {
                //                 return duration.includes("less than 2 hrs");
                //             }
                //             if (selectedDuration === "1-4 weeks") {
                //                 console.log(parseInt(duration))
                //                 return duration.includes("weeks") && (parseInt(duration) >= 1 && parseInt(duration) <= 4);
                //             }
                //             if (selectedDuration === "1-3 months") {
                //                 return duration.includes("months") && (parseInt(duration) >= 1 && parseInt(duration) <= 3);
                //             }
                //             if (selectedDuration === "3-6 months") {
                //                 return duration.includes("months") && (parseInt(duration) >= 3 && parseInt(duration) <= 6);
                //             }
                //             if (selectedDuration === "6-9 months") {
                //                 return duration.includes("months") && (parseInt(duration) >= 6 && parseInt(duration) <= 9);
                //             }
                //             return false; // Default case if no match found
                //         }) 
                //         : true; // If no filters applied, consider it a match
    
    //             return subjectMatch && languageMatch && levelMatch && durationMatch && skillsMatch;
    //         });
    
    //         // Update the filteredCourses state in the parent component
    //         setFilteredCourses(filtered);
    //     };
    
    //     filterCourses();
    // }, [selectedFilters, courses, setFilteredCourses]);
    
    const [numLanguageEnglish, setNumLanguageEnglish] = useState(0);
const [numLanguageHindi, setNumLanguageHindi] = useState(0);
const [numLanguageNepali, setNumLanguageNepali] = useState(0);
const [numBeginner, setNumBeginner] = useState(0);
const [numIntermediate, setNumIntermediate] = useState(0);
const [numAdvanced, setNumAdvanced] = useState(0);
const [numMixed, setNumMixed] = useState(0);
const [numDurationLessThan2Hrs, setNumDurationLessThan2Hrs] = useState(0);
const [numDuration1to4Weeks, setNumDuration1to4Weeks] = useState(0);
const [numDuration1to3Months, setNumDuration1to3Months] = useState(0);
const [numDuration3to6Months, setNumDuration3to6Months] = useState(0);
const [numDuration6to9Months, setNumDuration6to9Months] = useState(0);
const [numMicrosoft, setNumMicrosoft] = useState(0);
const [numCodroidhub, setNumCodroidhub] = useState(0);
const [numGoogle, setNumGoogle] = useState(0);

useEffect(() => {
    let englishCount = 0;
    let hindiCount = 0;
    let nepaliCount = 0;
    let beginnerCount = 0;
    let intermediateCount = 0;
    let advancedCount = 0;
    let mixedCount = 0;
    let durationLessThan2HrsCount = 0;
    let duration1to4WeeksCount = 0;
    let duration1to3MonthsCount = 0;
    let duration3to6MonthsCount = 0;
    let duration6to9MonthsCount = 0;
    let microsoftCount = 0;
    let codroidhubCount = 0;
    let googleCount = 0;

    for (let i of courses) {
        // Count languages
        if (i.courseLanguage === "English") {
            englishCount += 1;
        } else if (i.courseLanguage === "Hindi") {
            hindiCount += 1;
        } else if (i.courseLanguage === "Nepali") {
            nepaliCount += 1;
        }

        // Count levels
        if (i.courseDifficulty[1] === "Beginner") {
            beginnerCount += 1;
        } else if (i.courseDifficulty[1] === "Intermediate") {
            intermediateCount += 1;
        } else if (i.courseDifficulty[1] === "Advanced") {
            advancedCount += 1;
        } else if (i.courseDifficulty[1] === "Mixed") {
            mixedCount += 1;
        }

        // Count organizations
        if (i.courseEducator === "Microsoft") {
            microsoftCount += 1;
        } else if (i.courseEducator === "CodroidHub") {
            codroidhubCount += 1;
        } else if (i.courseEducator === "Google") {
            googleCount += 1;
        }

        // Count durations
        const duration = i.courseDuration; // Assuming courseDuration is in a suitable format
        if (duration === "Less than 2 Hrs") { // Less than 2 hours
            durationLessThan2HrsCount += 1;
        } else if (duration === "1-4 Weeks") { // 1-4 weeks
            duration1to4WeeksCount += 1;
        } else if (duration === "1-3 Months") { // 1-3 months
            duration1to3MonthsCount += 1;
        } else if (duration === "3-6 Months") { // 3-6 months
            duration3to6MonthsCount += 1;
        } else if (duration === "6-9 Months") { // 6-9 months
            duration6to9MonthsCount += 1;
        }
    }

    // Update the state once after the loop
    setNumLanguageEnglish(englishCount);
    setNumLanguageHindi(hindiCount);
    setNumLanguageNepali(nepaliCount);
    setNumBeginner(beginnerCount);
    setNumIntermediate(intermediateCount);
    setNumAdvanced(advancedCount);
    setNumMixed(mixedCount);
    setNumDurationLessThan2Hrs(durationLessThan2HrsCount);
    setNumDuration1to4Weeks(duration1to4WeeksCount);
    setNumDuration1to3Months(duration1to3MonthsCount);
    setNumDuration3to6Months(duration3to6MonthsCount);
    setNumDuration6to9Months(duration6to9MonthsCount);
    setNumMicrosoft(microsoftCount);
    setNumCodroidhub(codroidhubCount);
    setNumGoogle(googleCount);
}, [courses]);

    
    
    


    const handleClearAll = () => {
        setSelectedFilters({
            subjects: [],
            languages: [],
            levels: [],
            durations: [],
            skills: [],
            educators: []
        });
    };

    return (
        <div className={styles.divStyle}>
            {/* Subject Filter */}
            <div className={styles.filterDivSingle}>
                <div className={styles.filterItem}>
                    <label>Subject</label>
                    <label
                        style={{ fontSize: '16px' }}
                        className={styles.pointer}
                        onClick={handleClearAll}
                    >
                        Clear All
                    </label>
                </div>
                <div className={styles.filterItems}>
                    {['Business', 'Information Technology', 'Computer Science', 'Data Science'].map(subject => (
                        <div className={styles.checkboxLabel} key={subject}>
                            <div>
                                <Checkbox
                                    checked={selectedFilters.subjects.includes(subject)}
                                    onChange={() => handleFilterChange('subjects', subject)}
                                    sx={{
                                        color: 'black', '&.Mui-checked': { color: 'black' },
                                        '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                    }}
                                />
                            </div>
                            <label>{subject}</label>
                        </div>
                    ))}
                    <label className={cx(styles.showMoreDes , styles.pointer)}>
                        Show More
                    </label>
                </div>
            </div>

            {/* Language Filter */}
            <div className={styles.filterDivSingle}>
                <div className={styles.filterItem}>
                    <label>Language</label>
                </div>
                <div className={styles.filterItems}>
                    {['English', 'Hindi', 'Nepali'].map((language, index) => (
                        <div className={styles.disFlexSpaceBW} key={language}>
                            <div className={styles.checkboxLabel}>
                                <div>
                                    <Checkbox
                                        checked={selectedFilters.languages.includes(language)}
                                        onChange={() => handleFilterChange('languages', language)}
                                        sx={{
                                            color: 'black', '&.Mui-checked': { color: 'black' },
                                            '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                        }}
                                    />
                                </div>
                                <label>{language}</label>
                            </div>
                            <label className={styles.numberDes}>
                                {index === 0 ? numLanguageEnglish : index === 1 ? numLanguageHindi : numLanguageNepali}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Level Filter */}
             <div className={styles.filterDivSingle}>
                 <div className={styles.filterItem}>
                     <label>Level</label>
                 </div>
                 <div className={styles.filterItems}>
                     {['Beginner', 'Intermediate', 'Advanced', 'Mixed'].map(level => (
                        <div className={styles.disFlexSpaceBW} key={level}>
                            <div className={styles.checkboxLabel}>
                                <div>
                                    <Checkbox
                                        checked={selectedFilters.levels.includes(level)}
                                        onChange={() => handleFilterChange('levels', level)}
                                        sx={{
                                            color: 'black', '&.Mui-checked': { color: 'black' },
                                            '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                        }}
                                    />
                                </div>
                                <label>{level}</label>
                            </div>
                            <label className={styles.numberDes}>
                                {level === 'Beginner' ? numBeginner : level === 'Intermediate' ? numIntermediate : level === 'Advanced' ? numAdvanced : numMixed}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Duration Filter */}
            <div className={styles.filterDivSingle}>
                <div className={styles.filterItem}>
                    <label>Duration</label>
                </div>
                <div className={styles.filterItems}>
                    {['Less than 2 Hrs', '1-4 Weeks', '1-3 Months', '3-6 Months', '6-9 Months'].map(duration => (
                        <div className={styles.disFlexSpaceBW} key={duration}>
                            <div className={styles.checkboxLabel}>
                                <div>
                                    <Checkbox
                                        checked={selectedFilters.durations.includes(duration)}
                                        onChange={() => handleFilterChange('durations', duration)}
                                        sx={{
                                            color: 'black', '&.Mui-checked': { color: 'black' },
                                            '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                        }}
                                    />
                                </div>
                                <label>{duration}</label>
                            </div>
                            <label className={styles.numberDes}>
                                {duration === 'Less than 2 Hrs' ? numDurationLessThan2Hrs : duration === '1-4 Weeks' ? numDuration1to4Weeks : duration === '1-3 Months' ? numDuration1to3Months : duration === '3-6 Months' ? numDuration3to6Months : numDuration6to9Months}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Filter */}
            <div className={styles.filterDivSingle}>
                <div className={styles.filterItem}>
                    <label>Skills</label>
                </div>
                <div className={styles.filterItems}>
                    {['Entrepreneurship', 'Business Analysis', 'Data Management', 'Human Resources'].map(skill => (
                        <div className={styles.checkboxLabel} key={skill}>
                            <div>
                                <Checkbox
                                    checked={selectedFilters.skills.includes(skill)}
                                    onChange={() => handleFilterChange('skills', skill)}
                                    sx={{
                                        color: 'black', '&.Mui-checked': { color: 'black' },
                                        '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                    }}
                                />
                            </div>
                            <label>{skill}</label>
                        </div>
                    ))}
                    <label className={cx(styles.showMoreDes , styles.pointer)}>
                        Show More
                    </label>
                </div>
            </div>

            {/* Educator Filter */}
            <div className={styles.filterDivSingle}>
                <div className={styles.filterItem}>
                    <label>Educator</label>
                </div>
                <div className={styles.filterItems}>
                    {['Microsoft', 'CodroidHub', 'Google'].map(educator => (
                        <div className={styles.disFlexSpaceBW} key={educator}>
                            <div className={styles.checkboxLabel}>
                                <div>
                                    <Checkbox
                                        checked={selectedFilters.educators.includes(educator)}
                                        onChange={() => handleFilterChange('educators', educator)}
                                        sx={{
                                            color: 'black', '&.Mui-checked': { color: 'black' },
                                            '&.MuiCheckbox-root': { padding: '0px', height: '19px', width: '19px' }
                                        }}
                                    />
                                </div>
                                <label>{educator}</label>
                            </div>
                            <label className={styles.numberDes}>
                                {educator === 'Microsoft' ? numMicrosoft : educator === 'CodroidHub' ? numCodroidhub : numGoogle}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterSection;

