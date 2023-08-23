/*
* Component: AccountsForm
* Description:
*   This component is responsible for updating the Accounts table in
*   the database. It connects to the AccountsPage component
*   (`../pages/AccountsPage.jsx`), which is responsible for fetching
*   and displaying the accounts from the API.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useState } from 'react';
import axios from 'axios';

const AccountsForm = ({ accounts, onAccountsChange }) => {
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        balance: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (account) => {
        setIsEditing(true);
        setFormData(account);
    };

    const handleDelete = async (accountId) => {
        try {
            await axios.delete(`/api/accounts/${accountId}`);
            onAccountsChange(accounts.filter(account => account.accountID !== accountId));
            alert("Account deleted successfully!");
        } catch (error) {
            console.log("Error deleting account", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isEditing) {
            try {
                await axios.put(`/api/accounts/${formData.id}`, formData);
                onAccountsChange(accounts.map(account => account.accountID === formData.id ? formData : account));
                setIsEditing(false);
                alert("Account updated successfully!");
            } catch (error) {
                console.log("Error updating account", error);
            }
        } else {
            try {
                await axios.post('/api/accounts', formData);
                onAccountsChange([...accounts, formData]);
                alert("Account added successfully!");
            } catch (error) {
                console.log("Error adding account", error);
            }
        }
        setFormData({
            id: null,
            name: "",
            balance: ""
        });
    };

    return (
        <div>
            <h2>{isEditing ? "Edit" : "Add"} Account</h2>
            <form id="account-form" onSubmit={handleSubmit}>
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
                <button type="submit" id="confirm-button">
                    {isEditing ? "Update" : "Add"} Account
                </button>
            </form>
            <div>
                {accounts.map(account => (
                    <div key={account.accountID}>
                        <span>{account.name} - ${account.balance}</span>
                        <button onClick={() => handleEdit(account)}>Edit</button>
                        <button onClick={() => handleDelete(account.accountID)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountsForm;
