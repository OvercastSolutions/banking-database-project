// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const certificatesTable = document.getElementById("certificates-table");

// Function to add a new certificate
function addCertificate(certificateID, ownerID, startDate, endDate, amount, rate) {
  // Send POST request to /api/certificates
  fetch('/api/certificates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      certificateID: certificateID,
      ownerID: ownerID,
      startDate: startDate,
      endDate: endDate,
      amount: amount,
      rate: rate
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Add new certificate to the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${data.certificateID}</td>
      <td>${ownerID}</td>
      <td>${startDate}</td>
      <td>${endDate}</td>
      <td>${amount}</td>
      <td>${rate}</td>
    `;
    certificatesTable.querySelector("tbody").appendChild(newRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to edit an existing certificate
function editCertificate(certificateID, newOwnerID, newStartDate, newEndDate, newAmount, newRate) {
  // Send PUT request to /api/certificates
  fetch('/api/certificates', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      certificateID: certificateID,
      ownerID: newOwnerID,
      startDate: newStartDate,
      endDate: newEndDate,
      amount: newAmount,
      rate: newRate
    })
  })
  .then(function(response) {return response.json();})
  .then(function(data) {
    console.log(data);
    // Update the certificate in the table
    const rows = certificatesTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === certificateID) {
        if(!(newOwnerID == null || newOwnerID == undefined || newOwnerID == '')) row.children[1].textContent = newOwnerID;
        if(!(newStartDate == null || newStartDate == undefined || newStartDate == '')) row.children[2].textContent = newStartDate;
        if(!(newEndDate == null || newEndDate == undefined || newEndDate == '')) row.children[3].textContent = newEndDate;
        if(!(newAmount == null || newAmount == undefined || newAmount == '')) row.children[4].textContent = newAmount;
        if(!(newRate == null || newRate == undefined || newRate == '')) row.children[5].textContent = newRate;
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete a certificate
function deleteCertificate(certificateID) {
  // Send DELETE request to /api/certificates
  fetch('/api/certificates', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({certificateID: certificateID})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Delete the certificate from the table
    const rows = certificatesTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === certificateID) {
        row.remove();
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Add certificate form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const certificateID = addForm["certificateID"].value;
  const ownerID = addForm["ownerID"].value;
  const startDate = addForm["startDate"].value;
  const endDate = addForm["endDate"].value;
  const amount = addForm["amount"].value;
  const rate = addForm["rate"].value;

  addCertificate(certificateID, ownerID, startDate, endDate, amount, rate);

  // Reset the form
  addForm.reset();
});

// Edit certificate form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const certificateID = editForm["certificateID"].value;
  const newOwnerID = editForm["ownerID"].value;
  const newStartDate = editForm["startDate"].value;
  const newEndDate = editForm["endDate"].value;
  const newAmount = editForm["amount"].value;
  const newRate = editForm["rate"].value;

  editCertificate(certificateID, newOwnerID, newStartDate, newEndDate, newAmount, newRate);

  // Reset the form
  editForm.reset();
});

// Delete certificate form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const certificateID = deleteForm["certificateID"].value;

  deleteCertificate(certificateID);

  // Reset the form
  deleteForm.reset();
});
