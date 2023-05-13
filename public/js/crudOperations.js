document.addEventListener('DOMContentLoaded', function() {
    var addBtn = document.getElementById('add-btn');
    var editBtns = document.querySelectorAll('.editBtn');
    var deleteBtns = document.querySelectorAll('.deleteBtn');
    var createForm = document.getElementById('create-account-form');
    var updateForm = document.getElementById('update-account-form');
    var deleteForm = document.getElementById('delete-account-form');
    
    // Handle Add button click
    addBtn.onclick = function() {
        createForm.style.display = "block";
    };

    // Handle Edit buttons click
    editBtns.forEach(function(btn) {
        btn.onclick = function() {
            updateForm.style.display = "block";
            var row = btn.parentElement.parentElement;
            updateForm.id.value = row.children[0].textContent;
            updateForm.name.value = row.children[1].textContent;
            updateForm.balance.value = row.children[2].textContent;
        };
    });

    // Handle Delete buttons click
    deleteBtns.forEach(function(btn) {
        btn.onclick = function() {
            deleteForm.style.display = "block";
            var row = btn.parentElement.parentElement;
            deleteForm.id.value = row.children[0].textContent;
        };
    });
});
