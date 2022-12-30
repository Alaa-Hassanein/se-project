$(document).ready(function(){
    // Handle Autocomplete Selection Change
    $(".dropdown-menu li a").click(function(){
      const index = $(this).attr('index');
      $("#facultyDropdown").attr('index', index);
      $("#facultyDropdown").text($(this).text());
    });
    // Handle Registration Button Click
    $("#register").click(function() {
      const firstName = $('#firstName').val();
      const lastName = $('#lastName').val();
      const email = $('#email').val();
      const password = $('#password').val();
      const facultyId = $("#facultyDropdown").attr('index');

      const data = {
        firstName,
        lastName,
        email,
        password,
        facultyId,
      };

      $.ajax({
        type: "POST",
        url: '/api/v1/user',
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            alert('user registered ')
            location.href = '/';

          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`Error Register User: ${errorResponse.responseText}`);
          }            
        }
      });
    });      
  });