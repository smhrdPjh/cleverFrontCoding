import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import "../style/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";

const Calendar = () => {
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const yo = date.getDay();
  const today = year + "-" + month + 1 + "-" + day;

  console.log(yo);
  const [selectedDate, setSelectecDate] = useState(today);

  const workingTime = [{ arrive: "07:00", live: "18:00" }];

  const setSchedul = [
    { title: "07:00~15:00", date: "2023-01-01" },
    { title: "07:00~15:00", date: "2023-01-02" },
    { title: "07:00~15:00", date: "2023-01-03" },
  ];

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
          height={650}
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
          </table>
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
