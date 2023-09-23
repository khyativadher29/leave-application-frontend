import React, { useEffect, useState } from 'react';
import './Employee.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
function EmployeeDashBoard() {
  const user = useSelector((state) => state.auth.user);
  const [leaves,setLeaves]=useState(null)
  console.log('leavesssss00',leaves)
  const navigate = useNavigate('/leave')
  const handleLeaveApply = () => {
    navigate('/leave');
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }
  const fetchLeaves = async () => {
    try {
      const userId = user?._id;
      const data = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}leave/getUserLeave`, { userId })
      if (data.status == 200) {
        setLeaves(data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchLeaves()
  }, [])
  return (
    <><div className="header">
      <div className="user-info">
        <span>Welcome, {user?.username}</span>
      </div>
      <div className="action-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div><div className="dashboard-container">
        <div className="leave-types">
          {leaves?.map((leaveType) => (
            <><div className="leave-box" key={leaveType.leaveType}>
              <h3>{leaveType.leaveType}</h3>
            <p>Total: {leaveType.total}</p>
            <p>Applied: {leaveType.applied}</p>
            <p>Available: {leaveType.available}</p>
            </div>
              </>
          ))}
        </div>
        <button className="apply-leave-button" onClick={handleLeaveApply}>
          Apply Leave
        </button>
      </div></>

  )
}

export default EmployeeDashBoard;