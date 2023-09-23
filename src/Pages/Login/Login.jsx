import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router';
import { loginSuccess } from '../../store/auth/authActions';

function Login() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
       const res=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}user/login`,formData);
      if(res.status==200){
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('user',JSON.stringify(res.data.user));
        dispatch(loginSuccess({ user:res?.data?.user, token:res.data.token }));
        if(res?.data?.user?.role=='employee'){
            navigate('/emp-dashboard')
        }
        else{
            navigate('/dashboard')
        }
      }
    };
    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                <span>Haven't Registered Yet?<a href='/'>Register</a></span>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
}
export default Login;