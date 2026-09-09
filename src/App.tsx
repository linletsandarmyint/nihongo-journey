import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import StudyPlan from "./components/pages/StudyPlan";
import Progress from "./components/pages/Progress";
import Timer from "./components/pages/Timer";
import StudyDay from "./components/pages/StudyDay";
import KanjiMaster from "./components/pages/KanjiMaster";
import KanjiChapter from "./components/pages/KanjiChapter";
import SupabaseTest from "./SupabaseTest";
import { AuthProvider } from "./components/context/AuthProvider";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* ==================== */}
          {/* PUBLIC ROUTES */}
          {/* ==================== */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/supabase-test" element={<SupabaseTest />} />

          {/* ==================== */}
          {/* PROTECTED ROUTES */}
          {/* ==================== */}

          <Route element={<ProtectedRoute />}>
            <Route path="/study-plan" element={<StudyPlan />} />

            <Route path="/study-plan/:day" element={<StudyDay />} />

            <Route path="/progress" element={<Progress />} />

            <Route path="/kanji-master" element={<KanjiMaster />} />

            <Route path="/kanji-master/:chapterId" element={<KanjiChapter />} />

            <Route path="/timer" element={<Timer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
