/*
* Component: CustomersForm
* Description:
*   This component is responsible for updating the Customers table in
*   the database. It connects to the CustomersPage component
*   (`../pages/CustomersPage.jsx`), which is responsile for fetching
*   and displaying the customers from the API.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useState } from 'react';
import axios from 'axios';

const CustomersForm = ({ customers, onCustomersChange }) => {
    const [formData, setFormData] = useState({
        id: null,
        fname: "",
        lname: "",
        email: "",
        ssn: "",
        address: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (customer) => {
        setIsEditing(true);
        setFormData(customer);
    };

    const handleDelete = async (customerId) => {
        try {
            await axios.delete(`/api/customers/${customerId}`);
            onCustomersChange(customers.filter(customer => customer.customerID !== customerId));
            alert("Customer deleted successfully!");
        } catch (error) {
            console.log("Error deleting customer", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isEditing) {
            try {
                await axios.put(`/api/customers/${formData.id}`, formData);
                onCustomersChange(customers.map(customer => customer.customerID === formData.id ? formData : customer));
                setIsEditing(false);
                alert("Customer updated successfully!");
            } catch (error) {
                console.log("Error updating customer", error);
            }
        } else {
            try {
                await axios.post('/api/customers', formData);
                onCustomersChange([...customers, formData]);
                alert("Customer added successfully!");
            } catch (error) {
                console.log("Error adding customer", error);
            }
        }
        setFormData({
            id: null,
            fname: "",
            lname: "",
            email: "",
            ssn: "",
            address: ""
        });
    };

    return (

        <div></div>

    );
};

export default CustomersForm;
