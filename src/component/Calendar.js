import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useRef, useEffect } from "react";
import "../style/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../ApiService";


const Calendar = () => {
  var copyTodayWorkerList =[];
  var copySelectedWorkerList=[];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  var today = String(year + "-" + month + 1 + "-" + day);
  const [workerName, setWorkerName] = useState("");
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const [selectedDate, setSelectedDate] = useState(today);
  let arrAddList = useRef([]);
  const [thisDayListState, setThisDayListState] = useState([]);
  const [arrAddListState, setArrAddListState] = useState([]);
  const workingTime = [{ arrive: "07:00", live: "18:00" }];
  const scheduleList = useRef([]);
  const [todayWorkerList, setTodayWorkerList]= useState([]);
  const selectedList= useRef([])
  // const todayWorkerList = useRef([]);
  const selectedWorkerList = useRef([]);
  const scheduleInfo = useRef([]);
  var copyScheduleInfo = [];

copyTodayWorkerList=[...todayWorkerList];
copySelectedWorkerList=[...selectedList.current]
copyScheduleInfo=[scheduleInfo.current]

const clickDate = (e)=>{
  selectedList.current=[];
  for(var i=0; i<copyScheduleInfo[0].length; i++){
   
   copyScheduleInfo[0][i].att_date === e? selectedList.current.push({
    workerName:  copyScheduleInfo[0][i].mem_name,
    startTime:  copyScheduleInfo[0][i].att_sche_start_time,
    endTime:  copyScheduleInfo[0][i].att_sche_end_time,
  }) : console.log();
  
  }
  console.log("선택이후", selectedList.current)
  setSelectedDate(String(e))

}


console.log("초대형",copyScheduleInfo);
console.log("대형",copyTodayWorkerList);
console.log("소형",copySelectedWorkerList);





useEffect(()=>{

  getSchedule(); 

},[])


  var copySchedule = [];

  console.log("컴포넌트 시작부");

  const getSchedule = () => {
    ApiService.getSchedule()
      .then((res) => {
        scheduleInfo.current =[...res.data];
        var result = res.data.map((item, index) => {
          
          item.att_date === today? selectedList.current.push({
            workerName: item.mem_name,
            startTime: item.att_sche_start_time,
            endTime: item.att_sche_end_time,
          }): console.log();
          return {
            title: `${item.mem_name}${item.att_sche_start_time}~${item.att_sche_end_time}`,
            date: item.att_date,
          };
        });

      
       
        setTodayWorkerList(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const getDateList = (e) => {
  //   ApiService.getDateList(selectedDate)
  //     .then((res) => {
  //       var result = res.data.map((item, index) => {
  //         console.log("getDateList");
  //         return {
  //           workerName: item.mem_name,
  //           startTime: item.att_sche_start_time,
  //           endTime: item.att_sche_end_time,
  //         };
  //       });
  //       console.log("두번째",result);
  //       copySelectedWorkerList=result;
  //       setSelectedDate(e);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  var workerList = [
    { workerName: "선택", startTime: "16:10", endTime: "21:10" },
    {
      workerName: "박진형",
      startTime: "16:10",
      endTime: "21:10",
    },
    {
      workerName: "박형주",
      startTime: "09:10",
      endTime: "16:10",
    },
    {
      workerName: "나소연",
      startTime: "21:10",
      endTime: "04:10",
    },
    {
      workerName: "임아해",
      startTime: "04:10",
      endTime: "09:10",
    },
  ];
  // const planModification = () => {
  //   var result = selectedWorkerList.current.map((item, index) => {
  //     return (
  //       <tr key={`${item.workerName}${index}`}>
  //         <select
  //           onChange={(e) => {
  //             selectedWorkerList.current[index].workerName = e.target.value;
  //           }}
  //           defaultValue={item.workerName}
  //         >
  //           {workerListRendering()}
  //         </select>
  //         <input
  //           type="time"
  //           defaultValue={item.startTime}
  //           onChange={(e) => {
  //             selectedWorkerList.current[index].startTime = e.target.value;
  //           }}
  //         />
  //         ~
  //         <input
  //           type="time"
  //           defaultValue={item.endTime}
  //           onChange={(e) => {
  //             selectedWorkerList.current[index].endTime = e.target.value;
  //             console.log("투데이배열", selectedWorkerList.current);
  //           }}
  //         />
  //         <button
  //           onClick={() => {
  //             selectedWorkerList.current.splice(index, 1);
  //             setThisDayListState([selectedWorkerList.current]);
  //           }}
  //         >
  //           삭제
  //         </button>
  //       </tr>
  //     );
  //   });

  //   return result;
  // };
  const planModification = () => {
    var result = copySelectedWorkerList.map((item, index) => {
      return (
        <tr key={`${item.workerName}${index}`}>
          <select
            onChange={(e) => {
              copySelectedWorkerList[index].workerName = e.target.value;
            }}
            defaultValue={item.workerName}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              copySelectedWorkerList[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            type="time"
            defaultValue={item.endTime}
            onChange={(e) => {
              copySelectedWorkerList[index].endTime = e.target.value;
              console.log("투데이배열", copySelectedWorkerList);
            }}
          />
          <button
            onClick={() => {
              copySelectedWorkerList.splice(index, 1);
              setThisDayListState([copySelectedWorkerList]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });
  
    return result;
  };



  const workerListRendering = () => {
    var result = workerList.map((item, index) => {
      return <option key={index}>{item.workerName}</option>;
    });
    return result;
  };

  const addModification = () => {
    let result = arrAddList.current.map((item, index) => {
      return (
        <tr key={uuidv4()}>
          <select
            defaultValue={item.workerName}
            onChange={(e) => {
              arrAddList.current[index].workerName = e.target.value;
            }}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              arrAddList.current[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            defaultValue={item.endTime}
            type="time"
            onChange={(e) => {
              arrAddList.current[index].endTime = e.target.value;
            }}
          />
          <button
            onClick={() => {
              arrAddList.current.splice(index, 1);
              setArrAddListState([arrAddList.current]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });
    return result;
  };

  const pushArrAddList = () => {
    arrAddList.current.push({
      workerName: "",
      startTime: "",
      endTime: "",
    });
  };

  const submitModification = () => {
    console.log(
      "최종배열",
      selectedWorkerList.current.concat(arrAddList.current)
    );
  };

  const clickDetail = () => {
    for (var i = 0; i < copySchedule.length; i++) {
      if (copySchedule[i].date === selectedDate.replace(/-/gi, "")) {
        return copySchedule[i].mem_name;
      }
    }
  };

  useEffect(() => {
    console.log("첫번째 유스이펙트");
    // getSchedule()
 
   
  
  }, []);


  return (
    <div className="container">
      <div className="calendar">
    
        <select
          onChange={(e) => {
            setWorkerName(e.target.value);
          }}
        >
          {workerListRendering()}
        </select>
        <FullCalendar
          dafaultView="dayGriMonth"
          plugins={[daygrid, googleCalendar, interaction]}
          googleCalendarApiKey={apiKey} // apiKey
          locale="ko" //한글 버전
          selectable={true}
          height={700}
          dayMaxEventRows={3}
          // timeGrid={1}
          // views={1}
          //이벤트
          eventSources={[
            {
              googleCalendarId:
                "ko.south_korea#holiday@group.v.calendar.google.com",
              color: "red",
              textColor: "yellow",
            },
          ]}
          events={copyTodayWorkerList}
          eventClick={function (info) {
            alert(info.date + info.event.title);
            info.el.style.borderColor = "red";
          }}
          dateClick={function (info) {
            clickDate(info.dateStr);
           
          }}
          businessHours={[
            {
              daysOfWeek: [1, 2, 3],
            },
            {
              daysOfWeek: [4, 5], // Thursday, Friday
            },
          ]}
          titleFormat={[
            {
              // will produce something like "Tuesday, September 18, 2018"
              month: "long",
              year: "numeric",
              day: "numeric",
              weekday: "long",
            },
          ]}
        />
      </div>
      <div className="calendarDetail">
        <div className="table">
          <table>
            <tr align="center">
              <h1>{selectedDate}</h1>
            </tr>
            <tr align="left">
              <h3>
                {workerName} {clickDetail()}
              </h3>
            </tr>
            <button id="button1">수정하기</button>
          </table>
        </div>
        <div>
          {planModification()}
          {addModification()}
          <button
            onClick={() => {
              pushArrAddList();
              setArrAddListState([arrAddList.current]);
            }}
          >
            +추가
          </button>

          <input
            type="submit"
            name="등록"
            value="등록"
            onClick={submitModification}
          ></input>
          <tr></tr>
        </div>

        <div className="special">
          <h3>여기에 특이사항</h3>
          <br></br>
          <tr>
            <td>근무수정 : </td>
            <td> 08:00 </td>
            <td>~</td>
            <td>16:00</td>
          </tr>
        </div>
      </div>
      <a href="/calendarInput">등록하러가기</a>
      {console.log("컴포넌트 끝부분")}
    </div>
  );
};

export default Calendar;
