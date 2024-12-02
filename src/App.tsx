import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import SettingsMenu from './components/desktopLayout/SettingsMenu';
import SidebarNav from './components/desktopLayout/SidebarNav';
import AllNotes from './components/AllNotes';
import Note from './components/Note';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';

{/* <Note note={{
            title: "Shopping List",
            tags: ["groceries", "weekly"],
            lastEdited: new Date("2024-11-01"),
            text: "Remember to buy milk, eggs, and bread.",
          }}/> */}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<ProtectedRoute replace={true}><Dashboard/></ProtectedRoute>}>
            {/*nested routes*/}
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
