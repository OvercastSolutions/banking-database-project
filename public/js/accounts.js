// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const accountsTable = document.getElementById("accounts-table");

// Function to add a new account
function addAccount(accountID, name, balance) {
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
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to edit an existing account
function editAccount(accountID, newName, newBalance) {
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
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete an account
function deleteAccount(accountID) {
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
  .then(data => console.log(data))
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
