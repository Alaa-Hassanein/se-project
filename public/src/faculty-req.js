$(document).ready(function(){
    // Handle Autocomplete Selection Change
    $(".dropdown-menu li a").click(function(){
      const index = $(this).attr('index');
      $("#facultyDropdown").attr('index', index);
      $("#facultyDropdown").text($(this).text());
    });
    $("#send-request").click(function() {
      console.log('hello');
    
      const facultyId = $("#facultyDropdown").attr('index');
      const status ='pending';

      const data = {
        status,
        facultyId,
      };

      $.ajax({
        type: "POST",
        url: '/api/v1/faculties/transfer',
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            alert('YOur request sent');
            
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`Error : ${errorResponse.responseText}`);
          }            
        }
      });
    });      
  });