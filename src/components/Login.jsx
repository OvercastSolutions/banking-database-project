import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    //TODO: replace with actual safe login logic
    //return {token: `${credentials.username}-${Date.now()}-${credentials.password}`};

    try {
        const resp = await fetch('http://localhost:5043/auth/login', {
            'method': 'POST',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(credentials)
        });

        console.log(resp);

        if (!resp.ok) {
            throw new Error('Login failed'); // Handle error cases
        }

        const data = await resp.json(); // Parse response body as JSON

        if (data && data.token) {
            return {'token': data.token}; // Return the token
        } 
        else {
            throw new Error('Token not found in response');
        }
    }
    catch (error) {
        console.error(error);
    }
  
}


const Login = ({ func }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        func(token);
      }

    return(
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    func: PropTypes.func.isRequired
};

export default Login;