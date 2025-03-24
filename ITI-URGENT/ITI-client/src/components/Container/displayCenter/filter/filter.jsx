// import React, { useState, useEffect } from "react";

// import styles from "./filter.module.css";
// import cx from "classnames";
// import RangeSlider from "../../../slider/slider";
// import DropdownInput from "../../../dropDownInput/dropDownInput";
// import RadioButtonGroup from "../../../radioInput/radioInput";
// import ScrollBar from "../../../scrollBar/scrollBar";

// function Filter({setFilters, buttonDis, setButtonDis, filters,active,landWithOptions, landDepthOptions}){


//     // const[sliderValue, setSliderValue] = useState(filters.sliderValue || [0,0])
//     // const handleSliderChange = (event, newValue) => {
//     //     setSliderValue(newValue);
//     //     setFilters(prevFilters => ({
//     //         ...prevFilters,   
//     //         sliderValue: newValue 
//     //     }));
//     //     setButtonDis(false)
//     //   };

//     const [sliderValue, setSliderValue] = useState(filters.sliderValue || [0, 0]);

//     const [sliderError, setSliderError] = useState(false)

//     const handleSliderChange = (event, newValue) => {
//         setSliderValue(newValue);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             sliderValue: newValue 
//         }));
//         setButtonDis(false);
//     };

//     const handleInputChange = (index, value) => {
//         let newValue = [...sliderValue];
//         value = Number(value);
    
//         if (index === 0) {
//             // Ensure the min value is between 0 and max (or 500 if max is 0)
//             // newValue[0] = Math.min(Math.max(value, 0), newValue[1] || 500);
//             newValue[0] = value
//             if(value < 501){
//                 newValue[0] = value
//             }else{
//                 newValue[0] = 500
//             }
//         } else {
//             // Ensure the max value is between min and 500
//             // newValue[1] = Math.min(Math.max(value, newValue[0]), 499) + 1;
//             if(value < 501){
//                 newValue[1] = value
//             }else{
//                 newValue[1] = 500
//             } 
//         }
//         // console.log("Slider Value",newValue[0], newValue[1])
//         if(newValue[0] > newValue[1])
//         {
//             setSliderError(true)
//         }else{
//             setSliderError(false)
//         } 
    
//         setSliderValue(newValue);
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             sliderValue: newValue
//         }));
//         setButtonDis(false);
//     };

//     const [landWidthValue, setLandWidthValue] = useState(filters.landWidthValue || "");
//     const handleLandWidthChange = (event) => {
//         setLandWidthValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             landWidthValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };

//     const [landDepthValue, setLandDepthValue] = useState(filters.landDepthValue ||  "");
//     const handleLandDepthChange = (event) => {
//         setLandDepthValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             landDepthValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };

//     const [bedroomActive, setBedroomActive] = useState(filters.bedroomActive || 0)
//     const handleBedRoomChange = (num) => {
//         setBedroomActive(num);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             bedroomActive: num 
//         }));
//         setButtonDis(false)
//     };

//     const [livingValue, setLivingValue] = useState(filters.livingValue || "");
//     const handleLivingChange = (event) => {
//         setLivingValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             livingValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };

//     const [storeysValue, setStoreysValue] = useState(filters.storeysValue || "");
//     const handleStoreysChange = (event) => {
//         setStoreysValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             storeysValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };

//     const [garageValue, setGarageValue] = useState(filters.garageValue || "");
//     const handleGarageChange = (event) => {
//         setGarageValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             garageValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };

//     const [driveWayValue, setDriveWayValue] = useState(filters.driveWayValue || "Right");
//     const handleDriveWayChange = (event) => {
//         setDriveWayValue(event.target.value);
//         setFilters(prevFilters => ({
//             ...prevFilters,   
//             driveWayValue: event.target.value 
//         }));
//         setButtonDis(false)
//     };


//     const handleReset = () =>{
//         setSliderValue([0,0])
//         setLandWidthValue("")
//         setLandDepthValue("")
//         setLivingValue("")
//         setStoreysValue("")
//         setGarageValue("")
//         setDriveWayValue("Right")
//         setSliderError(false)
//         setBedroomActive(0)
//         setFilters({
//             sliderValue:[0,0],
//             landWidthValue: '',
//             landDepthValue: '',
//             livingValue: '',
//             storeysValue: '',
//             garageValue: '',
//             driveWayValue: 'Right',
//             bedroomActive: ''
//         })
//         setButtonDis(true)
//     }


