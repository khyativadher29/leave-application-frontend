import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { useEffect } from 'react';
import { loginSuccess } from './store/auth/authActions';
import EmployeeDashBoard from './Pages/EmployeeDashboard/EmployeeDashboard';
import DashBoard from './Pages/Dashboard/Dashboard';
import Leave from './Pages/Leave/Leave';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.token != null);
  const userRole= useSelector((state)=>state.auth.user)
  console.log(userRole,"+++++")
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userData= localStorage.getItem('user');
    const user=userData?JSON.parse(userData):null
    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    }
  },[dispatch])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}/>
        {isAuthenticated && userRole?.role === 'employee' && (
            <><Route path="/emp-dashboard" element={<EmployeeDashBoard />} /><Route path='leave' element={<Leave/>}></Route></>
          )}
         {isAuthenticated && userRole?.role === 'manager' && (
            <Route path="/dashboard" element={<DashBoard />} />
          )}
      </Routes>
    </Router>
  );
}

export default App;
