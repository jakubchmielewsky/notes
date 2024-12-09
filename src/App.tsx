import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import Notes from './pages/desktop/Notes';
import ProtectedRoute from './routes/ProtectedRoute';
import { useUserStore } from './stores/UserStore';
import { useEffect, useState } from 'react';
import { useNotesStore } from './stores/NotesStore';
import DesktopDashboard from './pages/desktop/DesktopDashboard';

function App() {
  const { authInitialized } = useUserStore();
  const { currentUser } = useUserStore();
  const { getNotes, unsubscribeNotes} = useNotesStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);


  useEffect(() => {
    if (currentUser) {
      getNotes();
    }

    return () => {
      if (unsubscribeNotes) unsubscribeNotes();
    };

  // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 900);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  





  if (!authInitialized) {
      return <div className='text-center'>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route
              index
              element={<Navigate to="/dashboard"/>}
        />
        <Route
          path='/dashboard'
          element={<ProtectedRoute replace={false}>{isMobile?null:<DesktopDashboard/>}</ProtectedRoute>}>
            {/*nested routes*/}
            <Route
              index
              element={<Navigate to="/dashboard/notes"/>}
            />
            <Route
              path='/dashboard/notes'
              element={<Notes/>}
            />
            <Route
              path='/dashboard/settings'
              element={<div>settings</div>}
            />
        </Route>
        <Route
            path='/login'
            element={<Login/>}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/forgotpassword'
          element={<ForgotPassword />}
        />
        <Route
          path='/resetpassword'
          element={<ResetPassword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
