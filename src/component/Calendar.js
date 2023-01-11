import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import "../style/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";

const Calendar = () => {
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";

  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  return (
    <div className="calendarContainer">
      <FullCalendar
        dafaultView="dayGriMonth"
        plugins={[daygrid, googleCalendar, interaction]}
        googleCalendarApiKey={apiKey} // apiKey
        locale="ko" //한글 버전
        selectable={true}
        //이벤트
        eventSources={[
          {
            googleCalendarId:
              "ko.south_korea#holiday@group.v.calendar.google.com",
            color: "red",
            textColor: "yellow",
          },
        ]}
        events={[
          { title: "07:00~15:00", date: "2023-01-01" },
          { title: "07:00~15:00", date: "2023-01-02" },
        ]}
        eventClick={function (info) {
          alert(info.date + info.event.title);
          info.el.style.borderColor = "red";
        }}
        dateClick={function (info) {
          alert("떠야함: " + info.dateStr);
        }}
      />
    </div>
  );
};

export default Calendar;
