import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    //TODO: replace with actual safe login logic
    return {token: `${credentials.username}-${Date.now()}-${credentials.password}`};
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