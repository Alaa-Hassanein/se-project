$(document).ready(function(){
    $("#GPA").click(function() {
  function  calculateGPA(data)
  {var upernum=0;
    for(let i =0 ;i<data.length;i++)
      {
        x =data[i];
        upernum=(x.grade*x.credithours)+upernum; 
      }
     var lowernum=0;
     for(let i =0 ;i<data.length;i++)
      {
        x =data[i];
        lowernum=x.credithours+lowernum; 
      }
      return (upernum/lowernum)
  }
      $.ajax({
        type: "get",
        url: '/api/v1/GPA',
        
        success: function(res) {
          const GPA =calculateGPA(res);
          console.log(GPA);
          document.getElementById("GPA").value=`${GPA}`;
        },
        error: function(errorResponse) {
          if(errorResponse) {
            alert(`User login error: ${errorResponse.responseText}`);
          }            
        }
      });
    });
  });  