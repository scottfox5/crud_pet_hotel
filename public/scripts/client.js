$(function(){
  console.log('document ready')

  getPets();
});

function getPets() {
  $.ajax({
    url: '/pets',
    type: 'GET',
    success: displayPets, ownerDropMenu
  });
}

function ownerDropMenu(pets){
    pets.forEach(function(pet){
    $('#owner-options').append('<option>'  + pet.first_name + " " + pet.last_name + '</option>');
  });
}

function displayPets(pets){
  console.log('Got pets from the server', pets);

    pets.forEach(function(pet){

    $('#owner-options').append('<option>'  + pet.first_name + " " + pet.last_name + '</option>');

    var $tableRow = $('<tr></tr>');

    $tableRow.append('<td>' + pet.first_name + " " + pet.last_name + '</td>');
    $tableRow.append('<td><input type="text" name="pet_name" value="' + pet.name + '"/></td>');
    $tableRow.append('<td><input type="text" name="breed" value="' + pet.breed + '"/></td>');
    $tableRow.append('<td><input type="text" name="color" value="' + pet.color + '"/></td>');

    var $updateButton = $('<td><button class="update">Update</button></td>');
    $updateButton.data('id', pet.id);
    $tableRow.append($updateButton);

    var $deleteButton = $('<td><button class="delete">Delete</button></td>');
    $deleteButton.data('id', pet.id);
    $tableRow.append($deleteButton);

    $('#pet-table').append($tableRow);

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
