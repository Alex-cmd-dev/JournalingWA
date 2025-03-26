import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
