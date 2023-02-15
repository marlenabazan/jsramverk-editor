import { useState } from 'react';

import authModel from '../models/auth';

export default function Login({ setToken, onLogin, setUserEmail }) {
    const [user, setUser] = useState({});

    function handleChange(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject})
    };

    async function register() {
        const registerResult = await authModel.register(user);

        if (registerResult.data.user) {
            setUser(registerResult.data.user._id);
        }

        const loginResult = await authModel.login(user); 

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            setUserEmail(user.email);
        }
    };

    async function login() {
        const loginResult = await authModel.login(user); 

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            console.log("User: ", user.email);
            onLogin(loginResult.data.token, user.email);
        }
    };

    return (
        <div className="Form-container">
            <div className="Form">
                <h2>Logga in eller registrera</h2>
                <input className="Input" type="email" name="email" placeholder="Email" onChange={handleChange}></input>
  
                <input className="Input" type="password" name="password" placeholder="Lösenord" onChange={handleChange}></input>
                <button className="FormButton" onClick={login}>Logga in</button>
                <button className="FormButton" onClick={register}>Registrera</button>
            </div>
        </div>   
    )
}