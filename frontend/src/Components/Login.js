import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redfirecvt
            //SAve the authToken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Your are Logged In", "success");
            navigate("/")
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container mt-3">
            <h1>Login to continue to E-Notes</h1>
            <form onSubmit={handleLogin} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mt-3">Email address :</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password : </label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary" typeof='submit' >Login</button>
            </form>
        </div>
        </>
    )
}
