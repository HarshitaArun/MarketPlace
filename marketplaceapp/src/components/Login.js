import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Style/Login.css';

const Login = () => {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/login", { email, password })
                .then(res => {
                    if (res.data === "exist") {
                        history("/home", { state: { id: email } });
                    } else if (res.data === "not exist") {
                        setErrorMessage("Incorrect username/password");
                    }
                })
                .catch(e => {
                    setErrorMessage("Incorrect username/password");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login">
            <h1>Login here</h1>

            <form onSubmit={submit}>
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
                <input type="submit" value="Login" />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup">Signup here</Link>
        </div>
    );
}

export default Login;
