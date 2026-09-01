import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import StudyPlan from "./components/pages/StudyPlan";
import Progress from "./components/pages/Progress";
import Timer from "./components/pages/Timer";
import StudyDay from "./components/pages/StudyDay";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/study-plan" element={<StudyPlan />} />

        <Route path="/study-plan/:day" element={<StudyDay />} />

        <Route path="/progress" element={<Progress />} />

        <Route path="/timer" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
