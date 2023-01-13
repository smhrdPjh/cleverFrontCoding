import React, { useEffect, useState } from "react";

let checkOn = [];
const CalendarInput = () => {
  const [PlanStartHr, setPlanStartHr] = useState(0);
  const [PlanStartMin, setPlanStartMin] = useState(0);
  const [PlanEndHr, setPlanEndHr] = useState(0);
  const [PlanEndMin, setPlanEndMin] = useState(0);
  const [Worker, setWorker] = useState("");
  const [PlanYear, setPlanYear] = useState(0);
  const [PlanMonth, setPlanMonth] = useState(0);
  const [Day, setDay] = useState([]);
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();

  function getDayOfWeek(yyyy, mm) {
    var arrMonthLength = [];
    //특정월의 마지막날        년, 월
    let lastDate = new Date(yyyy, mm, 0).getDate();
    // console.log("마지막날", lastDate);

    var 일;
    var 월;
    var 화;
    var 수;
    var 목;
    var 금;
    var 토;
    var 일1 = [];
    var 월1 = [];
    var 화1 = [];
    var 수1 = [];
    var 목1 = [];
    var 금1 = [];
    var 토1 = [];

    const week = [0, 1, 2, 3, 4, 5, 6];

    var stringYear = String(yyyy);
    var stringMonth = String(mm);
    //특정일자 첫날 요일
    const dayOfWeek =
      week[new Date(stringYear + "-" + stringMonth + "-" + "1").getDay()];
    // console.log("요일",dayOfWeek);

    if (dayOfWeek === 0) {
      일 = 1;
      월 = 2;
      화 = 3;
      수 = 4;
      목 = 5;
      금 = 6;
      토 = 7;
    } else if (dayOfWeek === 1) {
      월 = 1;
      화 = 2;
      수 = 3;
      목 = 4;
      금 = 5;
      토 = 6;
      일 = 7;
    } else if (dayOfWeek === 2) {
      화 = 1;
      수 = 2;
      목 = 3;
      금 = 4;
      토 = 5;
      일 = 6;
      월 = 7;
    } else if (dayOfWeek === 3) {
      수 = 1;
      목 = 2;
      금 = 3;
      토 = 4;
      일 = 5;
      월 = 6;
      화 = 7;
    } else if (dayOfWeek === 4) {
      목 = 1;
      금 = 2;
      토 = 3;
      일 = 4;
      월 = 5;
      화 = 6;
      수 = 7;
    } else if (dayOfWeek === 5) {
      금 = 1;
      토 = 2;
      일 = 3;
      월 = 4;
      화 = 5;
      수 = 6;
      목 = 7;
    } else if (dayOfWeek === 6) {
      토 = 1;
      일 = 2;
      월 = 3;
      화 = 4;
      수 = 5;
      목 = 6;
      금 = 7;
    }

    for (let i = 0; i < lastDate; i += 7) {
      일1.push(일 + i);
      월1.push(월 + i);
      화1.push(화 + i);
      수1.push(수 + i);
      목1.push(목 + i);
      금1.push(금 + i);
      토1.push(토 + i);
    }

    if (일1[일1.length - 1] > lastDate) {
      일1.splice(일1.length - 1);
    }

    if (월1[월1.length - 1] > lastDate) {
      월1.splice(월1.length - 1);
    }
    if (화1[화1.length - 1] > lastDate) {
      화1.splice(화1.length - 1);
    }
    if (수1[수1.length - 1] > lastDate) {
      수1.splice(수1.length - 1);
    }
    if (목1[목1.length - 1] > lastDate) {
      목1.splice(목1.length - 1);
    }
    if (금1[금1.length - 1] > lastDate) {
      금1.splice(금1.length - 1);
    }
    if (토1[토1.length - 1] > lastDate) {
      토1.splice(토1.length - 1);
    }
    // console.log("일요일",일1)
    // console.log("월요일",월1)
    // console.log("화요일",화1)
    // console.log("수요일",수1)
    // console.log("목요일",목1)
    // console.log("금요일",금1)
    // console.log("토요일",토1)
    return dayOfWeek;
  }
  useEffect(() => {
    getDayOfWeek(2022, 11);
  }, []);

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

  // 선택한 요일값을 배열에 넣기
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
            요일 : {checkOn}
            <br />년 : {PlanYear}
            <br />월 : {PlanMonth}
          </p>
        </tr>

        <button>등록하기</button>
      </form>
    </div>
  );
};

export default CalendarInput;
