/*
* Component: TransactionsPage
* Description:
*   Fetches and displays the transactions from the `/api/transactions` endpoint.
*   Interacts with the TransactionsForm component (`../forms/TransactionsForm.jsx`)
*   for updating the Transactions table in the database.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsForm from '../forms/TransactionsForm';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.log("Error fetching transactions", error);
            }
        }
        fetchTransactions();
    }, []);

    return (
        <div>
            <h1 className="title">Transactions</h1>
            <table id="transactions-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Timestamp</th>
                        <th>Source ID</th>
                        <th>Destination ID</th>
                        <th>Status ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.transactionID}>
                            <td>{transaction.transactionID}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.tstamp}</td>
                            <td>{transaction.sourceID}</td>
                            <td>{transaction.destID}</td>
                            <td>{transaction.statusID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TransactionsForm transactions={transactions} onTransactionsChange={setTransactions} />
            {/* The TransactionsForm component is rendered here and is given the necessary props */}
        </div>
    );
};

export default TransactionsPage;
