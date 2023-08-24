/*
* Component: CertificatesPage
* Description:
*   Fetches and displays the certificates from the `/api/certificates` endpoint.
*   Interacts with the CertificatesForm component (`../forms/CertificatesForm.jsx`)
*   for updating the Certificates table in the database.
*
* External Libraries:
*   Uses axios for API requests. See: https://github.com/axios/axios
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CertificatesForm from '../forms/CertificatesForm';

const CertificatesPage = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        async function fetchCertificates() {
            try {
                const response = await axios.get('/api/certificates');
                setCertificates(response.data);
            } catch (error) {
                console.log("Error fetching certificates", error);
            }
        }
        fetchCertificates();
    }, []);

    return (
        <div>
            <h1 className="title">Certificates</h1>
            <table id="certificates-table">
                <thead>
                    <tr>
                        <th>Certificate ID</th>
                        <th>Owner ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Amount</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map(certificate => (
                        <tr key={certificate.certificateID}>
                            <td>{certificate.certificateID}</td>
                            <td>{certificate.ownerID}</td>
                            <td>{certificate.startDate}</td>
                            <td>{certificate.endDate}</td>
                            <td>{certificate.amount}</td>
                            <td>{certificate.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CertificatesForm certificates={certificates} onCertificatesChange={setCertificates} />
            {/* The CertificatesForm component is rendered here and is given the necessary props */}
        </div>
    );
};

export default CertificatesPage;
