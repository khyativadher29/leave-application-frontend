import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function DashBoard() {
    const [leaves, setLeaves] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate()
    console.log('leaves', leaves);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const fetchLeavesData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}leave/getLeaves`);
        setLeaves(result?.data)
    };

    const handleApprove = async (leaveId) => {
        console.log(leaveId)
        const data = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}leave/approveLeave`, { leaveId });
        console.log(data)
        if (data.status == 200) {
            fetchLeavesData();
        }

    }
    useEffect(() => {
        fetchLeavesData();
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
        </div><div>

                <table border="1px solid black">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Is Approve</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves?.map((leave) => (
                            <tr key={leave._id}>
                                <td>{leave.userData?.username}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.isApprove ? 'Approved' : 'Not Approved'}</td>
                                <td><button type='submit' onClick={() => handleApprove(leave._id)}  className={`button-${leave.isApprove ? 'disabled' : 'enabled'}`}>{leave.isApprove ? 'Approved' : 'Approve'}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></>
    )
}


export default DashBoard