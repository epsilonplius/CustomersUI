import React from 'react';
import { removeUserSession } from '../Utils/Common';
import { useHistory  } from "react-router-dom";

function LogoutBtn(props) {
    const history = useHistory();
    const handleLogout = () => {
        removeUserSession();
        history.push('/login');
    };

    return (
        <button className="w3-btn w3-red" onClick={handleLogout}><i className="fa fa-sign-out"></i></button>
    )
}

export default LogoutBtn;