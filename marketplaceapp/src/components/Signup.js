import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Style/Signup.css';  

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userExist, setUserExist] = useState('');
    const history = useNavigate();

    async function submit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:8000/signup", { name, email, password, dob })
                .then(res => {
                    if (res.data === "exist") {
                        setUserExist("User already exists");
                    } else if (res.data === "not exist") {
                        history("/");
                    }
                })
                .catch(e => {
                    setErrorMessage("An error occurred");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="signup">
            <h1>Register here</h1>

            <form onSubmit={submit}>
                <input 
                    type="text" 
                    onChange={(e) => { setName(e.target.value) }} 
                    placeholder="Your Name" 
                    required 
                />
                <input 
                    type="email" 
                    onChange={(e) => { setEmail(e.target.value) }} 
                    placeholder="Your Email" 
                    required 
                />
                <input 
                    type="password" 
                    onChange={(e) => { setPassword(e.target.value) }} 
                    placeholder="Your Password" 
                    required 
                />
                <input 
                    type="password" 
                    onChange={(e) => { setConfirmPassword(e.target.value) }} 
                    placeholder="Confirm Password" 
                    required 
                />
                {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
                <input 
                    type="date" 
                    onChange={(e) => { setDob(e.target.value) }} 
                    placeholder="Your Date of Birth" 
                    required 
                />
                {userExist && <p style={{ color: 'red' }}>{userExist}</p>}
                <input type="submit" value="Sign Up" />
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/">Login Page</Link>
        </div>
    );
}

export default Signup;