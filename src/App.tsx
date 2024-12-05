import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import AllNotes from './pages/AllNotes';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { useUserStore } from './stores/UserStore';

function App() {
  const { authInitialized } = useUserStore();

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
          element={<ProtectedRoute replace={false}><Dashboard/></ProtectedRoute>}>
            {/*nested routes*/}
            <Route
              index
              element={<Navigate to="/dashboard/allnotes"/>}
            />
            <Route
              path='/dashboard/allnotes'
              element={<AllNotes/>}
            />
            <Route
              path='/dashboard/archivednotes'
              element={<div>archived</div>}
            />
            <Route
              path='/dashboard/tags'
              element={<div>tags</div>}
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
