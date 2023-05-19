// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const certificatesTable = document.getElementById("certificates-table");

// Function to add a new certificate
function addCertificate(certificateID, ownerID, startDate, endDate, amount, rate) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${certificateID}</td>
    <td>${ownerID}</td>
    <td>${startDate}</td>
    <td>${endDate}</td>
    <td>${amount}</td>
    <td>${rate}</td>
  `;

  certificatesTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing certificate
function editCertificate(certificateID, newOwnerID, newStartDate, newEndDate, newAmount, newRate) {
  const rows = certificatesTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === certificateID) {
      if (newOwnerID) row.children[1].textContent = newOwnerID;
      if (newStartDate) row.children[2].textContent = newStartDate;
      if (newEndDate) row.children[3].textContent = newEndDate;
      if (newAmount) row.children[4].textContent = newAmount;
      if (newRate) row.children[5].textContent = newRate;
      break;
    }
  }
}

// Function to delete a certificate
function deleteCertificate(certificateID) {
  const rows = certificatesTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === certificateID) {
      row.remove();
      break;
    }
  }
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
