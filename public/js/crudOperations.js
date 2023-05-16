document.addEventListener("DOMContentLoaded", function () {
    let entityName;
    // identify the entity from the form ids
    document.querySelectorAll('form').forEach(form => {
        const id = form.getAttribute('id');
        if (id.startsWith('create-')) {
            entityName = id.replace('create-', '').replace('-form', '');
        }
    });

    // No entityName found, probably a page where we don't need CRUD operations
    if (!entityName) return;

    // Manipulate DOM for Create Operation
    const createForm = document.getElementById(`create-${entityName}-form`);
    const addButton = document.getElementById('add-btn');

    addButton.addEventListener('click', function () {
        createForm.style.display = 'block';
    });

    createForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newRow = document.createElement('tr');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'editBtn';

        const actionTd = document.createElement('td');
        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);

        let i = 0;
        document.querySelectorAll(`#create-${entityName}-form input`).forEach(input => {
            const newTd = document.createElement('td');
            newTd.textContent = input.value;
            newRow.appendChild(newTd);
            input.value = '';
            i++;
        });

        newRow.appendChild(actionTd);
        document.querySelector('tbody').appendChild(newRow);
        createForm.style.display = 'none';
    });

    // Manipulate DOM for Update Operation
    const updateForm = document.getElementById(`update-${entityName}-form`);
    document.body.addEventListener('click', function (e) {
        if (e.target.className === 'editBtn') {
            const row = e.target.parentNode.parentNode;
            const inputs = document.querySelectorAll(`#update-${entityName}-form input`);
            let i = 0;
            for (const cell of row.cells) {
                if (i < inputs.length) {
                    inputs[i].value = cell.textContent;
                }
                i++;
            }
            updateForm.style.display = 'block';
        }
    });

    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = document.querySelectorAll(`#update-${entityName}-form input`);
        const id = document.getElementById('update-id').value;

        document.querySelectorAll('tbody tr').forEach(row => {
            if (row.cells[0].textContent == id) {
                let i = 0;
                for (const cell of row.cells) {
                    if (i < inputs.length) {
                        cell.textContent = inputs[i].value;
                    }
                    i++;
                }
            }
        });

        updateForm.style.display = 'none';
    });

    // Manipulate DOM for Delete Operation
    const deleteForm = document.getElementById(`delete-${entityName}-form`);
    document.body.addEventListener('click', function (e) {
        if (e.target.className === 'deleteBtn') {
            const row = e.target.parentNode.parentNode;
            document.getElementById('delete-id').value = row.cells[0].textContent;
            deleteForm.style.display = 'block';
        }
    });

    deleteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('delete-id').value;

        document.querySelectorAll('tbody tr').forEach(row => {
            if (row.cells[0].textContent == id) {
                row.remove();
            }
        });

        deleteForm.style.display = 'none';
    });
});
