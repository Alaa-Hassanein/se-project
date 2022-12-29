$(document).ready(function(){
  // Handle Autocomplete Selection Change
  $(".dropdown-menu li a").click(function(){
    const index = $(this).attr('index');
    $("#facultyDropdown").attr('index', index);
    $("#facultyDropdown").text($(this).text());
  });
  // Handle Registration Button Click
  $("#submit").click(function() {

    console.log('alaa');
    
    const facultyId = $("#facultyDropdown").attr('index');

    const data = {
     
      facultyId,
    };

    $.ajax({
      type: "get",
      url: '/manage/courses',
      data,
     
    });
  });      
});