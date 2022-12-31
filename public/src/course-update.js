$(document).ready(function(){
    
    $("#update").click(function() {
    const courseId= $('#courseid').val();;
      const course = $('#name').val();
      const code = $('#code').val();
   
      const credithours=$('#creditHours').val();

      const data = {
        
        course,
        code,
        
        credithours,
      };

      $.ajax({
        type: "put",
        url: `/api/v1/course/`+`${courseId}`,
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            alert('Successfully update courses');
            location.href = '/manage/courses/';
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`Error update: ${errorResponse.responseText}`);
          }            
        }
      });
    
    });      
  });