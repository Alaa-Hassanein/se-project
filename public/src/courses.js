$(document).ready(function(){
    $(".remove").click(function() {
      

      const x = $(this).attr("id");


    
$(this).parent().parent().remove();
      $.ajax({
        type: "delete",
        url: `/api/v1/courses/`+`${x}`+`/drop`,
       
        success: function(serverResponse) {
          if(serverResponse) 
          {
        alert('course droped')
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            
          }            
        }
      });
    });
  });  
