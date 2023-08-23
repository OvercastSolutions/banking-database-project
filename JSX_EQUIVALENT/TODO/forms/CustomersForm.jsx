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

import React, { useState }, from 'react';
import axios from 'axios';

const CustomersForm = ({ accounts, onAccountsChange }) => {
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

    