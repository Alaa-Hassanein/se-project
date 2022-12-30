$(document).ready(function(){
  var corseid;

    function buildTable(data){
          document.getElementById('myTable').innerHTML = "";
      
      var table = document.getElementById('myTable');
          for (var i = 0; i < data.length; i++){
              var row = `<tr>
                              <td>${data[i].userId}</td>
                              <td>${data[i].firstName}</td>
                              
                              <td><input type="number"  id="${data[i].userId}" name="${data[i].userId}" placeholder="grade" value=""></td>
                              <td><button id=${data[i].userId} name="upload" type="button" value="${data[i].userId}"  class="btn btn-primary upload">upload</button></td>
                
               
                        </tr>`
            
              table.innerHTML += row
  
  
          }
      }
    $(".dropdown-menu li a").click(function(){
      const index = $(this).attr('index');
      $("#courseDropdown").attr('index', index);
      $("#courseDropdown").text($(this).text());
      
    });
   
    $("#submit").click(function() {
  
      
      
      const courseId = $("#courseDropdown").attr('index');
  
      console.log(courseId);
      $.ajax({
        type: "get",
        url: `/api/v1/enrollment/`+`${courseId}`,
        
        success:function(res){
          courses= res
        
          buildTable(courses)
          
          
        }    
      });
    });  
  
 
  });
  $(document).ready(function(){
    $("#myTable").on("click", ".upload", function (event) {
  
      const userid = $(this).attr("id");
      const courseId = $("#courseDropdown").attr('index');
      console.log(courseId);
      const grade = $(`#${userid}`).val();
      $(this).parent().parent().remove();
  
     const data = {
      grade,
      userid,
     };

      $.ajax({
        type: "put",
        url: `/api/v1/enrollment/`+`${courseId}`,
        data,
        success:function(res){
         
          
        }    
      });
    });  
  });  
  