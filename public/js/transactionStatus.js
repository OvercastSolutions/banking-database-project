// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const statusTable = document.getElementById("status-table");

// Function to add a new transaction status
function addStatus(statusID, name, description) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${statusID}</td>
    <td>${name}</td>
    <td>${description}</td>
  `;

  statusTable.querySelector("tbody").appendChild(newRow);
}

// Function to edit an existing transaction status
function editStatus(statusID, newName, newDescription) {
  const rows = statusTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === statusID) {
      if (newName) row.children[1].textContent = newName;
      if (newDescription) row.children[2].textContent = newDescription;
      break;
    }
  }
}

// Function to delete a transaction status
function deleteStatus(statusID) {
  const rows = statusTable.querySelectorAll("tbody tr");

  for (const row of rows) {
    if (row.children[0].textContent === statusID) {
      row.remove();
      break;
    }
  }
}

// Add status form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const statusID = addForm["statusID"].value;
  const name = addForm["name"].value;
  const description = addForm["description"].value;

  addStatus(statusID, name, description);

  // Reset the form
  addForm.reset();
});

// Edit status form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const statusID = editForm["statusID"].value;
  const newName = editForm["name"].value;
  const newDescription = editForm["description"].value;

  editStatus(statusID, newName, newDescription);

  // Reset the form
  editForm.reset();
});

// Delete status form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const statusID = deleteForm["statusID"].value;

  deleteStatus(statusID);

  // Reset the form
  deleteForm.reset();
});
