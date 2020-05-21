import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
    setLoading(true);
    axios.post('http://localhost:5000/api/Login?username='+username.value+'&password='+password.value, { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token);
      props.history.push('/customers');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    }

    return (
        <div className="w3-card-4 w3-display-middle w3-third">
            <header className="w3-container">
                <h3>Login</h3>
            </header>

            <div className="w3-container">
                <label className="w3-text-blue"><b>Username</b></label>
                <input className="w3-input" type="text" {...username} autoComplete="new-password" />
                <label className="w3-text-blue"><b>Password</b></label>
                <input className="w3-input" type="password" {...password} autoComplete="new-password" />

                {error && <><small style={{ color: 'red' }}>{error}</small></>}
                <button className="w3-btn w3-blue" onClick={handleLogin} disabled={loading} >{loading ? 'Loading...' : 'Login'}</button>
            </div>

        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;