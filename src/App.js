import "./App.css";

import Calendar from "./component/Calendar";
import CalendarInput from "./component/CalendarInput";

import { Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </>
  );
}

export default App;
