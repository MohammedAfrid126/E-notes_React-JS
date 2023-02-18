import React from 'react'
import {Link,useLocation, useNavigate} from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">E-notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <Link className={`nav-link ${location.pathname ==="/"?"active":""}`} aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname ==="/about"?"active":""}`} to="/about">About</Link></li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn mx-1" style={{backgroundColor : "#0b5ed7",color : "white"}} to="/login" role="button">Login</Link>
                        <Link className="btn mx-1" style={{backgroundColor : "#0b5ed7",color : "white"}} to="/signup" role="button">Sign Up</Link>
                        </form>:<button className='btn' style={{backgroundColor : "#0b5ed7",color : "white"}} onClick={handleLogOut}>Log out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
