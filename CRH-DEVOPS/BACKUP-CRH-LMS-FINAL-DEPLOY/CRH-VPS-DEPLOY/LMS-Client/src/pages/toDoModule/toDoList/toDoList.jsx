import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../../Toaster";

import cx from "classnames";
import styles from "./toDoList.module.css";

import LoadingSpinner from "../../../Common Components/Loader/Loader";
import SidebarDashboard from "../../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../../Common Components/Header Dashboard Page/headerDashboardPage";

import { GetUserToDoDetails } from "../../../services/Tasks/getTasks";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder'

import Base_URL from "../../../const/const";
import Delete from "../toDoCard/popUp/Delete/delete";
import AddToDoCard from "../toDoCard/popUp/Add/AddToDoCard";
import ToDoCardComponent from "../../../components/container/toDoCard/card";
import AddPopUp from "./AddPopUp/AddPopUp";
import { updateToDoList } from "../../../services/Tasks/updateTasks";
import DeleteToDoPopUp from "./DeletePopUp/DeletePopUp";


function ToDoList(){
    const navigate = useNavigate()
    const setToast = useToaster()

    const [isLoading, setIsLoading] = useState(false)

    const [userId, setUserId] = useState('')
    const [id, setId] = useState('')

    const [staticToDo, setStaticToDo] = useState({})
    const [allToDo, setAllToDo] = useState([])

    const [showDeleteConfirm, setDeleteConfirm] = useState(false)
    const [showAddEdit, setAddEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshPage, setRefreshPage] = useState(false)
    const [activeToDo, setActiveToDo] = useState([])
    const [nonStaticToDo, setNonStaticToDo] = useState([])

    const [deletePopUp, setDeletePopup] = useState(false)
    const [addPopUp, setAppPopUp] = useState(false)
    const [editPopUp, setEditPopUp] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const [itemId, setItemId] = useState('')
    const [refresh, setRefresh] = useState(0)

    useEffect(()=>{
        if(addPopUp || editPopUp){
            document.body.style.overflowY = "hidden"
        }else{
            document.body.style.overflowY = "scroll"
        }
    },[addPopUp, editPopUp])

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
        setId(parseInt(localStorage.getItem("ToDoId"), 10))
        // localStorage.removeItem("ToDoId")
    },[refreshPage])

    useEffect(()=>{
        if(userId && id && !showAddEdit ){
            setIsLoading(true)
            GetUserToDoDetails(userId).then(response=>{
                // console.log(response?.data?.data?.[0], id)
                setAllToDo(response?.data?.data?.[0]?.toDo)
                setIsLoading(false)
             
                // setStaticToDo(response?.data?.data?.[0]?.toDo?.[id])
            }).catch(err=>{
                console.log(err)
            })
        }
    },[userId, id, showAddEdit])

    useEffect(() => {
        if (allToDo && allToDo?.length > 0 && id) {
            // console.log(allToDo)
            const matchingToDo = allToDo.find(todo => todo.id === id);
            const updatedList = matchingToDo.list.sort((a, b) => {
                // Compare based on the 'fav' property
                if (a.fav === b.fav) return 0; // If both are either true or false, maintain their order
                return a.fav ? -1 : 1; // Fav items come first
            });
            
            // Update the matchingToDo object
            matchingToDo.list = updatedList;

            // console.log(matchingToDo);
            setActiveToDo(matchingToDo)
            

            const nonMatchingToDo = allToDo.filter(todo => todo.id !== id);

            // function shuffle(array) {
            //     for (let i = array.length - 1; i > 0; i--) {
            //       const j = Math.floor(Math.random() * (i + 1));
            //       [array[i], array[j]] = [array[j], array[i]];
            //     }
            //     return array;
            //   }
              
              // Apply the shuffle
            //   const randomizedToDo = shuffle(nonMatchingToDo);

            // console.log(nonMatchingToDo)
            
            if(refresh === 0){
                setStaticToDo(matchingToDo);
                // setNonStaticToDo(randomizedToDo)
                setNonStaticToDo(nonMatchingToDo)
                
                setRefresh(1)
            }

        }
    }, [allToDo, id, refresh]);





    const handleCheckboxChange = async(index, listId) => {
        const updatedList = activeToDo.list.map((item, i) => {
            if (i === index) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        // console.log(listId)
        await updateToDoList({
            userId,
            taskId: id,
            itemId: listId,
            title: "",
            para: "completed"
        }).then(response =>{
            console.log(response?.data?.data)
            setActiveToDo(response?.data?.data)
            window.location.href=`/toDoList`
            // setToast("To-Do Task Added Successfully","success")
        }).catch(err=>{
            console.log(err)
            setAppPopUp(false)
            setToast("To-Do Updation Failed","error")
            setRefreshPage(0)
        })
        setActiveToDo((prevState) => ({
            ...prevState,
            list: updatedList,
        }));
    };
    
    const handleFavToggle = (index, listId) => {
        // Update the state for the activeToDo list
        let updatedList = activeToDo.list.map((item, i) => {
            if (i === index) {
                // Toggle the fav status of the item
                return { ...item, fav: !item.fav };
            }
            return item; // Keep other items unchanged
        });
        
        const updatedfavList = updatedList.sort((a, b) => {
            // Compare based on the 'fav' property
            if (a.fav === b.fav) return 0; // If both are either true or false, maintain their order
            return a.fav ? -1 : 1; // Fav items come first
        });
        
        // Update the matchingToDo object
        updatedList = updatedfavList;

        // console.log(listId);
        // setActiveToDo(activeToDo)
        updateToDoList({
            userId,
            taskId: id,
            itemId: listId,
            title: "",
            para: "fav"
        }).then(response =>{
            console.log(response?.data?.data)
            setActiveToDo(response?.data?.data)
            // setToast("To-Do Task Added Successfully","success")
        }).catch(err=>{
            console.log(err)
            setAppPopUp(false)
            setToast("To-Do Updation Failed","error")
            setRefreshPage(0)
        })
        // Update the activeToDo state with the modified list
        setActiveToDo((prevState) => ({
            ...prevState,
            list: updatedList,
        }));
    };
    

    const deleteListItem = (itemId, listId) =>{
        setItemId(itemId)
        setId(listId)
        setDeletePopup(true)
    }
    

    const AddListItem = () =>{
        if(activeToDo?.list?.length === 9){
            setToast("Delete a Task to add a new one","error")
        }else{
            setAppPopUp(true); 
            setItemId(null)
        }
    }

    return(
        <div className={styles.container} style={{ display: 'flex' }}>
            <SidebarDashboard page={"toDoModule"} />
            <div className={styles.contentContainer}>
                <HeaderDashboardPage />
                {!isLoading ?
                    <div className={styles.midDiv}>
                        <div className={styles.leftCards}>
                            <ToDoCardComponent 
                                id={staticToDo?.id} 
                                cardData={staticToDo} 
                                setToDo={setAllToDo}
                                setCurrentPage={setCurrentPage}
                                page={"ToDoList"}
                                setRefreshPage={setRefreshPage}
                                refreshPage={refreshPage}
                                border={activeToDo?.id}
                            />
                            {nonStaticToDo?.slice(0,4)?.map((card, index) => (
                                <ToDoCardComponent 
                                    key={index}
                                    id={card?.id} 
                                    cardData={card} 
                                    setToDo={setAllToDo}
                                    setCurrentPage={setCurrentPage}
                                    page={"ToDoList"}
                                    setRefreshPage={setRefreshPage}
                                    refreshPage={refreshPage}
                                    border={activeToDo?.id}
                                />
                            ))}
                        </div>
                        <div className={styles.rightDiv}>
                            <div className={styles.rightTop}>
                                <div className={styles.rightLeft}>
                                    
                                    <div 
                                        className={cx(styles.backButton,styles.pointer)}
                                        onClick={()=>{navigate("/toDoModule")}}
                                    >
                                        <ChevronLeftIcon sx={{
                                            color:'#7E7E7E',
                                            fontSize:'34px'
                                        }}/>
                                    </div>
                                    <div>
                                        <img src={`${Base_URL}/uploads/assets/todo/${activeToDo?.emoji}.png`} alt="emoji" />
                                    </div>
                                    <div>
                                        <label>
                                            {activeToDo?.title}
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.rightLeftTop}>
                                    <div className={styles.pointer} onClick={()=>{setAddEdit(true)}}>
                                        <EditIcon />
                                    </div>
                                    <div className={styles.pointer} onClick={()=>{setDeleteConfirm(true)}}>
                                        <DeleteIcon />
                                     </div>
                                </div>
                            </div>
                            <div className={styles.rightBottom}>
                                <div className={styles.rightBottomTop}>
                                    <label className={styles.toDoListLabel}>
                                        To Do List
                                    </label>
                                    <div>
                                        <AddIcon 
                                            onClick = {AddListItem}
                                            className={styles.pointer} 
                                            style={{ color: 'white',width:'30px', height:'30px' ,backgroundColor: '#f57c00', borderRadius: '50%' }} 
                                        />
                                    </div>
                                </div>
                                <div>
                                    {
                                        (activeToDo?.list?.length === 0 || !Array(activeToDo?.list)) && 
                                        <label style={{paddingLeft:'24px'}}>
                                            No item added in list
                                        </label>
                                    }
                                    {
                                        (activeToDo?.list?.length > 0) &&
                                        <div className={styles.listItems}>
                                            {activeToDo?.list?.slice(0,9).map((item, index)=>{
                                                return(
                                                    <div key={index} className={styles.listItem}>
                                                        <div className={cx(styles.iconItem,styles.gapBig)}>
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={item?.completed} 
                                                                    onChange={() => handleCheckboxChange(index, item?.id)}
                                                                    className={styles.inputDes}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div style={{color: !item?.completed && '#121212'}}>
                                                                    {item?.title}
                                                                </div>
                                                                <div>
                                                                    {item?.date}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.iconItem}>
                                                            <div 
                                                                className={cx(styles.displayNone,styles.pointer)}
                                                                onClick={()=>{setEditPopUp(true); setTitleValue(item?.title); setItemId(item?.id)}}    
                                                            >
                                                                <EditIcon />
                                                            </div>
                                                            <div 
                                                                className={cx(styles.displayNone,styles.pointer)}
                                                                onClick={()=>{deleteListItem(item?.id, activeToDo?.id)}}
                                                            >
                                                                <DeleteIcon />
                                                            </div>
                                                            <div
                                                                className={cx(styles.displayHover, styles.pointer)}
                                                                onClick={() => handleFavToggle(index, item?.id)}
                                                            >
                                                                {item?.fav ? <StarIcon /> : <StarBorderIcon />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            addPopUp &&
                            <AddPopUp 
                                userId={userId}
                                taskId={id}
                                itemId={itemId}
                                para={"Add"}
                                setAppPopUp={setAppPopUp}
                                setEditPopUp={setEditPopUp}
                                setActiveToDo={setActiveToDo}
                                titleValue = {titleValue}
                            />
                        }
                        {
                            editPopUp &&
                            <AddPopUp 
                                userId={userId}
                                taskId={id}
                                itemId={itemId}
                                para={"Update"}
                                setAppPopUp={setAppPopUp}
                                setEditPopUp={setEditPopUp}
                                titleValue = {titleValue}
                                setActiveToDo={setActiveToDo}
                            />
                        }
                        {
                            deletePopUp &&
                            <DeleteToDoPopUp 
                                userId={userId}
                                listId={id}
                                itemId={itemId}
                                deletePopup={deletePopUp} 
                                setDeletePopup={setDeletePopup}
                                setActiveToDo={setActiveToDo}
                            />
                        }
                    </div>
                :
                    <LoadingSpinner />
                }
            </div>
            <div style={{display : !showDeleteConfirm && 'none'}}>
                <Delete 
                    id={id}
                    setCurrentPage={setCurrentPage}
                    setToDo={setAllToDo}
                    setDeleteConfirm={setDeleteConfirm}
                    showDeleteConfirm={showDeleteConfirm}

                />
            </div>
            <div style={{display : !showAddEdit && 'none'}}>
                <AddToDoCard 
                    id={id}
                    cardData={activeToDo}
                    para={"Edit"}
                    setCurrentPage={setCurrentPage}
                    setToDo={setAllToDo}
                    setAddEdit={setAddEdit}
                    showAddEdit={showAddEdit}
                />
            </div>
        </div>
    )
}

export default ToDoList;