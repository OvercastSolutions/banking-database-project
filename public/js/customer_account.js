// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const customerAccountTable = document.getElementById("customer-account-table");

// Function to add a new customer account association
function addCustomerAccount(jxnID, customerID, accountID) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${jxnID}</td>
    <td>${customerID}</td>
    <td>${accountID}</td>
  `;

  customerAccountTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing customer account association
function editCustomerAccount(jxnID, newCustomerID, newAccountID) {
  const rows = customerAccountTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === jxnID) {
      if (newCustomerID) row.children[1].textContent = newCustomerID;
      if (newAccountID) row.children[2].textContent = newAccountID;
      break;
    }
  }
}

// Function to delete a customer account association
function deleteCustomerAccount(jxnID) {
  const rows = customerAccountTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === jxnID) {
      row.remove();
      break;
    }
  }
}

// Add customer account association form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = addForm["jxnID"].value;
  const customerID = addForm["customerID"].value;
  const accountID = addForm["accountID"].value;

  addCustomerAccount(jxnID, customerID, accountID);

  // Reset the form
  addForm.reset();
});

// Edit customer account association form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = editForm["jxnID"].value;
  const newCustomerID = editForm["customerID"].value;
  const newAccountID = editForm["accountID"].value;

  editCustomerAccount(jxnID, newCustomerID, newAccountID);

  // Reset the form
  editForm.reset();
});

// Delete customer account association form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jxnID = deleteForm["jxnID"].value;

  deleteCustomerAccount(jxnID);

  // Reset the form
  deleteForm.reset();
});
