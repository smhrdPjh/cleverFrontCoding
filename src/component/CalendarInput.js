import React, { useEffect, useState } from "react";

let checkOn = [];
const CalendarInput = () => {
  const [PlanStartHr, setPlanStartHr] = useState(0);
  const [PlanStartMin, setPlanStartMin] = useState(0);
  const [PlanEndHr, setPlanEndHr] = useState(0);
  const [PlanEndMin, setPlanEndMin] = useState(0);
  const [Worker, setWorker] = useState("직원을선택 해주세요.");
  const [PlanYear, setPlanYear] = useState(2023);
  const [PlanMonth, setPlanMonth] = useState(2);
  const [Day, setDay] = useState([]);
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();

  const getDayOfWeek = (yyyy, mm, arrChoiceDay) => {
    console.log("요일", [arrChoiceDay]);
    //특정date1의 마지막날        년, date1
    let lastDate = new Date(yyyy, mm, 0).getDate();

    var date0;
    var date1;
    var date2;
    var date3;
    var date4;
    var date5;
    var date6;
    var arrDate0 = [];
    var arrDate1 = [];
    var arrDate2 = [];
    var arrDate3 = [];
    var arrDate4 = [];
    var arrDate5 = [];
    var arrDate6 = [];

    const week = [0, 1, 2, 3, 4, 5, 6];

    var stringYear = String(yyyy);
    var stringMonth = String(mm);

    const dayOfWeek =
      week[new Date(stringYear + "-" + stringMonth + "-" + "1").getDay()];

    if (dayOfWeek === 0) {
      date0 = 1;
      date1 = 2;
      date2 = 3;
      date3 = 4;
      date4 = 5;
      date5 = 6;
      date6 = 7;
    } else if (dayOfWeek === 1) {
      date1 = 1;
      date2 = 2;
      date3 = 3;
      date4 = 4;
      date5 = 5;
      date6 = 6;
      date0 = 7;
    } else if (dayOfWeek === 2) {
      date2 = 1;
      date3 = 2;
      date4 = 3;
      date5 = 4;
      date6 = 5;
      date0 = 6;
      date1 = 7;
    } else if (dayOfWeek === 3) {
      date3 = 1;
      date4 = 2;
      date5 = 3;
      date6 = 4;
      date0 = 5;
      date1 = 6;
      date2 = 7;
    } else if (dayOfWeek === 4) {
      date4 = 1;
      date5 = 2;
      date6 = 3;
      date0 = 4;
      date1 = 5;
      date2 = 6;
      date3 = 7;
    } else if (dayOfWeek === 5) {
      date5 = 1;
      date6 = 2;
      date0 = 3;
      date1 = 4;
      date2 = 5;
      date3 = 6;
      date4 = 7;
    } else if (dayOfWeek === 6) {
      date6 = 1;
      date0 = 2;
      date1 = 3;
      date2 = 4;
      date3 = 5;
      date4 = 6;
      date5 = 7;
    }

    for (let i = 0; i < lastDate; i += 7) {
      arrDate0.push(date0 + i);
      arrDate1.push(date1 + i);
      arrDate2.push(date2 + i);
      arrDate3.push(date3 + i);
      arrDate4.push(date4 + i);
      arrDate5.push(date5 + i);
      arrDate6.push(date6 + i);
    }

    if (arrDate0[arrDate0.length - 1] > lastDate) {
      arrDate0.splice(arrDate0.length - 1);
    }

    if (arrDate1[arrDate1.length - 1] > lastDate) {
      arrDate1.splice(arrDate1.length - 1);
    }
    if (arrDate2[arrDate2.length - 1] > lastDate) {
      arrDate2.splice(arrDate2.length - 1);
    }
    if (arrDate3[arrDate3.length - 1] > lastDate) {
      arrDate3.splice(arrDate3.length - 1);
    }
    if (arrDate4[arrDate4.length - 1] > lastDate) {
      arrDate4.splice(arrDate4.length - 1);
    }
    if (arrDate5[arrDate5.length - 1] > lastDate) {
      arrDate5.splice(arrDate5.length - 1);
    }
    if (arrDate6[arrDate6.length - 1] > lastDate) {
      arrDate6.splice(arrDate6.length - 1);
    }

    var sequenceDay = [
      arrDate0,
      arrDate1,
      arrDate2,
      arrDate3,
      arrDate4,
      arrDate5,
      arrDate6,
    ];
    var selectedDate = [];
    for (var i = 0; i < arrChoiceDay.length; i++) {
      for (var j = 0; j < 7; j++) {
        if (Number(arrChoiceDay[i]) === j) {
          for (var k = 0; k < sequenceDay[j].length; k++) {
            selectedDate.push(sequenceDay[j][k]);
          }
        }
      }
    }

    console.log("최종날짜", selectedDate);

    console.log("일요일", arrDate0);
    console.log("월요일", arrDate1);
    console.log("화요일", arrDate2);
    console.log("수요일", arrDate3);
    console.log("목요일", arrDate4);
    console.log("금요일", arrDate5);
    console.log("토요일", arrDate6);
    return dayOfWeek;
  };

  //임시용 나중에 back에서 받아올예정
  const workerList = [
    { 0: "박진형" },
    { 1: "임아해" },
    { 2: "나소연" },
    { 3: "박형주" },
  ];

  const workerListRendering = () => {
    const arrWorker = [];
    for (let i = 0; i < workerList.length; i++) {
      arrWorker.push(
        <option value={Object.keys(workerList[i]).value}>
          {workerList[i][i]}
        </option>
      );
    }
    return arrWorker;
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

  const planYear = (e) => {
    setPlanYear(e.target.value);
  };
  const planMonth = (e) => {
    setPlanMonth(e.target.value);
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
  const worker = (e) => {
    setWorker(e.target.value);
  };

  // 선택한 요일값 setDay하기
  const day = (e) => {
    if (e.target.checked && !checkOn.includes(e.target.value)) {
      checkOn.push(e.target.value);
    } else if (!e.target.checked && checkOn.includes(e.target.value)) {
      for (let i = 0; i < checkOn.length; i++) {
        if (checkOn[i] === e.target.value) {
          checkOn.splice(i, 1);
          i--;
        }
      }
    }
    setDay([...checkOn]);
    // ...: 스프레드 문법
    console.log(" 체크온 :", checkOn);
  };

  const checkBoxDay = () => {
    const arrDay = ["일", "월", "화", "수", "목", "금", "토"];
    let arrDays = arrDay.map((item, index) => {
      return (
        <>
          {item}
          <input
            key={index}
            onChange={day}
            type="checkbox"
            name="days"
            value={index}
          />
        </>
      );
    });
    return arrDays;
  };
  const selectYear = () => {
    const arrYear = [];
    for (var i = 0; i < 11; i++) {
      arrYear.push(year + i);
    }
    let arrYears = arrYear.map((item, index) => {
      return (
        <>
          {item}
          <option key={index} value={item}>
            {item}년
          </option>
        </>
      );
    });

    return arrYears;
  };

  const selectMonth = () => {
    const arrMonth = [];
    for (var i = 1; i < 13; i++) {
      arrMonth.push(i);
    }
    let optionMonth = arrMonth.map((item, index) => {
      return (
        <>
          {item}
          <option key={index} value={item}>
            {item}월
          </option>
        </>
      );
    });
    return optionMonth;
  };

  return (
    <div>
      <form>
        {checkBoxDay()}
        <tr>
          <select onChange={planYear} value={PlanYear}>
            {selectYear()}
          </select>
          <select onChange={planMonth} value={PlanMonth}>
            {selectMonth()}
          </select>
        </tr>

        <tr>
          <td>
            근무자 :{" "}
            <select onChange={worker} value={Worker}>
              {workerListRendering()}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            근무시간 :{" "}
            <select onChange={planStartHr} value={PlanStartHr}>
              {hrListRendering()}
            </select>{" "}
            :시{" "}
            <select onChange={planStartMin} value={PlanStartMin}>
              {minitListRendering()}
            </select>{" "}
            :분 -
            <select onChange={planEndHr} value={PlanEndHr}>
              {" "}
              {hrListRendering()}
            </select>{" "}
            :시 -{" "}
            <select onChange={planEndMin} value={PlanEndMin}>
              {minitListRendering()}
            </select>{" "}
            :분{" "}
          </td>

          <p>
            직원: {Worker}
            <br />
            출근 시: {PlanStartHr}
            <br />
            출근 분: {PlanStartMin}
            <br />
            퇴근 시: {PlanEndHr}
            <br />
            퇴근 분: {PlanEndMin}
            <br />
            요일 : {Day}
            <br />년 : {PlanYear}
            <br />월 : {PlanMonth}
          </p>
        </tr>

        <button onClick={getDayOfWeek(PlanYear, PlanMonth, Day)}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default CalendarInput;
