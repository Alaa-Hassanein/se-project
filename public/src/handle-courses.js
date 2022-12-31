$(document).ready(function(){

  function buildTable(data){
		document.getElementById('myTable').innerHTML = "";
    
    var table = document.getElementById('myTable');
		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].code}</td>
							<td>${data[i].course}</td>
							<td>${data[i].id}</td>
              <td><a href="/manage/courses/${data[i].id}"><button type="button" class="btn btn-primary ">update</button></a></td>
              <td><button id=${data[i].id} name="drop" type="button" value="${data[i].id}"  class="btn btn-danger delete" >delete</button></td>
					  </tr>`
          
			table.innerHTML += row


		}
	}
  $(".dropdown-menu li a").click(function(){
    const index = $(this).attr('index');
    $("#facultyDropdown").attr('index', index);
    $("#facultyDropdown").text($(this).text());
  });
 
  $("#submit").click(function() {

    console.log('alaa');
    
    const facultyId = $("#facultyDropdown").attr('index');

   
    $.ajax({
      type: "post",
      url: `/api/v1/faculties/`+`${facultyId}`,
      
      success:function(res){
        courses= res
      
        buildTable(courses)
        console.log('courses')
        
      }    
    });
  });  

  $("#myTable").on("click", ".delete", function (event) {
 
    const corseid = $(this).attr("id");
    $(this).parent().parent().remove();
   console.log(corseid);

   
    $.ajax({
      type: "delete",
      url: `/api/v1/courses/`+`${corseid}`,
      
      success:function(res){
       alert(`course deleted ${res}`)
        
      }    
    });

  
  
  });  

/*
 $("#myTable").on("click", ".update", function () {
 
    const corseId = $(this).attr("id");
   
   
const data={
  corseId
};
   
    $.ajax({
      type: "get",
      url:'/manage/courses/edit',
      data,
         
     });

  
  
   });  
    */  
});


 
 