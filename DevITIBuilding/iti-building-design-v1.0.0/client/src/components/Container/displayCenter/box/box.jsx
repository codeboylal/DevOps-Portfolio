import React, { useState, useEffect } from "react";

import styles from "./box.module.css";

import DetailsBox from "../detailsBox/detailsBox";
import ImgDiv from "../imgDiv/imgDiv";

import house from "./house.png";
import map from "./map.png";

function Box({project, likedPlans, setProjectsRerender, facade,driveWayFilterValue="Right"}) {
    const [show, setShow] = useState(true);

    const [direct, setDirection] = useState(false)


    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 600px) and (max-width: 1200px)');
        // const directionMediaQuery = window.matchMedia('(min-width: 820px) and (max-width: 990px)');
    
        const handleShowChange = (event) => {
            if (event.matches) {
                setShow(false);
            } else {
                setShow(true);
            }
        };
    
        // const handleDirectionChange = (event) => {
        //     if (event.matches) {
        //         setDirection(true);
        //     } else {
        //         setDirection(false);
        //     }
        // };
    
        mediaQuery.addEventListener('change', handleShowChange);
        // directionMediaQuery.addEventListener('change', handleDirectionChange);
    
        // Initial setup
        if (mediaQuery.matches) {
            setShow(false);
        } else {
            setShow(true);
        }
    
        // if (directionMediaQuery.matches) {
        //     setDirection(true);
        // } else {
        //     setDirection(false);
        // }
    
        return () => {
            mediaQuery.removeEventListener('change', handleShowChange);
            // directionMediaQuery.removeEventListener('change', handleDirectionChange);
        };
    }, []);


    const [newFacades, setNewfacades] = useState([])

    useEffect(() => {
        if (facade?.length > 0) {
            const matchedFacades = [] 
            for (let i of project?.custom_fields?.find(field => field?.name === "Facade")?.value) {
                for (let j of facade) {
                    if (i.id === j.TaskID) {
                        matchedFacades.push(j) 
                    }
                }
            }
            setNewfacades(matchedFacades)
        }
    }, [facade, project])
    
    const [planImages, setPlanImages] = useState([])

    useEffect(() => {
        if (project) {
            // console.log(project)
            // if (Array.isArray(project.attachments)) {
                // setPlanImages((prevImages) => [
                //     ...prevImages, 
                //     ...project.attachments, 
                // ]);
                const filteredAttachments = []
                if(project.attachments){
                    for (let j of project.attachments) {
                        // console.log(j)
                            const title = j.name.toLowerCase();
                            // console.log(title, driveWayFilterValue)
                            if (driveWayFilterValue === "Right" && title.includes("right")) {
                                filteredAttachments.push(j);
                            } 
                            else if (driveWayFilterValue === "Left" && title.includes("left")) {
                                filteredAttachments.push(j);
                            }
                            else  if (driveWayFilterValue === "Not Sure"){
                                filteredAttachments.push(j);
                            }
                    }
                    // console.log(filteredAttachments)
                    setPlanImages(filteredAttachments)
                }
                
            // }
        }
    }, [project, driveWayFilterValue]);

    // useEffect(()=>{
    //     console.log(planImages)
    // },[planImages])

    

    return (
        <div className={styles.boxDiv} style={{flexDirection: direct && 'column'}}>
            <div>
                <DetailsBox project= {project} likedPlans={likedPlans} setProjectsRerender={setProjectsRerender}/>
            </div>
            <ImgDiv newFacades={newFacades} planImages={planImages}  img={map} right={"House"}/>
            <ImgDiv newFacades={newFacades} driveWayFilterValue={driveWayFilterValue} img={house} display={show} left={"Map"}/>
            {/* <div
                className={styles.imgMainDiv}
            >
                <ImgDiv newFacades={newFacades}  img={map} right={"House"}/>
                <ImgDiv newFacades={newFacades} driveWayFilterValue={driveWayFilterValue} img={house} display={show} left={"Map"}/>
            </div> */}
        </div>
    );
}

export default Box;
