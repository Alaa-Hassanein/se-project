$(document).ready(function(){
    
    $("#add").click(function() {
    
      const course = $('#name').val();
      const code = $('#code').val();
      const facultyId = $('#facultyid').val();
      const credithours=$('#creditHours').val();

      const data = {
        
        course,
        code,
        facultyId,
        credithours,
      };

      $.ajax({
        type: "POST",
        url: '/api/v1/addcourse',
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            alert('Successfully add courses');
            location.href = '/manage/courses/';
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