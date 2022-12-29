
$(document).ready(function(){
    $(".reject").click(function() {
      

      const x = $(this).attr("id");


    
      const data = {
        response : "reject"
      };
      
      $.ajax({
        type: "POST",
        url: `/api/v1/transfers/`+`${x}`,
        data,
        success: function(serverResponse) {
          if(serverResponse) 
          {
        
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            
          }            
        }
      });
    });
  });  

  $(document).ready(function(){
    $(".approve").click(function() {
      

      const x = $(this).attr('id');

  console.log(x)
    
  const data = {
    response : "approve"
  };
  console.log('/api/v1/transfers/'+x);
      $.ajax({
        type: "POST",
        url: `/api/v1/transfers/`+`${x}`,
        data,
        success: function(serverResponse) {
          if(serverResponse) 
          {
        
          }
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`User login error: ${errorResponse.responseText}`);
          }            
        }
      });
    });
  });  