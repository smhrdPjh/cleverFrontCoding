import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState, useRef } from "react";
import "../style/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
var thisDayList = [
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
];
const Calendar = () => {
  const [thisDayListState, setThisDayListState] = useState([thisDayList]);
  const [arrAddListState, setArrAddListState] = useState([]);

  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = year + "-" + month + 1 + "-" + day;
  let arrAddList = useRef([]);
  const [addCount, setAddCount] = useState(0);
  const [selectedDate, setSelectecDate] = useState(today);
  const workingTime = [{ arrive: "07:00", live: "18:00" }];
  console.log("리스트상태", arrAddList.current);
  var countNumRef = useRef(0);
  const setSchedul = [
    { title: "07:00~15:00", date: "2023-01-01" },
    { title: "07:00~15:00", date: "2023-01-02" },
    { title: "07:00~15:00", date: "2023-01-03" },
  ];
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

  const workerListRendering = () => {
    var result = workerList.map((item, index) => {
      return <option key={index}>{item.workerName}</option>;
    });
    return result;
  };

  const planModification = () => {
    var result = thisDayList.map((item, index) => {
      return (
        <tr key={`${item.workerName}${index}`}>
          <select
            onChange={(e) => {
              thisDayList[index].workerName = e.target.value;
            }}
            defaultValue={item.workerName}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              thisDayList[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            type="time"
            defaultValue={item.endTime}
            onChange={(e) => {
              thisDayList[index].endTime = e.target.value;
              console.log("투데이배열", thisDayList);
            }}
          />
          <button
            onClick={() => {
              thisDayList.splice(index, 1);
              console.log("삭제" + index);
              console.log("삭제후 리스트", thisDayList);
              setThisDayListState([...thisDayList]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });

    return result;
  };

  const addModification = () => {
    console.log("함수안에서 상태", arrAddList.current);
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
    console.log("최종배열", thisDayList.concat(arrAddList.current));
  };
  console.log("상태 :", arrAddListState);
  return (
    <div className="container">
      <div className="calendar">
        <select>
          <option value="jin">박진형</option>
          <option value="bro">박형주</option>
          <option value="so">나소연</option>
          <option value="ah">임아해</option>
          <option value="all">전체보기</option>
        </select>
        <FullCalendar
          dafaultView="dayGriMonth"
          plugins={[daygrid, googleCalendar, interaction]}
          googleCalendarApiKey={apiKey} // apiKey
          locale="ko" //한글 버전
          selectable={true}
          height={700}
          //이벤트
          eventSources={[
            {
              googleCalendarId:
                "ko.south_korea#holiday@group.v.calendar.google.com",
              color: "red",
              textColor: "yellow",
            },
          ]}
          events={setSchedul}
          eventClick={function (info) {
            alert(info.date + info.event.title);
            info.el.style.borderColor = "red";
          }}
          dateClick={function (info) {
            setSelectecDate(info.dateStr);
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
                박진형 : {workingTime[0].arrive} - {workingTime[0].live}
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
    </div>
  );
};

export default Calendar;
