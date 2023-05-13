// CRUD Operations
document.addEventListener('DOMContentLoaded', () => {
    const accountsTable = document.querySelector('#accounts-table tbody');
    const addBtn = document.querySelector('#add-btn');
    const createForm = document.querySelector('#create-account-form');
    const updateForm = document.querySelector('#update-account-form');
    const deleteForm = document.querySelector('#delete-account-form');

    let accounts = [...document.querySelectorAll('#accounts-table tbody tr')];
    let selectedAccountId;

    function resetForm(form) {
        form.reset();
        form.style.display = 'none';
    }

    // Create Account
    addBtn.addEventListener('click', () => {
        resetForm(updateForm);
        resetForm(deleteForm);
        createForm.style.display = 'block';
    });

    createForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const accountId = Date.now(); // generate unique ID based on current time
        const name = document.querySelector('#create-account-name').value;
        const balance = document.querySelector('#create-account-balance').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${accountId}</td>
                            <td>${name}</td>
                            <td>${balance}</td>
                            <td>
                                <button class="editBtn">Edit</button>
                                <button class="deleteBtn">Delete</button>
                            </td>`;
        accountsTable.appendChild(newRow);
        accounts.push(newRow);

        addEventListenersToRow(newRow);

        resetForm(createForm);
    });

    // Update Account
    accounts.forEach(addEventListenersToRow);

    function addEventListenersToRow(row) {
        const editBtn = row.querySelector('.editBtn');
        const deleteBtn = row.querySelector('.deleteBtn');

        editBtn.addEventListener('click', () => {
            resetForm(createForm);
            resetForm(deleteForm);

            selectedAccountId = row.querySelector('td').textContent;

            document.querySelector('#update-account-id').value = selectedAccountId;
            document.querySelector('#update-account-name').value = row.children[1].textContent;
            document.querySelector('#update-account-balance').value = row.children[2].textContent;

            updateForm.style.display = 'block';
        });

        updateForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (selectedAccountId === row.querySelector('td').textContent) {
                row.children[1].textContent = document.querySelector('#update-account-name').value;
                row.children[2].textContent = document.querySelector('#update-account-balance').value;
            }

            resetForm(updateForm);
        });

        // Delete Account
        deleteBtn.addEventListener('click', () => {
            resetForm(createForm);
            resetForm(updateForm);

            selectedAccountId = row.querySelector('td').textContent;

            document.querySelector('#delete-account-id').value = selectedAccountId;

            deleteForm.style.display = 'block';
        });

        deleteForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (selectedAccountId === row.querySelector('td').textContent) {
                accountsTable.removeChild(row);
            }

            resetForm(deleteForm);
        });
    }
});
