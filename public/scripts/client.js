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
