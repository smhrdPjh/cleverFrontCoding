import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState, useRef } from "react";
import "../style/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
var countNum = 0;
var totalList = [];
for (var i = 0; i < 10; i++) {
  totalList.push([
    {
      workerName: "",
      startHr: "",
      startMin: "",
      endHr: "",
      endMin: "",
    },
  ]);
}

var thisDayList = [
  {
    workerName: "박진형",
    startHr: "16",
    startMin: "10",
    endHr: "21",
    endMin: "10",
  },
  {
    workerName: "박형주",
    startHr: "09",
    startMin: "10",
    endHr: "16",
    endMin: "10",
  },
  {
    workerName: "나소연",
    startHr: "21",
    startMin: "10",
    endHr: "04",
    endMin: "10",
  },
];
const Calendar = () => {
  const [PlanStartHr, setPlanStartHr] = useState(0);
  const [PlanStartMin, setPlanStartMin] = useState(0);
  const [PlanEndHr, setPlanEndHr] = useState(0);
  const [PlanEndMin, setPlanEndMin] = useState(0);
  const [Worker, setWorker] = useState("선택");
  const [thisDayList2, setThisDayList2] = useState([]);
  const [arrAddListState, setArrAddListState] = [];
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = year + "-" + month + 1 + "-" + day;
  var arrAddList = [];
  var countNumRef = useRef(0);

  const [addCount, setAddCount] = useState(0);

  const [selectedDate, setSelectecDate] = useState(today);

  const workingTime = [{ arrive: "07:00", live: "18:00" }];

  const setSchedul = [
    { title: "07:00~15:00", date: "2023-01-01" },
    { title: "07:00~15:00", date: "2023-01-02" },
    { title: "07:00~15:00", date: "2023-01-03" },
  ];
  var workerList = [
    {
      workerName: "박진형",
      startHr: "16",
      startMin: "10",
      endHr: "21",
      endMin: "10",
    },
    {
      workerName: "박형주",
      startHr: "09",
      startMin: "10",
      endHr: "16",
      endMin: "10",
    },
    {
      workerName: "나소연",
      startHr: "21",
      startMin: "10",
      endHr: "04",
      endMin: "10",
    },
    {
      workerName: "임아해",
      startHr: "04",
      startMin: "10",
      endHr: "09",
      endMin: "10",
    },
  ];
  const worker = (e) => {
    setWorker(e.target.value);
  };
  const planStartHr = (e) => {
    setPlanStartHr(e.target.value);
  };
  const planStartMin = (e) => {
    setPlanStartMin(e.target.value);
  };
  const planEndHr = (e) => {
    setPlanEndHr(e.target.value);
  };
  const planEndMin = (e) => {
    setPlanEndMin(e.target.value);
  };

  const hrListRendering = () => {
    const arrHr = [];
    for (let i = 0; i < 24; i++) {
      arrHr.push(<option value={i}>{i}</option>);
    }

    return arrHr;
  };

  const minitListRendering = () => {
    let sum = 0;
    const arrMinit = [];
    for (let i = 0; i < 51; i += 10) {
      arrMinit.push(<option value={i}>{i}</option>);
    }
    return arrMinit;
  };

  const workerListRendering = () => {
    var result = workerList.map((item, index) => {
      console.log("렌더링", index);
      return <option key={index}>{item.workerName}</option>;
    });
    return result;
  };

  const todayWorkerRendering = () => {
    var result = thisDayList.map((item, index) => {
      return <option key={index}>{item.workerName}</option>;
    });
    return result;
  };

  const planModification = () => {
    var result = thisDayList.map((item, index) => {
      return (
        <tr>
          <select onChange={worker} defaultValue={item.workerName}>
            {todayWorkerRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startHr + ":" + item.startMin}
          />
          ~
          <input type="time" defaultValue={item.endHr + ":" + item.endMin} />
          <button
            onClick={() => {
              deleteList(index);
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
    console.log("addcount", addCount);
    for (var i = 0; i < addCount; i++) {
      arrAddList.push([
        {
          workerName: "",
          startHr: "",
          startMin: "",
          endHr: "",
          endMin: "",
        },
      ]);
    }
    console.log("리스트", arrAddList);

    let result = arrAddList.map((item, index) => {
      return (
        <tr>
          <select
            key={index}
            onChange={(e) => {
              totalList[index].workerName = e.target.value;
            }}
          >
            {workerListRendering()}
          </select>
          <input
            key={index}
            type="time"
            onChange={(e) => {
              totalList[index].startHr = e.target.value;
            }}
          />
          ~
          <input
            key={index}
            type="time"
            onChange={(e) => {
              totalList[index].endHr = e.target.value;
            }}
          />
          {console.log("결과", totalList)}
          <button
            onClick={() => {
              totalList.splice(index, 1);
              arrAddList.splice(index, 1);
              countNumRef.current -= 1;
              setAddCount(countNumRef.current);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });
    return result;
  };

  const deleteList = (e) => {
    thisDayList.splice(e, 1);
    console.log("삭제" + e);
    console.log("삭제후 리스트", thisDayList);
    setThisDayList2([...thisDayList]);
  };

  const submitModification = () => {};

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
              console.log("ref", countNumRef.current);
              countNumRef.current += 1;

              setAddCount(countNumRef.current);
            }}
          >
            +추가
          </button>

          <input
            type="submit"
            name="등록"
            value="등록"
            onClick={submitModification()}
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
