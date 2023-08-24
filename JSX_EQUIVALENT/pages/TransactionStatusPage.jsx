/*
* Component: TransactionStatusPage
* Description:
*   Fetches and displays the transaction statuses from the `/api/transactionStatuses` endpoint.
*   Interacts with the TransactionStatusForm component (`../forms/TransactionStatusForm.jsx`)
*   for updating the TransactionStatuses table in the database.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionStatusForm from '../forms/TransactionStatusForm';

const TransactionStatusPage = () => {
    const [transactionStatuses, setTransactionStatuses] = useState([]);

    useEffect(() => {
        async function fetchTransactionStatuses() {
            try {
                const response = await axios.get('/api/transactionStatuses');
                setTransactionStatuses(response.data);
            } catch (error) {
                console.log("Error fetching transaction statuses", error);
            }
        }
        fetchTransactionStatuses();
    }, []);

    return (
        <div>
            <h1 className="title">Transaction Statuses</h1>
            <table id="transaction-statuses-table">
                <thead>
                    <tr>
                        <th>Status ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionStatuses.map(transactionStatus => (
                        <tr key={transactionStatus.statusID}>
                            <td>{transactionStatus.statusID}</td>
                            <td>{transactionStatus.name}</td>
                            <td>{transactionStatus.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TransactionStatusForm transactionStatuses={transactionStatuses} onTransactionStatusesChange={setTransactionStatuses} />
            {/* The TransactionStatusForm component is rendered here and is given the necessary props */}
        </div>
    );
};

export default TransactionStatusPage;
