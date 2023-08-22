/*
* Component: AccountsPage
* Description:
*   Fetches and displays the accounts from the `/api/accounts` endpoint.
*   Interacts with the AccountsForm component (`../forms/AccountsForm.jsx`)
*   for updating the Accounts table in the database.
*   
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountsForm from '../forms/AccountsForm';

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const response = await axios.get('/api/accounts');
                setAccounts(response.data);
            } catch (error) {
                console.log("Error fetching accounts", error);
            }
        }
        fetchAccounts();
    }, []);

    return (
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
            <AccountsForm accounts={accounts} onAccountsChange={setAccounts} />
            {/* The AccountsForm component is rendered here and is given the necessary props */}
        </div>
    );
};

export default AccountsPage;
