// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const accountTransactionTable = document.getElementById("accounts-table");

// Function to add a new account
function addAccountTransaction(jxnID, accountID, transactionID) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${jxnID}</td>
    <td>${accountID}</td>
    <td>${transactionID}</td>
  `;

  accountsTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing account
function editAccountTransaction(jxnID, accountID, transactionID) {
  const rows = accountsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === jxnID) {
      if (newAccountID) row.children[1].textContent = accountID;
      if (newTransactionID) row.children[2].textContent = transactionID;
      break;
    }
  }
}

// Function to delete an account
function deleteAccountTransaction(jxnID) {
  const rows = accountsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === jxnID) {
      row.remove();
      break;
    }
  }
}

// Add account form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = addForm["jxnID"].value;
  const accountID = addForm["accountID"].value;
  const transactionID = addForm["transactionID"].value;

  addAccountTransaction(jxnID, accountID, transactionID);

  // Reset the form
  addForm.reset();
});

// Edit account form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = addForm["jxnID"].value;
  const accountID = addForm["accountID"].value;
  const transactionID = addForm["transactionID"].value;

  editAccountTransaction(jxnID, accountID, transactionID);

  // Reset the form
  editForm.reset();
});

// Delete account form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = deleteForm["jxnID"].value;

  deleteAccountTransaction(jxnID);

  // Reset the form
  deleteForm.reset();
});
