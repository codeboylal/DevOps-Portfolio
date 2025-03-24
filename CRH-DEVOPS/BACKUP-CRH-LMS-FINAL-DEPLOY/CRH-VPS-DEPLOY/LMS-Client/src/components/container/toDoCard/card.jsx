import React, { useEffect, useState} from "react";  
import { useNavigate } from "react-router-dom";

import styles from "./card.module.css";
import cx from "classnames";

import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Base_URL from "../../../const/const";


import EditOption from "../../../pages/toDoModule/toDoCard/popUp/EditOption/EditOption.jsx";
import Delete from "../../../pages/toDoModule/toDoCard/popUp/Delete/delete.jsx";
import AddToDoCard from "../../../pages/toDoModule/toDoCard/popUp/Add/AddToDoCard.jsx";




function ToDoCardComponent({setRefreshPage, refreshPage ,cardData, setToDo, id, setCurrentPage, page='', border=''}){

    const navigate = useNavigate();

    const [thumbs, setThumbs] = useState(null)
    const [cheeries, setCheeries] = useState(null)
    const [heart, setHeart] = useState(null)
    const [rainbow, setRainbow] = useState(null)

    useEffect(()=>{
        setThumbs(`${Base_URL}/uploads/assets/todo/thumbs-up.png`)
        setCheeries(`${Base_URL}/uploads/assets/todo/cherry.png`)
        setHeart(`${Base_URL}/uploads/assets/todo/heart.png`)
        setRainbow(`${Base_URL}/uploads/assets/todo/rainbow.png`)
    },[])


    const[truncatedText, setTruncatedText] = useState("")
    const [isTruncated, setIsTruncated] = useState()
    const [showContainer, setContainer] = useState(false)
    const [showDeleteConfirm, setDeleteConfirm] = useState(false)
    const [showAddEdit, setAddEdit] = useState(false)

    useEffect(()=>{
        if(cardData){
            const text = cardData?.title;
            setIsTruncated(text?.length > 10)
            setTruncatedText(isTruncated ? `${text?.slice(0, 10)}...` : text)
        }
    },[cardData, isTruncated])

    const cardClick = () =>{
        localStorage.setItem("ToDoId",id); 
        setRefreshPage(!refreshPage); 
        if(page === ''){
            navigate("/toDoList");
        }
    }

    return(
        <div 
            className={cx(styles.cardDiv,styles.pointer)} 
            style={{backgroundColor: cardData?.background,
                borderColor: cardData?.id === border && '#FF702D'
            }}
            onClick={cardClick}>
            <div className={styles.topDiv}>
                <div className={styles.topDiv1}>
                    <div style={{width:'32px',height:'32px'}}>
                        <img style={{display: cardData?.emoji !== 'thumbs-up' && 'none', width:'100%', height:'100%'}} src={thumbs} alt="thumbs-up" />
                        <img style={{display: cardData?.emoji !== 'cherry' && 'none', width:'100%', height:'100%'}} src={cheeries} alt="cherry" />
                        <img style={{display: cardData?.emoji !== 'rainbow' && 'none', width:'100%', height:'100%'}} src={rainbow} alt="rainbow" />
                        <img style={{display: cardData?.emoji !== 'heart' && 'none', width:'100%', height:'100%'}} src={heart} alt="heart" />
                    </div>
                    <div>
                        {isTruncated ? (
                            <Tooltip
                            title={cardData?.title}
                            arrow
                            placement="top"
                            PopperProps={{
                                modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                    offset: [0, -5],
                                    },
                                },
                                ],
                            }}
                            >
                            <label className={cx(styles.pointer, styles.topLabelDes)}>
                                {truncatedText}
                            </label>
                            </Tooltip>
                        ) : (
                            <label className={cx(styles.pointer, styles.topLabelDes)}>
                            {truncatedText}
                            </label>
                        )}
                    </div>
                </div>
                <div style={{display: page==='ToDoList' && 'none'}} className={cx(styles.pointer, styles.moreOptions)} onClick={(event)=>{event.stopPropagation(); setContainer(!showContainer); }}>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div style={{display: !showContainer && 'none'}} className={styles.editContainer} onClick={(event)=>{event.stopPropagation(); }}>
                    <EditOption
                        id={id}
                        setContainer={setContainer}
                        setDeleteConfirm={setDeleteConfirm}
                        setAddEdit={setAddEdit}
                    />
                </div>
            </div>
            <div>
                <label className={cx(styles.cardDes,styles.pointer)}>
                    {cardData?.description}
                </label>
            </div>
            <div className={styles.taskDate}>
                <label className={cx(styles.pointer,styles.taskDes)}>
                    {cardData?.tasks?.completed}/{cardData?.tasks?.total}
                </label>
                <label className={cx(styles.pointer,styles.dateDes)}>
                    {cardData?.date}
                </label>
            </div>
            <div style={{display : !showDeleteConfirm && 'none'}} onClick={(event)=>{event.stopPropagation()}}>
                <Delete 
                    id={id}
                    setCurrentPage={setCurrentPage}
                    setToDo={setToDo}
                    setDeleteConfirm={setDeleteConfirm}
                    showDeleteConfirm={showDeleteConfirm}
                />
            </div>
            <div style={{display : !showAddEdit && 'none'}} onClick={(event)=>{event.stopPropagation()}}>
                <AddToDoCard 
                    id={id}
                    cardData={cardData}
                    para={"Edit"}
                    setCurrentPage={setCurrentPage}
                    setToDo={setToDo}
                    setAddEdit={setAddEdit}
                    showAddEdit={showAddEdit}
                />
            </div>
        </div>
    )
}

export default ToDoCardComponent;