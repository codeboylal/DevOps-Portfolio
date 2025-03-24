import React, { useEffect, useState } from "react";

import styles from './toDoCard.module.css';
import cx from "classnames";

import SidebarDashboard from "../../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../../Common Components/Header Dashboard Page/headerDashboardPage";
import LoadingSpinner from "../../../Common Components/Loader/Loader";

import AddIcon from '@mui/icons-material/Add';
import ToDoCardComponent from "../../../components/container/toDoCard/card";
import PaginationComponent from "../../../Common Components/Pagination Component/paginationComponent";
import { GetUserToDoDetails } from "../../../services/Tasks/getTasks";
import AddToDoCard from "./popUp/Add/AddToDoCard";


function ToDoCardModule() {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userId, setUserId] = useState('')
    const [toDo, setToDo] = useState([])
    const [totalPages, setTotalPage] = useState()
    const [displayedCards, setDisplayedCards] = useState([])
    const [showAddEdit, setAddEdit] = useState(false)
    const [refreshPage, setRefreshPage] = useState(false)

    const cardsPerPage = 16;


    const addIconClick = () => {
        setAddEdit(true);
    };


    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
        localStorage?.removeItem("ToDoId")
    },[])

    useEffect(()=>{
        if(userId){
            setIsLoading(true)
            GetUserToDoDetails(userId).then(response=>{
                // console.log(response?.data?.data?.[0].toDo)
                setToDo(response?.data?.data?.[0].toDo)
                
            }).catch(err=>{
                console.log(err)
            })
            setIsLoading(false)
        }
    },[userId])

    useEffect(()=>{
        if(toDo){
            setTotalPage(Math.ceil(toDo.length / cardsPerPage))
            // console.log(toDo.slice((currentPage - 1) * cardsPerPage,currentPage * cardsPerPage))
            setDisplayedCards(toDo.slice((currentPage - 1) * cardsPerPage,currentPage * cardsPerPage));
            
        }
    },[toDo, currentPage])



    return (
        <div className={styles.container} style={{ display: 'flex' }}>
            <SidebarDashboard page={"toDoModule"} />
            <div className={styles.contentContainer}>
                <HeaderDashboardPage />
                {!isLoading ?
                    <div className={styles.midDiv}>
                        <div className={styles.listAddPlacement}>
                            <div className={styles.listLabelIcon}>
                                <label className={styles.newListDes}>
                                    New List
                                </label>
                                <AddIcon
                                    onClick={addIconClick}
                                    className={styles.pointer}
                                    style={{ color: 'white', backgroundColor: '#F36A40', borderRadius: '50%' }}
                                />
                            </div>
                        </div>
                        <div className={cx(styles.cardsDiv)}>
                            {displayedCards.map((card, index) => (
                                <ToDoCardComponent 
                                    key={index}
                                    id={card?.id} 
                                    cardData={card} 
                                    setToDo={setToDo}
                                    setCurrentPage={setCurrentPage}
                                    setRefreshPage={setRefreshPage}
                                    refreshPage={refreshPage}
                                />
                            ))}
                            {toDo?.length === 0 &&
                                <label>
                                    Add a To-do
                                </label>
                            }
                        </div>
                        <div>
                        </div>
                        <div style={{display: toDo?.length <= 16 && 'none'}}>
                            <PaginationComponent
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        </div>
                        <div style={{display : !showAddEdit && 'none'}}>
                            <AddToDoCard 
                                id={null}
                                para={"Add"}
                                setCurrentPage={setCurrentPage}
                                setToDo={setToDo}
                                setAddEdit={setAddEdit}
                                showAddEdit={showAddEdit}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <LoadingSpinner />
                    </div>
                }
            </div>
        </div>
    );
}

export default ToDoCardModule;
