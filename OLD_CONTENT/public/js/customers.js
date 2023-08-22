// Get DOM elements
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
const deleteForm = document.getElementById("delete-form");
const customersTable = document.getElementById("customers-table");

// Function to add a new customer
function addCustomer(customerID, fname, lname, email, ssn, addr) {
  // Send POST request to /api/customers
  fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerID: customerID,
      fname: fname,
      lname: lname,
      email: email,
      ssn: ssn,
      addr: addr
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Add new customer to the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${data.customerID}</td>
      <td>${fname}</td>
      <td>${lname}</td>
      <td>${email}</td>
      <td>${ssn}</td>
      <td>${addr}</td>
    `;
    customersTable.querySelector("tbody").appendChild(newRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to edit an existing customer
function editCustomer(customerID, newFname, newLname, newEmail, newSSN, newAddr) {
  // Send PUT request to /api/customers
  fetch('/api/customers', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerID: customerID,
      fname: newFname,
      lname: newLname,
      email: newEmail,
      ssn: newSSN,
      addr: newAddr
    })
  })
  .then(function(response) {return response.json();})
  .then(function(data) {
    console.log(data);
    // Update the customer in the table
    const rows = customersTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === customerID) {
        if(!(newFname == null || newFname == undefined || newFname == '')) row.children[1].textContent = newFname;
        if(!(newLname == null || newLname == undefined || newLname == '')) row.children[2].textContent = newLname;
        if(!(newEmail == null || newEmail == undefined || newEmail == '')) row.children[3].textContent = newEmail;
        if(!(newSSN == null || newSSN == undefined || newSSN == '')) row.children[4].textContent = newSSN;
        if(!(newAddr == null || newAddr == undefined || newAddr == '')) row.children[5].textContent = newAddr;
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete a customer
function deleteCustomer(customerID) {
  // Send DELETE request to /api/customers
  fetch('/api/customers', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerID: customerID
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Remove the customer from the table
    const rows = customersTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      if (row.children[0].textContent === customerID) {
        row.remove();
        break;
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Add customer form submit event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerID = addForm["customerID"].value;
  const fname = addForm["fname"].value;
  const lname = addForm["lname"].value;
  const email = addForm["email"].value;
  const ssn = addForm["ssn"].value;
  const addr = addForm["addr"].value;

  addCustomer(customerID, fname, lname, email, ssn, addr);

  // Reset the form
  addForm.reset();
});

// Edit customer form submit event
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerID = editForm["customerID"].value;
  const newFname = editForm["fname"].value;
  const newLname = editForm["lname"].value;
  const newEmail = editForm["email"].value;
  const newSSN = editForm["ssn"].value;
  const newAddr = editForm["addr"].value;

  editCustomer(customerID, newFname, newLname, newEmail, newSSN, newAddr);

  // Reset the form
  editForm.reset();
});

// Delete customer form submit event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerID = deleteForm["customerID"].value;

  deleteCustomer(customerID);

  // Reset the form
  deleteForm.reset();
});
