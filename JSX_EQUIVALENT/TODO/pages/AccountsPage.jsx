/*
* Component: AccountsPage
* Description:
*   This component is responsible for fetching and displaying the 
*   accounts from the API. It connects to the AccountsForm component
*   (`../forms/AccountsForm.jsx`), which is responsible for updating
*   the Accounts table in the database.
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function fetchAccounts() {
            try {
                // Attempt to fetch accounts from the API using axios
                // For axios information see: https://github.com/axios/axios
                const response = await axios.get('/api/accounts');
                setAccounts(response.data);
            } catch (error) {
                console.log("Error fetching accounts", error);
            }
        }
        fetchAccounts();
    }, []);

    return (
        // Populate the table with the accounts
        <div>
            <h1 className="title">Accounts</h1>
            <table id="accounts-table">
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.accountID}>
                            <td>{account.accountID}</td>
                            <td>{account.name}</td>
                            <td>{account.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountsPage;
