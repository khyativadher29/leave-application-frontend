import React, { useState } from 'react';
import './Leave.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import {notification} from 'antd';
import { useSelector } from 'react-redux';

function Leave(){
  const tokenData= localStorage.getItem('token');
  const token=tokenData? JSON.parse(tokenData):null
  const user= useSelector((state)=>state.auth.user);
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate =useNavigate();

    const handleBack=()=>{
        navigate('/emp-dashboard')
    };
      const requestData={
        leaveType,
        startDate,endDate,reason
      }
    const handleSubmit = async(e) => {
      e.preventDefault();
        const res=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}leave/addLeave`,requestData,{
          headers:{
              Authorization:`${token}`
            }
        });
        if(res.status==200){
          notification.success({
            description: (
                <h3 style={{ color: "#1677ff", fontWeight: "700", fontSize: "20px" }}>
                    Leave Applied Succesfully
                </h3>
            ),
        });
        setEndDate('');
        setLeaveType('')
        setStartDate('');
        setReason('');
        }

    };
    const handleLogout=()=>{
      localStorage.clear();
      navigate('/')
    }
return(
  <><div className="header">
    <div className="user-info">
      <span>Welcome, {user?.username}</span>
    </div>
    <div className="action-buttons">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div><div className="leave-form-container">
      <h2>Leave Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="leave-type">Leave Type:</label>
          <select
            id="leave-type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="emergency">Emergency Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>

        <button type="submit" onClick={handleBack} className='back-button'>Back</button>
      </form>
    </div></>
)
}

export default Leave;