var Tower = {
  height: 3,
  left: [],
  center: [],
  right: [],
  buildHeight: function(){
    for (var i = Tower.height; i > 0; i--){
      Tower.left.push(i);
      $(".tower").append("<div class='story-space " + i + "'>");
    }
  },
  render: function(){
    $(".tower").each(function(){
      $(this).html("");
      var currentTower = this.id;
      Tower[currentTower].forEach(function(story, index){
        var storySpace = index + 1;
        $("#" + currentTower).find("." + storySpace)
          .html("<div class='story'>" + story + "</div>")
          .outerWidth(story * 100 / Tower.height);
      });
    });
  },

};

$(document).ready(function(){
  Tower.buildHeight();
  Tower.render();
  $(".tower").on("click", function(){
    var grabTower = this.id;
    $(".tower").on("click", function(){
      var placeTower = this.id;
      Tower[placeTower].push(Tower[grabTower].pop());
      Tower.render();
      console.log(Tower.left, Tower.center, Tower.right);
    });
  });
});