//     useEffect(() => {
//         if(active === "displayCenter"){
//             const mediaQueryButton = window.matchMedia('(max-width: 1440px)');
    

    
//             const handleButtonMediaQueryChange = (event) => {
//                 handleReset()
//             };
        
//             mediaQueryButton.addEventListener('change', handleButtonMediaQueryChange);
        
    
//             handleReset()
        
//             return () => {
//                 // Clean up event listeners
//                 mediaQueryButton.removeEventListener('change', handleButtonMediaQueryChange);
//             };
//         }
//     }, [active]);



//     return(
//         <div className={styles.filterSection}>
//             <div className={styles.topDiv}>
//                 <label>
//                     Filters
//                 </label>
//                 <button 
//                     className={cx(styles.buttonDiv, styles.pointer)} 
//                     onClick={handleReset}
//                     style={{
//                         backgroundColor: !buttonDis && 'black',
//                         color: !buttonDis && 'white'
//                     }}
//                 >
//                     Reset
//                 </button>
//             </div>
//             <ScrollBar>
//                 <div className={styles.bottomDiv}>
//                     <div className={styles.bottomDivItems}>
//                         <span>
//                             House Sizes (Sq)
//                         </span>
//                         <div
//                             style={{
//                                 display:'flex',
//                                 flexDirection: 'column',
//                                 gap: '16px'
//                             }}
//                         >
//                             {/* <div className={styles.bottomDivItems__item}>
//                                 <div className={styles.bottomDivItems__item__child}>
//                                     <label className={styles.color}>
//                                         Min
//                                     </label>
//                                     <label>
//                                         {sliderValue[0]}sq
//                                     </label>
//                                 </div>
//                                 <div className={styles.bottomDivItems__item__child}>
//                                     <label className={styles.color}>
//                                         Max
//                                     </label>
//                                     <label>
//                                         {sliderValue[1]}sq
//                                     </label>
//                                 </div>
//                             </div>
//                             <div>
//                                 <RangeSlider 
//                                     value={sliderValue}
//                                     onChange={handleSliderChange}
//                                 />
//                             </div> */}
//                             <div className={styles.bottomDivItems__item}>
//                                 <div className={styles.bottomDivItems__item__child}>
//                                     <label className={styles.color}>
//                                         Min
//                                     </label>
//                                     <div>
//                                         <input 
//                                             type="number" 
//                                             value={sliderValue[0] === 0 ? '' : sliderValue[0]} 
//                                             onChange={(e) => handleInputChange(0, e.target.value)} 
//                                             placeholder="0"
//                                             className={styles.noArrows}
//                                         />
//                                         <span>
//                                             sq
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className={styles.bottomDivItems__item__child}>
//                                     <label className={styles.color}>
//                                         Max
//                                     </label>
//                                     <div>
//                                         <input 
//                                             type="number" 
//                                             value={sliderValue[1] === 0 ? '' : sliderValue[1]} 
//                                             onChange={(e) => handleInputChange(1, e.target.value)} 
//                                             placeholder="0"
//                                             className={styles.noArrows}
//                                         />
//                                         <span>
//                                             sq
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div
//                                 style={{
//                                     display: !sliderError && 'none'
//                                 }}
//                             >
//                                 <span style={{
//                                     color:'red',
//                                     fontWeight: '400',
//                                     fontSize: '.875rem',
//                                 }}>
//                                     Pleas Check the Min and Max House Sizes Sq
//                                 </span>
//                             </div>
//                             <div>
//                                 <RangeSlider 
//                                     value={sliderValue}
//                                     onChange={handleSliderChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.bottomDivItems}>
//                         <label>
//                             Land Width
//                         </label>
//                         <DropdownInput 
//                             options={landWithOptions}
//                             value={landWidthValue}
//                             onChange={handleLandWidthChange}
//                             placeholder={"Select"}
//                         />
//                     </div>
//                     <div className={styles.bottomDivItems}>
//                         <label>
//                             Land Depth
//                         </label>
//                         <DropdownInput 
//                             options={landDepthOptions}
//                             value={landDepthValue}
//                             onChange={handleLandDepthChange}
//                             placeholder={"Select"}
//                         />
//                     </div>
//                     <div className={styles.bottomDivItems}>
//                         <label>
//                             No of Bedrooms
//                         </label>
//                         <div className={styles.bottomDivItems__child}>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(1); handleBedRoomChange(1)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 1 && 'black',
//                                     color: bedroomActive === 1 && 'white'
//                                 }}
//                             >
//                                 1
//                             </div>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(2); handleBedRoomChange(2)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 2 && 'black',
//                                     color: bedroomActive === 2 && 'white'
//                                 }}
//                             >
//                                 2
//                             </div>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(3); handleBedRoomChange(3)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 3 && 'black',
//                                     color: bedroomActive === 3 && 'white'
//                                 }}
//                             >
//                                 3
//                             </div>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(4); handleBedRoomChange(4)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 4 && 'black',
//                                     color: bedroomActive === 4 && 'white'
//                                 }}
//                             >
//                                 4
//                             </div>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(5); handleBedRoomChange(5)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 5 && 'black',
//                                     color: bedroomActive === 5 && 'white'
//                                 }}
//                             >
//                                 5
//                             </div>
//                             <div 
//                                 className={styles.child__Child}
//                                 onClick={()=>{setBedroomActive(6); handleBedRoomChange(6)}}
//                                 style={{
//                                     backgroundColor: bedroomActive === 6 && 'black',
//                                     color: bedroomActive === 6 && 'white'
//                                 }}
//                             >
//                                 6+
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.bottomDivItems} style={{gap:'26px'}}>
//                         <div className={styles.bottomDivItems__child2}>
//                             <label>
//                                 No of Living
//                             </label>
//                             <RadioButtonGroup
//                                 options={[
//                                     {
//                                         value: "1",
//                                         label: "1"
//                                     },
//                                     {
//                                         value: "2",
//                                         label: "2"
//                                     },
//                                     {
//                                         value: "3",
//                                         label: "3"
//                                     }
//                                 ]}
//                                 value={livingValue}
//                                 onChange={handleLivingChange}
//                                 row={true}
//                             />
//                         </div>
//                         <div  className={styles.bottomDivItems__child2}>
//                             <label>
//                                 Storeys
//                             </label>
//                             <RadioButtonGroup
//                                 options={[
//                                     {
//                                         value: 0,
//                                         label: "Single"
//                                     },
//                                     {
//                                         value: 1,
//                                         label: "Double"
//                                     }
//                                 ]}
//                                 value={storeysValue}
//                                 onChange={handleStoreysChange}
//                                 row={true}
//                             />
//                         </div>
//                         <div  className={styles.bottomDivItems__child2}>
//                             <label>
//                                 Garage
//                             </label>
//                             <RadioButtonGroup
//                                 options={[
//                                     {
//                                         value: 0,
//                                         label: "Single"
//                                     },
//                                     {
//                                         value: 1,
//                                         label: "Double"
//                                     }
//                                 ]}
//                                 value={garageValue}
//                                 onChange={handleGarageChange}
//                                 row={true}
//                             />
//                         </div>
//                         <div className={styles.bottomDivItems__child2}>
//                             <label>
//                                 Driveway
//                             </label>
//                             <RadioButtonGroup
//                                 options={[
//                                     {
//                                         value: "Left",
//                                         label: "Left"
//                                     },
//                                     {
//                                         value: "Right",
//                                         label: "Right"
//                                     },
//                                     {
//                                         value: "Not Sure",
//                                         label: "Not Sure"
//                                     }
//                                 ]}
//                                 value={driveWayValue}
//                                 onChange={handleDriveWayChange}
//                                 row={true}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </ScrollBar>
//         </div>
//     )
// }

