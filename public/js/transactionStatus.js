// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const statusTable = document.getElementById("status-table");

// Function to add a new transaction status
function addStatus(statusID, name, description) {
  fetch('/api/transactionStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      statusID: statusID,
      name: name,
      description: description
    })
  })
  .then(response => response.json())
  .then(data => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${data.statusID}</td>
      <td>${name}</td>
      <td>${description}</td>
    `;
    statusTable.querySelector("tbody").appendChild(newRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to edit an existing transaction status
function editStatus(statusID, newName, newDescription) {
  fetch('/api/transactionStatus', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      statusID: statusID,
      name: newName,
      description: newDescription
    })
  })
  .then(function(response) {return response.json();})
  .then(function(data) {
    const rows = statusTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === statusID) {
        if(!(newName == null || newName == undefined || newName == '')) row.children[1].textContent = newName;
        if(!(newDescription == null || newDescription == undefined || newDescription == '')) row.children[2].textContent = newDescription;
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete a transaction status
function deleteStatus(statusID) {
  fetch('/api/transactionStatus', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      statusID: statusID
    })
  })
  .then(response => response.json())
  .then(data => {
    const rows = statusTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === statusID) {
        row.remove();
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
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
  const name = editForm["name"].value;
  const description = editForm["description"].value;

  editStatus(statusID, name, description);

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
