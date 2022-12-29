$(document).ready(function(){
    
    $("#add").click(function() {
    
      const course = $('#name').val();
      const code = $('#code').val();
      const facultyId = $('#facultyid').val();
console.log(facultyId);
console.log(code);

      const data = {
        
        course,
        code,
        facultyId,
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