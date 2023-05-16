$(document).ready(function() {

    // Show the add form when the add button is clicked and populate with the next ID
    $("#add-btn").on('click', function() {
        // Hide the other forms
        $("#edit-form").hide();
        $("#delete-form").hide();

        // Show the add form
        $("#add-form").show();

        // TODO
    });

    // Show the edit form when the edit button is clicked and populate with current data
    $(document).on('click', '.edit-btn', function() {
        // Hide the other forms
        $("#add-form").hide();
        $("#delete-form").hide();

        // Show the edit form
        $("#edit-form").show();

        // TODO
    });

    // Show the delete form when the delete button is clicked and populate with current data
    $(document).on('click', '.delete-btn', function() {
        // Hide the other forms
        $("#add-form").hide();
        $("#edit-form").hide();

        // Show the delete form
        $("#delete-form").show();

        // TODO
    });

    // Hide the add form when the cancel button is clicked
    $("#add-cancel-input").on('click', function(event) {
        event.stopPropagation();
        $("#add-form").hide();
    });

    // Hide the edit form when the cancel button is clicked
    $("#edit-cancel-input").on('click', function(event) {
        event.stopPropagation();
        $("#edit-form").hide();
    });

    // Hide the delete form when the cancel button is clicked
    $("#delete-cancel-input").on('click', function(event) {
        event.stopPropagation();
        $("#delete-form").hide();
    });

});
