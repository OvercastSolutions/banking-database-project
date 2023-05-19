// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const transactionsTable = document.getElementById("transactions-table");

// Function to add a new transaction
function addTransaction(transactionID, amount, tstamp, sourceID, destID, statusID) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${transactionID}</td>
    <td>${amount}</td>
    <td>${tstamp}</td>
    <td>${sourceID}</td>
    <td>${destID}</td>
    <td>${statusID}</td>
  `;

  transactionsTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing transaction
function editTransaction(transactionID, newAmount, newTstamp, newSourceID, newDestID, newStatusID) {
  const rows = transactionsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === transactionID) {
      if (newAmount) row.children[1].textContent = newAmount;
      if (newTstamp) row.children[2].textContent = newTstamp;
      if (newSourceID) row.children[3].textContent = newSourceID;
      if (newDestID) row.children[4].textContent = newDestID;
      if (newStatusID) row.children[5].textContent = newStatusID;
      break;
    }
  }
}

// Function to delete a transaction
function deleteTransaction(transactionID) {
  const rows = transactionsTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === transactionID) {
      row.remove();
      break;
    }
  }
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
