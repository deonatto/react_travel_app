import { Cancel,Room } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import './register.css';
import axios from 'axios';

const Register = ({setShowRegister}) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
    
        try {
            await axios.post("https://travelpinapp.herokuapp.com/api/users/register", newUser);
            setError(false);
            setSuccess(true);
        }catch (err) {
            setError(true);
        }
      };

    return (
        <div className = "registerContainer">
            <div className ="logo">
                <Room/>
                JesusPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type = "text" placeholder = "username" ref={usernameRef}/>
                <input type = "email" placeholder = "email" ref={emailRef}/>
                <input type = "password" placeholder = "password" ref={passwordRef}/>
                <button className = "registerBtn">Register</button>
                
                {success && <span className = "success">Succesfull.You can login now!</span>}
                {error && <span className = "failure">Something went wrong!</span>}
            </form>
            <Cancel className = "registerCancel" onClick = {()=> setShowRegister(false)}/>
        </div>
    )
}

export default Register;