// export default Filter;





























import React, { useState, useEffect } from "react";

import styles from "./filter.module.css";
import cx from "classnames";
import RangeSlider from "../../../slider/slider";
import DropdownInput from "../../../dropDownInput/dropDownInput";
import RadioButtonGroup from "../../../radioInput/radioInput";
import ScrollBar from "../../../scrollBar/scrollBar";

function Filter({setFilters, buttonDis, setButtonDis, filters,active,landWithOptions, landDepthOptions}){


    // const[sliderValue, setSliderValue] = useState(filters.sliderValue || [0,0])
    // const handleSliderChange = (event, newValue) => {
    //     setSliderValue(newValue);
    //     setFilters(prevFilters => ({
    //         ...prevFilters,   
    //         sliderValue: newValue 
    //     }));
    //     setButtonDis(false)
    //   };

    const [sliderValue, setSliderValue] = useState(filters.sliderValue || [0, 0]);

    const [sliderError, setSliderError] = useState(false)

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        setFilters(prevFilters => ({
            ...prevFilters,   
            sliderValue: newValue 
        }));
        setButtonDis(false);
    };

    const handleInputChange = (index, value) => {
        let newValue = [...sliderValue];
        value = Number(value);
    
        if (index === 0) {
            // Ensure the min value is between 0 and max (or 500 if max is 0)
            // newValue[0] = Math.min(Math.max(value, 0), newValue[1] || 500);
            newValue[0] = value
            if(value < 501){
                newValue[0] = value
            }else{
                newValue[0] = 500
            }
        } else {
            // Ensure the max value is between min and 500
            // newValue[1] = Math.min(Math.max(value, newValue[0]), 499) + 1;
            if(value < 501){
                newValue[1] = value
            }else{
                newValue[1] = 500
            } 
        }
        // console.log("Slider Value",newValue[0], newValue[1])
        if(newValue[0] > newValue[1])
        {
            setSliderError(true)
        }else{
            setSliderError(false)
        } 
    
        setSliderValue(newValue);
        setFilters(prevFilters => ({
            ...prevFilters,
            sliderValue: newValue
        }));
        setButtonDis(false);
    };

    const [landWidthValue, setLandWidthValue] = useState(filters.landWidthValue || "");
    const handleLandWidthChange = (event) => {
        setLandWidthValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            landWidthValue: event.target.value 
        }));
        setButtonDis(false)
    };

    const [landDepthValue, setLandDepthValue] = useState(filters.landDepthValue ||  "");
    const handleLandDepthChange = (event) => {
        setLandDepthValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            landDepthValue: event.target.value 
        }));
        setButtonDis(false)
    };

    const [bedroomActive, setBedroomActive] = useState(filters.bedroomActive || 0)
    const handleBedRoomChange = (num) => {
        setBedroomActive(num);
        setFilters(prevFilters => ({
            ...prevFilters,   
            bedroomActive: num 
        }));
        setButtonDis(false)
    };

    const [livingValue, setLivingValue] = useState(filters.livingValue || "");
    const handleLivingChange = (event) => {
        setLivingValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            livingValue: event.target.value 
        }));
        setButtonDis(false)
    };

    const [storeysValue, setStoreysValue] = useState(filters.storeysValue || "");
    const handleStoreysChange = (event) => {
        setStoreysValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            storeysValue: event.target.value 
        }));
        setButtonDis(false)
    };

    const [garageValue, setGarageValue] = useState(filters.garageValue || "");
    const handleGarageChange = (event) => {
        setGarageValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            garageValue: event.target.value 
        }));
        setButtonDis(false)
    };

    const [driveWayValue, setDriveWayValue] = useState(filters.driveWayValue || "Right");
    const handleDriveWayChange = (event) => {
        setDriveWayValue(event.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,   
            driveWayValue: event.target.value 
        }));
        setButtonDis(false)
    };


    const handleReset = () =>{
        setSliderValue([0,0])
        setLandWidthValue("")
        setLandDepthValue("")
        setLivingValue("")
        setStoreysValue("")
        setGarageValue("")
        setDriveWayValue("Right")
        setSliderError(false)
        setBedroomActive(0)
        setFilters({
            sliderValue:[0,0],
            landWidthValue: '',
            landDepthValue: '',
            livingValue: '',
            storeysValue: '',
            garageValue: '',
            driveWayValue: 'Right',
            bedroomActive: ''
        })
        setButtonDis(true)
    }

 
        // const [sliderValue, setSliderValue] = useState([0, 0]); // State for Min and Max values
        const [isEditable, setIsEditable] = useState({ min: false, max: false }); // State to track editable inputs
      
        // const handleInputChanges = (index, value) => {
        //   const newSliderValue = [...sliderValue];
        //   newSliderValue[index] = value;
        //   setSliderValue(newSliderValue);
        // };
      
        const handleLabelClick = (label) => {
          setIsEditable((prevState) => ({ ...prevState, [label]: true })); // Enable editing for the clicked label
        };
      
        const handleBlur = (label) => {
          setIsEditable((prevState) => ({ ...prevState, [label]: false })); // Disable editing when input loses focus
        };

    useEffect(() => {
        if(active === "displayCenter"){
            const mediaQueryButton = window.matchMedia('(max-width: 1440px)');
    

    
            const handleButtonMediaQueryChange = (event) => {
                handleReset()
            };
        
            mediaQueryButton.addEventListener('change', handleButtonMediaQueryChange);
        
    
            handleReset()
        
            return () => {
                // Clean up event listeners
                mediaQueryButton.removeEventListener('change', handleButtonMediaQueryChange);
            };
        }
    }, [active]);



    return(
        <div className={styles.filterSection}>
            <div className={styles.topDiv}>
                <label>
                    Filters
                </label>
                <button 
                    className={cx(styles.buttonDiv, styles.pointer)} 
                    onClick={handleReset}
                    style={{
                        backgroundColor: !buttonDis && 'black',
                        color: !buttonDis && 'white'
                    }}
                >
                    Reset
                </button>
            </div>
            <ScrollBar>
                <div className={styles.bottomDiv}>
                    <div className={styles.bottomDivItems}>
                        <span>
                            House Sizes (Sq)
                        </span>
                        <div
                            style={{
                                display:'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}
                        >
                            {/* <div className={styles.bottomDivItems__item}>
                                <div className={styles.bottomDivItems__item__child}>
                                    <label className={styles.color}>
                                        Min
                                    </label>
                                    <label>
                                        {sliderValue[0]}sq
                                    </label>
                                </div>
                                <div className={styles.bottomDivItems__item__child}>
                                    <label className={styles.color}>
                                        Max
                                    </label>
                                    <label>
                                        {sliderValue[1]}sq
                                    </label>
                                </div>
                            </div>
                            <div>
                                <RangeSlider 
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                />
                            </div> */}
                            <div className={styles.bottomDivItems__item}>
                            <div
        className={styles.bottomDivItems__item__child}
        id="min"
        onClick={() => handleLabelClick('min')} // Enable editing for Min
      >
        <label className={styles.color}>Min</label>
        <div>
          {isEditable.min ? (
            <input
              type="number"
              value={sliderValue[0] || ''}
              onChange={(e) => handleInputChange(0, e.target.value)}
              placeholder="0"
              className={styles.noArrows}
              onBlur={() => handleBlur('min')} // Disable editing when input loses focus
              autoFocus // Automatically focus the input
            />
          ) : (
            <span>{sliderValue[0] === 0 ? '0' : sliderValue[0]} sq</span> // Display value when not editable
          )}
        </div>
      </div>

      {/* Max Section */}
      <div
        className={styles.bottomDivItems__item__child}
        id="max"
        onClick={() => handleLabelClick('max')} // Enable editing for Max
      >
        <label className={styles.color}>Max</label>
        <div>
          {isEditable.max ? (
            <input
              type="number"
              value={sliderValue[1] || ''}
              onChange={(e) => handleInputChange(1, e.target.value)}
              placeholder="0"
              className={styles.noArrows}
              onBlur={() => handleBlur('max')} // Disable editing when input loses focus
              autoFocus // Automatically focus the input
            />
          ) : (
            <span>{sliderValue[1] === 0 ? '0' : sliderValue[1]} sq</span> // Display value when not editable
          )}
        </div>
      </div>
                            </div>
                            <div
                                style={{
                                    display: !sliderError && 'none'
                                }}
                            >
                                <span style={{
                                    color:'red',
                                    fontWeight: '400',
                                    fontSize: '.875rem',
                                }}>
                                    Pleas Check the Min and Max House Sizes Sq
                                </span>
                            </div>
                            <div>
                                <RangeSlider 
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomDivItems}>
                        <label>
                            Land Width
                        </label>
                        <DropdownInput 
                            options={landWithOptions}
                            value={landWidthValue}
                            onChange={handleLandWidthChange}
                            placeholder={"Select"}
                        />
                    </div>
                    <div className={styles.bottomDivItems}>
                        <label>
                            Land Depth
                        </label>
                        <DropdownInput 
                            options={landDepthOptions}
                            value={landDepthValue}
                            onChange={handleLandDepthChange}
                            placeholder={"Select"}
                        />
                    </div>
                    <div className={styles.bottomDivItems}>
                        <label>
                            No of Bedrooms
                        </label>
                        <div className={styles.bottomDivItems__child}>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(1); handleBedRoomChange(1)}}
                                style={{
                                    backgroundColor: bedroomActive === 1 && 'black',
                                    color: bedroomActive === 1 && 'white'
                                }}
                            >
                                1
                            </div>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(2); handleBedRoomChange(2)}}
                                style={{
                                    backgroundColor: bedroomActive === 2 && 'black',
                                    color: bedroomActive === 2 && 'white'
                                }}
                            >
                                2
                            </div>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(3); handleBedRoomChange(3)}}
                                style={{
                                    backgroundColor: bedroomActive === 3 && 'black',
                                    color: bedroomActive === 3 && 'white'
                                }}
                            >
                                3
                            </div>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(4); handleBedRoomChange(4)}}
                                style={{
                                    backgroundColor: bedroomActive === 4 && 'black',
                                    color: bedroomActive === 4 && 'white'
                                }}
                            >
                                4
                            </div>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(5); handleBedRoomChange(5)}}
                                style={{
                                    backgroundColor: bedroomActive === 5 && 'black',
                                    color: bedroomActive === 5 && 'white'
                                }}
                            >
                                5
                            </div>
                            <div 
                                className={styles.child__Child}
                                onClick={()=>{setBedroomActive(6); handleBedRoomChange(6)}}
                                style={{
                                    backgroundColor: bedroomActive === 6 && 'black',
                                    color: bedroomActive === 6 && 'white'
                                }}
                            >
                                6+
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomDivItems} style={{gap:'26px'}}>
                        <div className={styles.bottomDivItems__child2}>
                            <label>
                                No of Living
                            </label>
                            <RadioButtonGroup
                                options={[
                                    {
                                        value: "1",
                                        label: "1"
                                    },
                                    {
                                        value: "2",
                                        label: "2"
                                    },
                                    {
                                        value: "3",
                                        label: "3"
                                    }
                                ]}
                                value={livingValue}
                                onChange={handleLivingChange}
                                row={true}
                            />
                        </div>
                        <div  className={styles.bottomDivItems__child2}>
                            <label>
                                Storeys
                            </label>
                            <RadioButtonGroup
                                options={[
                                    {
                                        value: 0,
                                        label: "Single"
                                    },
                                    {
                                        value: 1,
                                        label: "Double"
                                    }
                                ]}
                                value={storeysValue}
                                onChange={handleStoreysChange}
                                row={true}
                            />
                        </div>
                        <div  className={styles.bottomDivItems__child2}>
                            <label>
                                Garage
                            </label>
                            <RadioButtonGroup
                                options={[
                                    {
                                        value: 1,
                                        label: "Single"
                                    },
                                    {
                                        value: 2,
                                        label: "Double"
                                    }
                                ]}
                                value={garageValue}
                                onChange={handleGarageChange}
                                row={true}
                            />
                        </div>
                        <div className={styles.bottomDivItems__child2}>
                            <label>
                                Driveway
                            </label>
                            <RadioButtonGroup
                                options={[
                                    {
                                        value: "Left",
                                        label: "Left"
                                    },
                                    {
                                        value: "Right",
                                        label: "Right"
                                    },
                                    {
                                        value: "Not Sure",
                                        label: "Not Sure"
                                    }
                                ]}
                                value={driveWayValue}
                                onChange={handleDriveWayChange}
                                row={true}
                            />
                        </div>
                    </div>
                </div>
            </ScrollBar>
        </div>
    )
}

export default Filter;