import React, { useEffect, useState } from "react";

import styles from "./displayCenter.module.css";

import PageSetup from "../../components/Container/pageSetup/pageSetup";
import TopBar from "../../components/topBar/topBar";
import Box from "../../components/Container/displayCenter/box/box";
import ScrollBar from "../../components/scrollBar/scrollBar";


import { getFacadesData, getprojectsData } from "../../services/projects/getprojects";
import FilterPopUp from "../../components/Container/filterPopUp/filterPopUp";
import { getUserData } from "../../services/user/getUser";
import BuildingLoader from "../../components/loader/loader";



function DisplayCenter(){

    const[loading, setLoading] = useState(true)

    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])

    const [filterPopUp, setFilterPopUp] = useState(false)
    const [filterEnable, setFilterEnable]  = useState(true)

    const [buttonDis, setButtonDis] = useState(true)

    const [projectRerender, setProjectsRerender] = useState(true)

    const [landWithOptions, setLandWidthOptions] = useState([])
    const [landDepthOptions, setLandDepthOptions] = useState([])
    
    const [facade, setFacade] = useState([])

    const [filters , setFilters] = useState({
        sliderValue:[0,0],
        landWidthValue: '',
        landDepthValue: '',
        livingValue: '',
        storeysValue: '',
        garageValue: '',
        driveWayValue: 'Right',
        bedroomActive: '',
    })

    // useEffect(()=>{
    //     if(filters){
    //         console.log(filters)
    //     }
    // },[filters])


    function fetchProjects(){
        setLoading(true)
        getprojectsData().then(response =>{
            // console.log(response?.data?.data)
            setProjects(response?.data?.data)
            if(response?.data?.data?.length === 0){
                setLoading(false)
            }
        }).catch(err=>{
            setLoading(false)
            console.log(err,"Projects Data Not Fetched")
        })
    }

    function fetchFacades(){
        setLoading(true)
        getFacadesData().then(response =>{
            // console.log(response?.data?.data)
            setFacade(response?.data?.data)
            if(response?.data?.data?.length === 0){
                setLoading(false)
            }
        }).catch(err=>{
            setLoading(false)
            console.log(err,"Facades Data Not Fetched")
        })
    }


    useEffect(() => {
        if (projects?.length > 0) {
            const depthSet = new Set();
            const widthSet = new Set();
    
            for (let i of projects) {
                const depth = i?.custom_fields?.find(field => field?.name === "Lot Depth")?.value;
                const width = i?.custom_fields?.find(field => field?.name === "Lot Width")?.value;
    
                if (depth) depthSet.add(depth);
                if (width) widthSet.add(width);
            }
    
            // Convert Sets to the desired object array format
            const depthOptions = [...depthSet].map((value) => ({
                value: value,
                label: `${value} m`,
            }));
            const widthOptions = [...widthSet].map((value) => ({
                value: value,
                label: `${value} m`,
            }));
    
            setLandDepthOptions(depthOptions);
            setLandWidthOptions(widthOptions);
        }
    }, [projects]);
    
    

    const [searchValue, setSearchValue] = useState('')

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value || '')
    }

    useEffect(()=>{
        // setLoading(true)
        if(projects?.length > 0 && searchValue !== ''){
            // console.log(searchValue)
            const filtered = projects.filter(project => 
                project?.custom_fields?.find(field => field?.name === "Name")?.value?.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    },[searchValue, projects])

    const [finalProjects, setFinalProjects] = useState([])
    const [driveWayFilterValue, setDriveWayFilterValue] = useState('Right')
    useEffect(() => {
        if (filteredProjects && !buttonDis) {
            // const filterProjects = () => {
            //     return filteredProjects.filter(project => {
            //         const customFields = project?.custom_fields || [];
                    
            //         // Default values
            //         const sliderMin = filters?.sliderValue?.[0] ?? 0;
            //         const sliderMax = filters?.sliderValue?.[1] ?? Infinity;
            
            //         // Initialize conditions array
            //         const conditions = [];
            
            //         // Check sliderValue range
            //         if (filters?.sliderValue) {
            //             const fieldValue = Number(customFields?.[6]?.value);
            //             conditions.push(fieldValue > sliderMin && fieldValue < sliderMax);
            //         }

            //         // DriveWay
            //         if (filters?.driveWayValue) {
            //             // console.log(filters?.driveWayValue)
            //             setDriveWayFilterValue(filters?.driveWayValue)
            //             return true
            //         }
            
            //         // Check landWidthValue
            //         if (filters?.landWidthValue) {
            //             conditions.push(customFields?.[9]?.value === filters.landWidthValue);
            //         }
            
            //         // Check landDepthValue
            //         if (filters?.landDepthValue) {
            //             conditions.push(customFields?.[8]?.value === filters.landDepthValue);
            //         }
            
            //         // Check storeysValue
            //         if (filters?.storeysValue) {
            //             const storeysValue = Number(filters.storeysValue);
            //             conditions.push(Number(customFields?.[13]?.value) === storeysValue);
            //         }
            
            //         // Check garageValue
            //         if (filters?.garageValue) {
            //             const garageValue = Number(filters.garageValue);
            //             conditions.push(Number(customFields?.[5]?.value) === garageValue);
            //         }
            
            //         // Check livingValue
            //         if (filters?.livingValue) {
            //             conditions.push(customFields?.[7]?.value === filters.livingValue);
            //         }
            
            //         // Check bedroomActive
            //         if (filters?.bedroomActive) {
            //             const bedroomActive = Number(filters.bedroomActive);
            //             if (bedroomActive === 6) {
            //                 conditions.push(Number(customFields?.[1]?.value) > 5);
            //             } else {
            //                 conditions.push(Number(customFields?.[1]?.value) === bedroomActive);
            //             }
            //         }
            
            //         // Evaluate all conditions (some must be true)
            //         for (let i = 0; i < conditions.length; i++) {
            //             if (conditions[i]) {
            //                 return true; // Return true if any condition is satisfied
            //             }
            //         }
            
            //         return false; // Return false if no condition is satisfied
            //     });
            // };

            const filterProjects = () => {
                // console.log(filters)
                return filteredProjects.filter(project => {
                    const customFields = project?.custom_fields || [];
                    
                    // Default values
                    const sliderMin = filters?.sliderValue?.[0] ?? 0;
                    let sliderMax = filters?.sliderValue?.[1] ?? Infinity;

                    if(sliderMax === 0){
                        sliderMax = Infinity
                    }

                    if(sliderMin > 0 && sliderMax === Infinity){
                        sliderMax = 0
                    }

            
                    // Initialize conditions array
                    const conditions = [];
            
                    // Check sliderValue range
                    if (filters?.sliderValue) {
                        const fieldValue = Number(customFields?.find(field => field?.name === "House Area (m2)")?.value);
                        conditions.push(fieldValue > sliderMin && fieldValue < sliderMax);
                    }
            
                    // DriveWay
                    if (filters?.driveWayValue) {
                        setDriveWayFilterValue(filters.driveWayValue || 'Right');
                        conditions.push(true); // Add specific condition logic here if needed
                    }
            
                    // Check landWidthValue
                    if (filters?.landWidthValue) {
                        conditions.push(customFields?.find(field => field?.name === "Lot Width")?.value === filters.landWidthValue);
                    }
            
                    // Check landDepthValue
                    if (filters?.landDepthValue) {
                        conditions.push(customFields?.find(field => field?.name === "Lot Depth")?.value === filters.landDepthValue);
                    }
            
                    // Check storeysValue
                    if (filters?.storeysValue) {
                        const storeysValue = Number(filters.storeysValue);
                        conditions.push(Number(customFields?.find(field => field?.name === "Storey")?.value) === storeysValue);
                    }
            
                    // Check garageValue
                    if (filters?.garageValue) {
                        const garageValue = Number(filters.garageValue);
                        conditions.push(Number(customFields?.find(field => field?.name === "Garage")?.value) === garageValue);
                    }
            
                    // Check livingValue
                    if (filters?.livingValue) {
                        conditions.push(customFields?.find(field => field?.name === "Living")?.value === filters.livingValue);
                    }
            
                    // Check bedroomActive
                    if (filters?.bedroomActive) {
                        const bedroomActive = Number(filters.bedroomActive);
                        if (bedroomActive === 6) {
                            conditions.push(Number(customFields?.find(field => field?.name === "Bedrooms")?.value) > 5);
                        } else {
                            conditions.push(Number(customFields?.find(field => field?.name === "Bedrooms")?.value) === bedroomActive);
                        }
                    }
            
                    // Evaluate all conditions (all must be true)
                    return conditions.every(condition => condition); // Use `every` for AND logic
                });
            };
            
            
    
            const filtered = filterProjects();
            setFinalProjects(filtered); // Trigger re-render
        } else {
            setFinalProjects(filteredProjects || []);
            setDriveWayFilterValue('Right')
        }
    }, [buttonDis, filteredProjects, filters]);
    

    const [userId, setUserId] = useState('')

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
    },[])

    const [likedPlans, setLikedPlans] = useState([])
    const [filterPopUpState, setFilterPopUpState] = useState(false)

    useEffect(()=>{
        if(userId !== "" && projectRerender){
            // setLoading(true)
            getUserData({userId}).then(response=>{
                // console.log(response?.data?.data)
                setLikedPlans(response?.data?.data?.likedPlans)
                setProjectsRerender(false)
                // localStorage.setItem("likedPlans",JSON.stringify(response?.data?.data?.likedPlans))
            }).catch(err=>{
                console.log(err)
                // navigate("/signIn")
                setLoading(false)

            }
            )
        }
    },[userId, projectRerender])
    

    const [likePlansActive, setLikePlansActive] = useState(false)
    const handleLikePlans = () =>{
        setLikePlansActive(!likePlansActive)
    }

    const [finalActiveProjects, setFinalActiveProjects] = useState([])

    useEffect(()=>{
        if(likePlansActive){
            const filtered = finalProjects.filter(project => {
                return(
                    likedPlans.includes(project.TaskID)
                )
            })
            setFinalActiveProjects(filtered)
            setLoading(false)
        }else{
            setFinalActiveProjects(finalProjects)
        }
    },[finalProjects,likePlansActive, likedPlans])


    useEffect(()=>{
        fetchProjects()
        fetchFacades()
    },[])


    // Screen Shot disabled
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (
            event.key === 'PrintScreen' ||
            (event.ctrlKey && (event.key === 's' || event.key === 'S')) ||
            (event.metaKey && (event.key === 's' || event.key === 'S')) ||

            (event.key === 'F12')
          ) {
            event.preventDefault();
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

      useEffect(()=>{
        if(finalActiveProjects?.length > 0){
            setLoading(false)
        }
      },[finalActiveProjects])
    
    return(
        <PageSetup 

            active={"displayCenter"}
            appBar={true}
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            setFilters={setFilters}
            buttonDis={buttonDis} 
            setButtonDis={setButtonDis}
            filters={filters}
           loading={loading}
           setLoading={setLoading}
            setLikePlansActive={setLikePlansActive}
            likePlansActive={likePlansActive}
            handleLikePlans={handleLikePlans}
            landDepthOptions={landDepthOptions}
            landWithOptions={landWithOptions}
            setFilterEnable={setFilterEnable}
            setFilterPopUp={setFilterPopUp}
            setFilterPopUpState={setFilterPopUpState}
            filterPopUpState={filterPopUpState}
        >
            <div className={styles.mainDiv}>
                <div className={styles.topbarDiv}>
                    <TopBar 
                        text={"Display Center"}
                        filterEnable={filterEnable}
                        setFilterPopUp={setFilterPopUp}
                        setFilterEnable={setFilterEnable}
                    />
                </div>
                <ScrollBar>
                    {/* <div className={styles.mainDiv_child}>
                        {
                            finalActiveProjects.map((item, index)=>{
                                return(
                                    <Box
                                        project={item}
                                        facade={facade}
                                        key={index}
                                        likedPlans={likedPlans}
                                        setProjectsRerender={setProjectsRerender}
                                        driveWayFilterValue={driveWayFilterValue}
                                    />
                                )
                            })
                        }
                        {
                            finalActiveProjects.length === 0 && likePlansActive && buttonDis && searchValue === '' &&
                                <div>
                                    No projects yet! Start liking projects to see them here.
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue === "" && !loading && buttonDis && !likePlansActive &&
                                <div>
                                    No projects Found! Add a Project
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue !== '' && buttonDis && !likePlansActive &&
                                <div>
                                    No projects Found! Clear the Search Query
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue === '' && !buttonDis && !likePlansActive &&
                                <div>
                                    No projects Found! Clear the Filters
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue !== '' && !buttonDis && likePlansActive &&
                                <div>
                                    No projects Found! Clear the Filters
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue === '' && !buttonDis && likePlansActive &&
                                <div>
                                    No projects Found! Clear the Filters
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue !== '' && !buttonDis && !likePlansActive &&
                                <div>
                                    No projects Found! Clear the Filters
                                </div>
                        }
                        {
                            finalActiveProjects.length === 0 && searchValue !== '' && buttonDis && likePlansActive &&
                                <div>
                                    No projects Found! Clear the Search Query
                                </div>
                        }
                    </div> */}



<div className={styles.mainDiv_child}>

{loading ? (
        <div className={styles.loaderContainer}>
        {/* Pass loaderState and setLoading as props */}
        <div className={styles.loader}>
            {/* Loading... */}
            <BuildingLoader 
                marginTop={"30vh"}
            />
        </div>
    </div>
) : (
<>
    {
        finalActiveProjects.map((item, index)=>{
            return(
                <Box
                
                    project={item}
                    facade={facade}
                    key={index}
                    likedPlans={likedPlans}
                    setProjectsRerender={setProjectsRerender}
                    driveWayFilterValue={driveWayFilterValue}
                />
            )
        })
    }
    {
        finalActiveProjects.length === 0 && likePlansActive && buttonDis && searchValue === '' &&
            <div>
                No projects yet! Start liking projects to see them here.
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue === "" && !loading && buttonDis && !likePlansActive &&
            <div>
                No projects Found! Add a Project
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue !== '' && buttonDis && !likePlansActive &&
            <div>
                No projects Found! Clear the Search Query
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue === '' && !buttonDis && !likePlansActive &&
            <div>
                No projects Found! Clear the Filters
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue !== '' && !buttonDis && likePlansActive &&
            <div>
                No projects Found! Clear the Filters
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue === '' && !buttonDis && likePlansActive &&
            <div>
                No projects Found! Clear the Filters
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue !== '' && !buttonDis && !likePlansActive &&
            <div>
                No projects Found! Clear the Filters
            </div>
    }
    {
        finalActiveProjects.length === 0 && searchValue !== '' && buttonDis && likePlansActive &&
            <div>
                No projects Found! Clear the Search Query
            </div>
    }

</>
)}

</div>

                </ScrollBar>
            </div>
            {
                filterPopUp && <FilterPopUp setFilterPopUpState={setFilterPopUpState} landDepthOptions={landDepthOptions} landWithOptions={landWithOptions} filters={filters} buttonDis={buttonDis} setButtonDis={setButtonDis} setFilters={setFilters}  setFilterPopUp={setFilterPopUp} setFilterEnable={setFilterEnable}/>
            }
        </PageSetup>
    )
}

export default DisplayCenter;