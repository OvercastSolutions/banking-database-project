// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const accountsTable = document.getElementById("accounts-table");

// Function to add a new account
function addAccount(accountID, name, balance) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${accountID}</td>
    <td>${name}</td>
    <td>${balance}</td>
  `;

  accountsTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing account
function editAccount(accountID, newName, newBalance) {
  const rows = accountsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === accountID) {
      if (newName) row.children[1].textContent = newName;
      if (newBalance) row.children[2].textContent = newBalance;
      break;
    }
  }
}

// Function to delete an account
function deleteAccount(accountID) {
  const rows = accountsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === accountID) {
      row.remove();
      break;
    }
  }
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
