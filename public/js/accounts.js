// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const accountsTable = document.getElementById("accounts-table");

// Function to add a new account
function addAccount(accountID, name, balance) {
  // Send POST request to /api/accounts
  fetch('/api/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountID: accountID,
      name: name,
      balance: balance
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Add new account to the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${accountID}</td>
      <td>${name}</td>
      <td>${balance}</td>
    `;
    accountsTable.querySelector("tbody").appendChild(newRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  
// Function to edit an existing account
function editAccount(accountID, newName, newBalance) {
  // Send PUT request to /api/accounts
  fetch('/api/accounts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountID: accountID,
      name: newName,
      balance: newBalance
    })
  })
  .then(function(response) {return response.json();})
  .then(function(data) {
    console.log(data);
    // Update the account in the table
    const rows = accountsTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === accountID) {
        if(!(newName == null || newName == undefined || newName == '')) row.children[1].textContent = newName;
        if(!(newBalance == null || newBalance == undefined || newBalance == '')) row.children[2].textContent = newBalance;
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// Function to delete an account
function deleteAccount(accountID) {
  // Send DELETE request to /api/accounts
  fetch('/api/accounts', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountID: accountID
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Remove the account from the table
    const rows = accountsTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === accountID) {
        row.remove();
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Add account form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const accountID = addForm["accountID"].value;
  const name = addForm["name"].value;
  const balance = addForm["balance"].value;

  addAccount(accountID, name, balance);

  // Reset the form
  addForm.reset();
});


// Edit account form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const accountID = editForm["accountID"].value;
  const newName = editForm["name"].value;
  const newBalance = editForm["balance"].value;

  editAccount(accountID, newName, newBalance);

  // Reset the form
  editForm.reset();
});

// Delete account form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const accountID = deleteForm["accountID"].value;

  deleteAccount(accountID);

  // Reset the form
  deleteForm.reset();
});
