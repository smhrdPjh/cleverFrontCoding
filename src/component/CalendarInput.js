import React, { useEffect, useState } from "react";

const CalendarInput = () => {
  const [PlanStartHr, setPlanStartHr] = useState(0);
  const [PlanStartMin, setPlanStartMin] = useState(0);
  const [PlanEndHr, setPlanEndHr] = useState(0);
  const [PlanEndMin, setPlanEndMin] = useState(0);
  const [Worker, setWorker] = useState("");
  const [PlanYear, setPlanYear] = useState(0);
  const [PlanMonth, setPlanMonth] = useState(0);
  const [Day, setDay] = useState([]);
  let checkOn = [];

  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();

  useEffect(() => {
    selectYear();
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
    if (e.target.checked && checkOn.includes(e.target.value) === false) {
      checkOn.push(e.target.value);
    } else if (
      e.target.checked === false &&
      checkOn.includes(e.target.value) === true
    ) {
      for (let i = 0; i < checkOn.length; i++) {
        if (checkOn[i] === e.target.value) {
          checkOn.splice(i, 1);
          i--;
        }
      }
    }
    setDay(checkOn);

    console.log("day는", Day);
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
            요일 : {[Day]}
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
