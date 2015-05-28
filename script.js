$(document).ready(function(){
  $("#themeButton").click(themeButton);

  function themeButton(){
    $("body").toggleClass("darkTheme");
  };

});
