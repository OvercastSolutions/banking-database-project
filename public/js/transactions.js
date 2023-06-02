// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const transactionsTable = document.getElementById("transactions-table");

// Function to add a new transaction
function addTransaction(transactionID, amount, tstamp, sourceID, destID, statusID) {
  // Send POST request to /api/transactions
  fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      transactionID: transactionID,
      amount: amount,
      tstamp: tstamp,
      sourceID: sourceID,
      destID: destID,
      statusID: statusID
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Add new transaction to the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${data.transactionID}</td>
      <td>${amount}</td>
      <td>${tstamp}</td>
      <td>${sourceID}</td>
      <td>${destID}</td>
      <td>${statusID}</td>
    `;
    transactionsTable.querySelector("tbody").appendChild(newRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to edit an existing transaction
function editTransaction(transactionID, newAmount, newTstamp, newSourceID, newDestID, newStatusID) {
  // Send PUT request to /api/transactions
  fetch('/api/transactions', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      transactionID: transactionID,
      amount: newAmount,
      tstamp: newTstamp,
      sourceID: newSourceID,
      destID: newDestID,
      statusID: newStatusID
    })
  })
  .then(function(response) {return response.json();})
  .then(function(data) {
    console.log(data);
    // Update the transaction in the table
    const rows = transactionsTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === transactionID) {
        if(!(newAmount == null || newAmount == undefined || newAmount == '')) row.children[1].textContent = newAmount;
        if(!(newTstamp == null || newTstamp == undefined || newTstamp == '')) row.children[2].textContent = newTstamp;
        if(!(newSourceID == null || newSourceID == undefined || newSourceID == '')) row.children[3].textContent = newSourceID;
        if(!(newDestID == null || newDestID == undefined || newDestID == '')) row.children[4].textContent = newDestID;
        if(!(newStatusID == null || newStatusID == undefined || newStatusID == '')) row.children[5].textContent = newStatusID;
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete a transaction
function deleteTransaction(transactionID) {
  // Send DELETE request to /api/transactions
  fetch('/api/transactions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({transactionID: transactionID})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Delete the transaction from the table
    const rows = transactionsTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === transactionID) {
        row.remove();
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Add transaction form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const transactionID = addForm["transactionID"].value;
  const amount = addForm["amount"].value;
  const tstamp = addForm["tstamp"].value;
  const sourceID = addForm["sourceID"].value;
  const destID = addForm["destID"].value;
  const statusID = addForm["statusID"].value;

  addTransaction(transactionID, amount, tstamp, sourceID, destID, statusID);

  // Reset the form
  addForm.reset();
});

// Edit transaction form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const transactionID = editForm["transactionID"].value;
  const newAmount = editForm["amount"].value;
  const newTstamp = editForm["tstamp"].value;
  const newSourceID = editForm["sourceID"].value;
  const newDestID = editForm["destID"].value;
  const newStatusID = editForm["statusID"].value;

  editTransaction(transactionID, newAmount, newTstamp, newSourceID, newDestID, newStatusID);

  // Reset the form
  editForm.reset();
});

// Delete transaction form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const transactionID = deleteForm["transactionID"].value;

  deleteTransaction(transactionID);

  // Reset the form
  deleteForm.reset();
});
