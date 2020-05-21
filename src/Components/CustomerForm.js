import React from 'react';

function CustomerForm(props) {
    return(
        <div className="w3-card-4">
            <header className = "w3-container">New customer</header>
            <label for="customerName">Name</label>
            <input type="text" name="customerName" className="w3-input" />
        </div>
    );
}

export default CustomerForm;