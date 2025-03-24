import React from "react";
import { useState, useEffect } from "react";
import styles from '../dashboard.module.css';

//custom checkbox
import Checkbox from '@mui/material/Checkbox';

import Document from '../images/document.png';

import cx from 'classnames';

//progress bar
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// Importing Bar Chart libraries for "Hours Spent"
// import { Bar , Doughnut} from 'react-chartjs-2';
// import { Chart as ChartJSBar, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { updateToDoDashboard } from "../../../services/Tasks/updateTasks";


import { PieChart, Pie, Cell } from 'recharts';


import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// ChartJSBar.register(CategoryScale, LinearScale, BarElement, Title);
// ChartJS.register(ArcElement, Tooltip, Legend);

function AnalysisDownloads({toDoListProp}) {
 
  // Performance
  const [selectedOption, setSelectedOption] = useState('Monthly');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Performance chart data
  const data = [
    { name: 'Completed', value: 30, fill: '#FF702D' },
    { name: 'Remaining', value: 70, fill: '#E6E6E6' },
  ];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ position: 'relative' }}>
      
          <div style={{
            backgroundColor: '#1B1B3A',
            padding: '10px',
            borderRadius: '8px',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            zIndex: 1,
            marginLeft: '10px' 
          }}>
            {payload.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: index === payload.length - 1 ? 0 : '8px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: item.color,
                  borderRadius: '2px',
                  marginRight: '8px',
                }}></span>
                <span>{`${item.value} Hr`}</span>
              </div>
            ))}
          </div>
  
          <div style={{
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid #1B1B3A', 
            position: 'absolute',
            left: '3px', 
            top: '50%',
            transform: 'translateY(-50%)', 
          }}></div>
        </div>
      );
    }
    return null;
  };
  

  const hoursSpentData = [
    { month: 'Jan', Study: 40, OnlineTest: 60 },
    { month: 'Feb', Study: 20, OnlineTest: 30 },
    { month: 'Mar', Study: 35, OnlineTest: 52 },
    { month: 'Apr', Study: 45, OnlineTest: 35 },
    { month: 'May', Study: 10, OnlineTest: 20 },
    { month: 'Jun', Study: 60, OnlineTest: 30 },
    { month: 'Jul', Study: 25, OnlineTest: 40 },
    { month: 'Aug', Study: 50, OnlineTest: 25 },
    { month: 'Sep', Study: 40, OnlineTest: 50 },
    { month: 'Oct', Study: 30, OnlineTest: 40 },
  ];
  
  // To-do list state and checkbox handler
  const [toDoList, setToDoList] = useState(toDoListProp);
  useEffect(() => {
    setToDoList(toDoListProp);
  }, [toDoListProp]);

  const [indexList, setIndexList]=useState([])

  const updateItemStatus = (index, newStatus) => {
    setToDoList((prevList) =>
      prevList.map((item, idx) =>
        idx === index ? [newStatus, item[1], item[2]]: item
      )
    );
    setIndexList((prevIndexList) => [...prevIndexList, index]);
  };

  useEffect(()=>{
    const userID = localStorage?.getItem("id");
    if(userID){
      // console.log("Index List",indexList)
      let changedIndex = indexList[indexList.length-1];
      // console.log(changedIndex)
      // console.log(toDoList[indexList[indexList.length-1]])
      if(changedIndex !== undefined){
        updateToDoDashboard(
          {
            "toDoItem": toDoList[indexList[indexList.length-1]] ,
            "index": changedIndex,
            "userId": userID
          }).then((response)=>{
          // console.log(response?.data?.data)  response?.data?.data[0]//when there are multiple users
          // console.log("API call successful")
        })
      }
    }
  },[indexList , toDoList])

  // Downloads data
  const downloadData = [
    [".PDF","ReactJS-for-beginner.pdf","progress","","Cancel"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".XLS","Database-MySQl.xls","Microsoft Excel","4.5 MB","View"],
    [".DOC","Summary-of-php.docx","Microsoft Word","4.5 MB","View"],
  ]

  // Progress bar for downloads
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: '6px',
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#D9D9D9',
      ...theme.applyStyles('dark', {
        backgroundColor: '#D9D9D9',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#FF702D',
      ...theme.applyStyles('dark', {
        backgroundColor: '#FF702D',
      }),
    },
  }));

    return(
        <div className={styles.analysisDownloads}>
          <div className={styles.analysisDiv}>
            <label className={styles.analysisDivLabel}>
              Analysis
            </label>
            <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
              <div className={styles.performanceTodo} >
                <div className={styles.analysisDivUpper}>
                  <div>
                    <label style={{fontSize:'16px',color:'#121212',fontWeight:'600'}}>
                      Performance
                    </label>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center', gap:'7px'}}>
                      <div style={{borderRadius:'3.59px',width:'14.34px',height:'14.34px',backgroundColor:'#FF702D'}}>

                      </div>
                      <div style={{fontWeight:'500',fontSize:'12px',color:'#42404C' , display:'flex',flexDirection:'column'}}>
                        <label>
                          Assignment Submission
                        </label>
                        <label>
                          Performance
                        </label>
                      </div>
                    </div>
                    <div>
                    <select className={styles.dropdownPerformance} value={selectedOption} onChange={handleChange}>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',position:'relative',flexDirection:'column' , gap:'5px'}}>
                    <div style={{ position:'absolute',bottom:'-180px'}}>
                    <PieChart width={400} height={350}>
                      <Pie
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        innerRadius="80%"
                        outerRadius="100%"
                        dataKey="value"
                        cx="50%"
                        cy="100%"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',gap:'5px',position:'absolute',bottom:'-180px' , fontWeight:'500',fontSize:'14px'}}>
                      <label style={{color:'#83868E'}}>
                        Your Grade:
                      </label>
                      <label style={{
                        color:'#000000',
                        fontWeight:'700',
                      }}>
                        8.966
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.analysisDivUpper}>
                  <div>
                    <label style={{fontSize:'16px',color:'#121212',fontWeight:'600'}}>
                      To do List
                    </label>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {toDoList.slice(0, 4).map((item, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', gap: '28px', paddingLeft: '11px', paddingBottom: '12px' }}>
                        <Checkbox
                            checked={item[0] === "Check"}
                            onChange={(e) => updateItemStatus(index, e.target.checked ? "Check" : "Uncheck")}
                            sx={{
                            color: '#FF702D',
                            '&.Mui-checked': {
                                color: '#FF702D',
                            },
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label className={styles.toDoListLabel1} style={{ textDecoration: item[0] === "Check" ? 'line-through' : '' }}>
                            {item[1]}
                            </label>
                            <label className={styles.toDoListLabel2}>
                            {item[2]}
                            </label>
                        </div>
                        </div>
                        <div style={{ backgroundColor: index !== 3 ? '#ECECEC' : '', height: '1.29px' }}>
                        </div>
                    </div>
                    ))}
                    {toDoList?.length === 0 && 
                      <div>
                        No To-Do Added
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className={cx(styles.analysisDivUpper,styles.analysisDivLower)}>
                <div>
                    <label style={{fontSize:'16px',color:'#121212',fontWeight:'600'}}>
                        Hours Spent
                    </label>
                </div>
                <div style={{ height: '250px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">

                  <BarChart
      width={500}
      height={300}
      data={hoursSpentData}
      style={{ backgroundColor: 'transparent' }}
    >
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(value) => `${value} Hr`} />
      <Tooltip 
        content={<CustomTooltip />}
        cursor={{ fill: 'transparent' }} // Disable grey background on hover
      />
      <Legend
        iconType="square"
        iconSize={15}
        wrapperStyle={{
          padding: '10px',
          fontSize: '14px',
          color: '#999999',
        }}
      />
      <Bar
        dataKey="Study"
        stackId="a"
        fill="#FF702D"
        radius={[5, 5, 0, 0]} // Rounded top corners
        isAnimationActive={false}
      />
      <Bar
        dataKey="OnlineTest"
        stackId="a"
        fill="#F8EFE2"
        radius={[5, 5, 0, 0]} // Rounded top corners
        isAnimationActive={false}
      />
    </BarChart>

                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <label className={styles.analysisDivLabel}>
              Downloads
            </label>
            <div style={{position:'relative'}} className={styles.downloaddivStyle}> 
            {downloadData.map((item, index) => (
              <div key={index}>
                <div className={styles.downloadDataDes}>
                  <div style={{ position: 'relative', width: '31px', height: '41px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Document} alt="Document" style={{ position: 'absolute', width: '100%', height: '100%' }} />
                    <label style={{ position: 'absolute',fontSize:'7.76px',fontWeight:'700',color:'#FFFFFF', zIndex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      {item[0]}
                    </label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column',gap:'4px' }}>
                    <label style={{color:'#121212', fontWeight:'500',fontSize:'13px'}}>
                      {item[1]}
                    </label>
                    {item[2]!=="progress" ? 
                    <div style={{display:'flex',alignItems:'center',gap:'5px',color:'#121212', fontWeight:'400',fontSize:'11px'}}>
                      <label>
                        {item[2]} |
                      </label>  
                      <label>
                        {item[3]}
                      </label>
                    </div>
                    : <BorderLinearProgress style={{marginTop:'6px'}} variant="determinate" value={50} /> }
                  </div>
                  <label style={{position:'absolute',right:'0px',cursor:'pointer',paddingRight:'24px', color: item[4]==="Cancel" ? '#121212' : '#FF702D', fontWeight: item[4]==="Cancel" ? '500' : '600'}}>
                   {item[4]}
                  </label>
                </div>
                <div style={{
                  width: '100%',
                  height: '.5px',
                  backgroundColor: '#D8D8D8',
                  marginTop: '13.5px',
                  marginBottom: '13.5px',
                  display: index === 9 ? 'none' : 'block' 
                }}>
                </div>
              </div>
            ))}
            </div>
          </div> */}
        </div>
    )
}

export default AnalysisDownloads;
