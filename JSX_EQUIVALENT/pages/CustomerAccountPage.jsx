/*
* Component: CustomerAccountPage
* Description:
*   Fetches and displays the customer accounts from the `/api/customer_account` endpoint.
*   This is a read-only page and does not interact with any forms for updating tables.
*   
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerAccountsPage = () => {
    const [customerAccounts, setCustomerAccounts] = useState([]);

    useEffect(() => {
        async function fetchCustomerAccounts() {
            try {
                const response = await axios.get('/api/customer_account');
                setCustomerAccounts(response.data);
            } catch (error) {
                console.log("Error fetching customer accounts", error);
            }
        }
        fetchCustomerAccounts();
    }, []);

    return (
        <div>
            <h1 className="title">Customer Accounts</h1>
            <table id="customer-accounts-table">
                <thead>
                    <tr>
                        <th>Junction ID</th>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Account Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {customerAccounts.map(account => (
                        <tr key={account.jxnID}>
                            <td>{account.jxnID}</td>
                            <td>{account.customerID}</td>
                            <td>{account.fname}</td>
                            <td>{account.lname}</td>
                            <td>{account.name}</td>
                            <td>{account.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerAccountsPage;
