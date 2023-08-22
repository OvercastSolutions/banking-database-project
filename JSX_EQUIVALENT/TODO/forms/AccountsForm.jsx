/*
* Component: AccountsForm
* Description:
*   This component is responsible for updating the Accounts table in
*   the database. It connects to the AccountsPage component
*   (`../pages/AccountsPage.jsx`), which is responsible for fetching
*   and displaying the accounts from the API.
*/

import React, { useState } from 'react';
import axios from 'axios';

const AccountsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        balance: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Attempt to add an account to the database using axios
            // For axios information see: https://github.com/axios/axios
            await axios.post('/api/accounts', formData);
            alert("Account added successfully!");
        } catch (error) {
            console.log("Error adding account", error);
        }
    };

    return (
        // Create a form to add an account to the database
        <div>
            <h2>Add Account</h2>
            <form id="add-account-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name-field"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="balance">Balance:</label>
                <input
                    type="number"
                    id="balance-field"
                    name="balance"
                    required
                    value={formData.balance}
                    onChange={handleChange}
                />
                <button type="submit" id="add-confirm-button" value="Submit">Add Account</button>
            </form>
            {/* fields for editing and deleting accounts go here */}
        </div>
    );
};

export default AccountsForm;
