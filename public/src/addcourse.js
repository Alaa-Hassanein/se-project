$(document).ready(function(){
    // Handle Registration Button Click
    $("#add").click(function() {
      const id = $('#id').val();
      const course = $('#name').val();
      const code = $('#code').val();
      const facultyId = $("#facultyDropdown").attr('index');

      const data = {
        id,
        course,
        code,
        facultyId,
      };

    /*  $.ajax({
        type: "POST",
        url: '/api/v1/addcoure',
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