import Login from "./pages/Login";
import Register from "./pages/Register";
import Journal from "./pages/Journal";
import Home from "./pages/Home";
import JournalEntryPage from "./pages/JournalEntry";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<JournalEntryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
