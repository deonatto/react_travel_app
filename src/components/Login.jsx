import { Cancel,Room } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import './login.css';
import axios from 'axios';

const Login = ({setShowLogin, storage, setCurrentUser}) => {

    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
    
        try {
            const res = await axios.post("https://travelpinapp.herokuapp.com/api/users/login", newUser);
            storage.setItem("user",res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);
        }catch (err) {
            setError(true);
        }
      };

    return (
        <div className = "loginContainer">
            <div className ="logo">
                <Room/>
                JesusPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type = "text" placeholder = "username" ref={usernameRef}/>
                <input type = "password" placeholder = "password" ref={passwordRef}/>
                <button className = "loginBtn">Login</button>
                {error && <span className = "failure">Something went wrong!</span>}
            </form>
            <Cancel className = "registerCancel" onClick = {()=> setShowLogin(false)}/>
        </div>
    )
}

export default Login;
