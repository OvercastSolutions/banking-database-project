/*
* Component: CustomersPage
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
import CustomersForm from '../forms/CustomersForm';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await axios.get('/api/customers');
                setCustomers(response.data);
            } catch (error) {
                console.log("Error fetching customers", error);
            }
        }
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1 className="title">Customers</h1>
            <table id="customers-table">
                <thread>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>SSN</th>
                        <th>Address</th>
                    </tr>
                </thread>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.customerID}>
                            <td>{customer.customerID}</td>
                            <td>{customer.fname}</td>
                            <td>{customer.lname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.ssn}</td>
                            <td>{customer.addr}</td>
                        </tr>
                    ))}
                </tbody>
                <CustomersForm customers={customers} onCustomersChange={setCustomers} />
                {/* The CustomersForm component is rendered here and is given the necessary props */}
            </table>
        </div>
    );
};

export default CustomersPage;
