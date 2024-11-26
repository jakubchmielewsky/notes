import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import SidebarNav from './components/SidebarNav';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<SidebarNav tags={["Cooking","Dev","Fitness","Health"]}/>}>
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
