import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './forms.scss';

function SignupForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordBis, setPasswordBis] = useState("");
    const [registered, setRegistered] = useState(false);

    function submitForm(e) {
        e.preventDefault();

        const fetchOpt = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({name, email, password, passwordBis})
        };

        return fetch('/auth/register', fetchOpt)
                .then(response => response.json())
                .then(message =>  {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setPasswordBis("");
                    if(message.error || message.message.startsWith("User already")) {
                       return console.log('Something failed', message);
                    };
                    return setRegistered(true);
                })
                .catch(error => console.error(error));
    }

    return ( 
        <form className="form-container" onSubmit={submitForm}>
            {/* redirect to home until login page is set up */}
            {registered &&  <Redirect to={{pathname:"/auth/login", state: {type: 'success', message: 'You successfully registered your account!'}}}/>}
            <div className="form-field" >
                <label htmlFor="name">Name:</label>
                <input
                    type="text" 
                    id="name"
                    size="1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="form-field" >
                <label htmlFor="email">Email: </label>
                <input 
                    type="text" 
                    id="email" 
                    size="1"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-field" >
                <label htmlFor="password"> Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    size="1"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-field" >
                <label htmlFor="password-bis"> Confirm Password: </label>
                <input 
                    type="password" 
                    id="password-bis"
                    size="1"
                    value={passwordBis}
                    onChange={e => setPasswordBis(e.target.value)}
                />
            </div>
            <div className="form-field" >
                <input 
                    type="submit"
                    id="submit-btn" 
                    value="REGISTER" 
                    className="info-button"
                />
            </div>
        </form>
    );
};

export default SignupForm;