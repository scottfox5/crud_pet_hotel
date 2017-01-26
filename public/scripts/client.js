$(function(){
  console.log('document ready')

  getPets();
});

function getPets() {
  $.ajax({
    url: '/pets',
    type: 'GET',
    success: displayPets
  });
}

function displayPets(pets){
  console.log('Got pets from the server', pets);
  $('pet-list').empty();
    pets.forEach(function(pet){
    var $li = $('<li></li>');

    var $form = $('<form></form>');

    $form.append('<input type="text" name="first_name" value="' + pet.first_name + '"/>');
    $form.append('<input type="text" name="last_name" value="' + pet.last_name + '"/>');

    // ISO format: yyyy-mm-ddThh-mm-ssZ
    // desired format:  yyyy-mm-dd
    // var date = new Date(book.publication_date).toISOString().slice(0,10);

    $form.append('<input type="text" name="pet_name" value="' + pet.name + '"/>');
    $form.append('<input type="text" name="breed" value="' + pet.breed + '"/>');
    $form.append('<input type="text" name="breed" value="' + pet.color + '"/>');

    // $form.append('<input type="date" name="published" value="' + date + '"/>');

    // var $saveButton = $('<button class="save">Save!</button>');
    // $saveButton.data('id', book.id);
    // $form.append($saveButton);
    //
    // var $deleteButton = $('<button class="delete">Delete!</button>');
    // $deleteButton.data('id', book.id);
    // $form.append($deleteButton);

    $li.append($form);
    $('#pet-list').append($li);




});
}
