import React, { use, useEffect, useState } from "react";
import imgMAP from "../box/map.png"
import styles from "./imgDiv.module.css";
import ImgPopUp from "../../imgPopUp/imgPopUp";

function ImgDiv({ img, display = true, newFacades,right = '', left = '', driveWayFilterValue='Right' ,planImages}) {
    const [imgPopUp, setImgPopUp] = useState(false);
    const [imag, setImg] = useState();



    const [planPopUp,setPlanPopUp] = useState(false)
    const [facadePopUp,setFacadePopUp] = useState(false)

    useEffect(() => {
        setImgPopUp(false);
    }, [display]);

    const handleOnClick = () => {
        setImgPopUp(true);
        setImg(left === "" ? imag : attachments[0]?.url);
        if(right===""){
            setPlanPopUp(false)
            setFacadePopUp(true)
        }else{
            setPlanPopUp(true)
            setFacadePopUp(false)
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault(); 
    };

    const [mapImg, setMapImg] = useState(
        // 'http://localhost:7000/src/components/container/displayCenter/box/house.png'
        imgMAP 
      );
      
    const [attachments, setAttachments] = useState([]);

   

    useEffect(() => {
        if (newFacades?.length > 0) {
            const filteredAttachments = [];

            for (let i of newFacades) {
                for (let j of i.attachments) {
                    const title = j.title.toLowerCase();

                    if (driveWayFilterValue === "Right" && title.includes("right")) {
                        filteredAttachments.push(j);
                    } 
                    else if (driveWayFilterValue === "Left" && title.includes("left")) {
                        filteredAttachments.push(j);
                    }
                    else if (driveWayFilterValue === "Not Sure" || driveWayFilterValue === "") {
                        filteredAttachments.push(j);
                    }
                }
            }

            setAttachments(filteredAttachments);
        }
    }, [newFacades, driveWayFilterValue]);
    
    const [filterPlans, setFilteredPlans] = useState([])

    useEffect(() => {
        if (planImages?.length > 0) {
          
            setFilteredPlans(planImages);
        }
        // console.log("dsd")
    }, [planImages]);
    
    

    // useEffect(()=>{
    //     console.log(attachments)
    // },[attachments])
    // console.log(planImages?.[0]?.base64)

    return (
        <div
            className={styles.div}
            // style={{ display: !display && 'none', cursor: 'pointer' }}
            style={{ cursor: 'pointer' }}
            onClick={handleOnClick}
        >
            <img
                src={left === "" ? imag : attachments[0]?.thumbnail_large}
                alt="ITI Building Project"
                className={styles.imgDes}
                onContextMenu={handleContextMenu} 
                draggable={false}
                style={{
                    display: left === "" && 'none'
                }}
            />

            <img
                src={
                    right === "" 
                        ? mapImg 
                        : `${filterPlans?.[0]?.base64}`
                }
                alt="ITI Building Project"
                className={styles.imgDes}
                onContextMenu={handleContextMenu}
                draggable={false}
                style={{
                    display: right === "" ? 'none' : 'block',
                }}
            />


        
    
       
            {imgPopUp && (
                <ImgPopUp
                    imag={imag}
                    setImgPopUp={setImgPopUp}
                    right={right}
                    left={left}
                    setImg={setImg}
                    planPopUp={planPopUp}
                    facadePopUp={facadePopUp}
                    attachments={attachments}
                    planImages={filterPlans}
                />
            )}
        </div>
    );
}

export default ImgDiv;