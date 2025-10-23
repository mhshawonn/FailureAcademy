import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import ExamsPage from './pages/ExamsPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import DoubtPage from './pages/DoubtPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminToolsPage from './pages/AdminToolsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="min-h-screen bg-midnight text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/doubts" element={<DoubtPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminToolsPage />} />
          </Route>
          <Route path="/youtube" element={<Navigate to="https://www.youtube.com/@academyfailure" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
