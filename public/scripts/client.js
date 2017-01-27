$(function(){
  console.log('document ready')

  getPets();
  getOwners();
  // ownerDropMenu();

  $('#pet-form').on('click', '#add-pet', addPet);
  $('#owner-form').on('click', '#register', addOwner);

  $('#pet-table').on('click', '.update', updatePet);
  $('#pet-table').on('click', '.delete', deletePet);

});

function getPets() {
  $.ajax({
    url: '/pets',
    type: 'GET',
    success: displayPets
  });
}

function getOwners () {
  $.ajax({
    url: '/owners',
    type: 'GET',
    success: ownerDropMenu
  });
};

function ownerDropMenu(owners){
  $('#owner-options').empty();
  console.log(owners);
    owners.forEach(function(owner){
      $('#owner-options').append('<option value="' + owner.id + '">'  + owner.first_name + " " + owner.last_name + '</option>');
  });
}

function displayPets(pets){
  console.log('Got pets from the server', pets);
    $('#table-body').empty();

    pets.forEach(function(pet){

    // $('#owner-options').append('<option value="' + pet.owner_id +'">'  + pet.first_name + " " + pet.last_name + '</option>');

    var $tableRow = $('<tr></tr>');

    $tableRow.append('<td>' + pet.first_name + " " + pet.last_name + '</td>');
    $tableRow.append('<td><input type="text" name="pet_name" value="' + pet.name + '"/></td>');
    $tableRow.append('<td><input type="text" name="breed" value="' + pet.breed + '"/></td>');
    $tableRow.append('<td><input type="text" name="color" value="' + pet.color + '"/></td>');



    var $updateButton = $('<td><button class="update btn btn-outline-success">Update</button></td>');
    $updateButton.data('id', pet.id);
    $tableRow.append($updateButton);

    var $deleteButton = $('<td><button class="delete btn btn-outline-danger">Delete</button></td>');
    $deleteButton.data('id', pet.id);
    $tableRow.append($deleteButton);

    $('#pet-table').append($tableRow);

  });
}

function addPet(event) {
  // prevent browser from refreshing
  event.preventDefault();

  // get the info out of the form
  var formData = $('#pet-form').serialize();

  console.log(formData);
  console.log($(this));
  // send data to server
  $.ajax({
    url: '/pets',
    type: 'POST',
    data: formData,
    success: getPets
  });
}

function addOwner(event) {
  // prevent browser from refreshing
  event.preventDefault();


  // get the info out of the form
  var formData = $('#owner-form').serialize();
  console.log(formData);
  // send data to server
  $.ajax({
    url: '/owners',
    type: 'POST',
    data: formData,
    success: getOwners
  });
}

function updatePet(event) {
  event.preventDefault();

  var $button = $(this).parent();
  var $table = $button.closest('tr');

  var data = $table.find('input');
  console.log(data);

  $.ajax({
    url: '/pets/' + $button.data('id'),
    type: 'PUT',
    data: data.serialize(),
    success: getPets
  });
}


// $(this) refers to the button that was clicked
function deletePet (event){
  event.preventDefault();
  $.ajax({
    url: '/pets/' + $(this).parent().data('id'),
    type: 'DELETE',
    success: getPets
  });
}


// function displayPets(pets){
//   console.log('Got pets from the server', pets);
//   $('pet-list').empty();
//
//     pets.forEach(function(pet){
//
//     $('#owner-options').append('<option>'  + pet.first_name + " " + pet.last_name + '</option>');
//
//     var $li = $('<li></li>');
//
//     var $form = $('<form></form>');
//
//     $form.append('<input type="text" name="full_name" value="' + pet.first_name + " " + pet.last_name + '"/>');
//     //$form.append('<input type="text" name="last_name" value="' + pet.last_name + '"/>');
//
//     // ISO format: yyyy-mm-ddThh-mm-ssZ
//     // desired format:  yyyy-mm-dd
//     // var date = new Date(book.publication_date).toISOString().slice(0,10);
//
//     $form.append('<input type="text" name="pet_name" value="' + pet.name + '"/>');
//     $form.append('<input type="text" name="breed" value="' + pet.breed + '"/>');
//     $form.append('<input type="text" name="color" value="' + pet.color + '"/>');
//
//     // $form.append('<input type="date" name="published" value="' + date + '"/>');
//
//     // var $saveButton = $('<button class="save">Save!</button>');
//     // $saveButton.data('id', book.id);
//     // $form.append($saveButton);
//     //
//     // var $deleteButton = $('<button class="delete">Delete!</button>');
//     // $deleteButton.data('id', book.id);
//     // $form.append($deleteButton);
//
//     $li.append($form);
//     $('#pet-list').append($li);
//
//   });
//
//   $('#pet-list').append('<label for="full_name">Owner</label>');
//   $('#pet-list').append('<label for="pet_name">Pet</label>');
//   $('#pet-list').append('<label for="breed">Breed</label>');
//   $('#pet-list').append('<label for="color">Color</label>');
//
// }
