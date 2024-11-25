import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<div></div>}>
            {/*nested routes*/}
        </Route>
        <Route
            path='/login'
            element={<Login/>}
        />
        <Route
          path='/register'
          element={<div />}
        />
        <Route
          path='/forgotpassword'
          element={<ForgotPassword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
