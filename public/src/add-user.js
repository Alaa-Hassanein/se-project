$(document).ready(function(){
    $("#submit").click(function() {
      const firstName = $('#firstName').val();
      const lastName = $('#lastName').val();
      const major = $('#major').val();

      const data = {
        firstName,
        lastName,
        major,
      };

      $.ajax({
        type: "POST",
        url: '/api/v1/users',
        data,
        success: function(serverResponse){
          if(serverResponse) {
            alert(JSON.stringify(serverResponse));
          }
        }
      });
    });
  });