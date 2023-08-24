/*
* Component: AccountTransactionPage
* Description:
*   Fetches and displays the account transactions from the `/api/account_transaction` endpoint.
*   This is a read-only page and does not interact with any forms for updating tables.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountTransactionPage = () => {
    const [accountTransactions, setAccountTransactions] = useState([]);

    useEffect(() => {
        async function fetchAccountTransactions() {
            try {
                const response = await axios.get('/api/account_transaction');
                setAccountTransactions(response.data);
            } catch (error) {
                console.log("Error fetching account transactions", error);
            }
        }
        fetchAccountTransactions();
    }, []);

    return (
        <div>
            <h1 className="title">Account Transactions</h1>
            <table id="transactions-table">
                <thead>
                    <tr>
                        <th>Junction ID</th>
                        <th>Source ID</th>
                        <th>Source Name</th>
                        <th>Source Balance</th>
                        <th>Destination ID</th>
                        <th>Destination Name</th>
                        <th>Destination Balance</th>
                        <th>Transaction ID</th>
                        <th>Status ID</th>
                    </tr>
                </thead>
                <tbody>
                    {accountTransactions.map(transaction => (
                        <tr key={transaction.jxnID}>
                            <td>{transaction.jxnID}</td>
                            <td>{transaction.sourceID_a}</td>
                            <td>{transaction.name_a}</td>
                            <td>{transaction.balance_a}</td>
                            <td>{transaction.destID_b}</td>
                            <td>{transaction.name_b}</td>
                            <td>{transaction.balance_b}</td>
                            <td>{transaction.transactionID}</td>
                            <td>{transaction.statusID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountTransactionPage;
