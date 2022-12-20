$(document).ready(function(){
    // Handle Registration Button Click
    $("#add").click(function() {
      const id = $('#id').val();
      const course = $('#name').val();
      const code = $('#code').val();
      const facultyId = $("#facultyDropdown").attr('index');

      const data = {
        firstName,
        lastName,
        email,
        password,
        facultyId,
      };

    /*  $.ajax({
        type: "POST",
        url: '/api/v1/user',
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            alert('Successfully Registered User');
            location.href = '/logins';
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`Error Register User: ${errorResponse.responseText}`);
          }            
        }
      });
    */
    });      
  });