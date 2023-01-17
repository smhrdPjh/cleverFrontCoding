import "./App.css";

import Calendar from "./component/Calendar";
import CalendarInput from "./component/CalendarInput";

import { Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Link to={"/calendarInput"}><button>스케줄 입력</button></Link>
    <Link to={"/calendar"}><button>캘린더보기</button></Link>

      <Routes>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/calendarInput" element={<CalendarInput/>}></Route>
      </Routes>
    </>
  );
}

export default App;
