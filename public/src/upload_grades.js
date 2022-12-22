  $(document).ready(function(){
    // Handle Autocomplete Selection Change
    
    // Handle Registration Button Click
    $("#submit").click(function() {
      const course_id = $('#course_id').val();
      const student_id= $('#Student_id').val();
      const Grade = $('Grade').val();
      const data = {
        course_id,
        student_id,
        Grade,
      };

      $.ajax({
        type: "POST",
        url: '/manage/grade',
        data,
        success: function(serverResponse) {
          if(serverResponse) {
            
            alert('Successfully uploaded')
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`Error uploading grades: ${errorResponse.responseText}`);
          }            
        }
      });
    });      
  });