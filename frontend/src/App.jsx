import Login from "./pages/Login";
import Register from "./pages/Register";
import Journal from "./pages/Journal";
import Home from "./pages/Home";
import JournalEntryPage from "./pages/JournalEntry";
import Counselor from "./pages/Counselor";
import NewJournalEntry from "./pages/NewJournalEntry";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal/:id"
          element={
            <ProtectedRoute>
              <JournalEntryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/counselor"
          element={
            <ProtectedRoute>
              <Counselor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal/new"
          element={
            <ProtectedRoute>
              <NewJournalEntry />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
