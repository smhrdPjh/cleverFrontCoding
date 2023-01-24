import "./App.css";

import Calendar from "./component/Calendar";
import CalendarInput from "./component/CalendarInput";

import { Route, Link, Routes } from "react-router-dom";
import ApiService from "./ApiService";
import { useEffect, useRef, useState } from "react";





function App() {
  const todayWorkerList =useRef([]);
  const [render,setRender]=useState();

  useEffect(()=>{
    getSchedule();
    setRender(0);
  },[])

  const getSchedule = () => {
    console.log("함수호출당함");
    ApiService.getSchedule()
      .then((res) => {
        var result = res.data.map((item, index) => {       
          return {
            title: `${item.mem_name}${item.att_sche_start_time}~${item.att_sche_end_time}`,
            date: item.att_date,
          };
        });
  
        console.log("연기서보냄 :",result);
       
        todayWorkerList.current =result;
        
        
     
      })
      .catch((err) => {
        alert(err);
      });
      
  };

  



  return (
    <>
    <Link to={"/calendarInput"}><button>스케줄 입력</button></Link>
    <Link to={"/calendar"}><button>캘린더보기</button></Link>

      <Routes>
      <Route path="/calendar" element={<Calendar/>}></Route>
        <Route path="/calendarInput" element={<CalendarInput/>}></Route>
      </Routes>
    </>
  );
}

export default App;
