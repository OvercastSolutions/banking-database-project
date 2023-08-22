import React from 'react';

const Logout = ({ func }) => {
    return (
        <>
            <button className="logout-button" onClick={func}>Logout</button>
        </>
    );
}

export default Logout;