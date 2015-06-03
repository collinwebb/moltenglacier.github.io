$(document).ready(function(){
  $("#themeButton").click(themeButton);

  function themeButton(){
    $("body").toggleClass("darkTheme");
    $("nav").toggleClass("navbar-inverse");
    $("nav").toggleClass("navbar-default")
  };

});
