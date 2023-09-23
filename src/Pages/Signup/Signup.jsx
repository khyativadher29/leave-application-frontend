import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import { notification } from 'antd';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'employee',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}user/createUser`, formData);
        if (response.status == 200) {
            notification.success({
                description: (
                    <h3 style={{ color: "#1677ff", fontWeight: "700", fontSize: "20px" }}>
                        Register Succesfully
                    </h3>
                ),
            });
            navigate('/login')

        }
    };
    return (
        <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
                <span>Already Registered? <a href='/login'>Login</a></span>
            </form>
        </div>

    )
}

export default Signup