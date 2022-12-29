$(document).ready(function(){

    function buildTable(data){
          document.getElementById('myTable').innerHTML = "";
      
      var table = document.getElementById('myTable');
          for (var i = 0; i < data.length; i++){
              var row = `<tr>
                              <td>${data[i].userId}</td>
                              <td>${data[i].firstName}</td>
                              
                              <td><input type="number"  id="${data[i].userId}" name="${data[i].userId}" placeholder="grade" value=""></td>
                              <td><buttom id=${data[i].userId} name="upload" type="buttom" value="${data[i].userId}"  class="btn btn-primary upload">upload</buttom></td>
                
               
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
    $(".upload").click(function() {
  
      const userid = $(this).attr("id");
      const grade = $(`#${userid}`).val();
   
  console.log(grade);
     
      $.ajax({
        type: "delete",
        url: `/api/v1/enrollment/`+`${userid}`,
        
        success:function(res){
         alert(`course deleted ${res}`)
          
        }    
      });
    });  
  });  
  