  var arrayColor = ["#FF502E", "#7F2817"];
  var liczChange = true;
  var liczBreak = parseInt($("#breakTimer").text());
  var tempLicz;
  
  for(var i = 0; i < 17; i++) {
    var rand = Math.floor((Math.random() * 2 ));
    $(".anim").append("<div class='animPart' style='background-color:" + arrayColor[rand] + "'</div>")
  }
  
  // time less and more
  //break
  $("#tbless").on('click', function() {
    if(liczChange) {
      var tbres = parseInt($("#tbres").text());
      if(tbres > 1) {
        $("#tbres").text((tbres - 1));
      
        if(liczBreak == 1) {
          $("#currentTime span").text($("#tbres").text());
          $("#tempLicz").text($("#tbres").text());
        }
      }
    }
  });
  $("#tbmore").on('click', function() {
    if(liczChange) {
       var tbres = parseInt($("#tbres").text());
       $("#tbres").text((tbres + 1)); 
      
       if(liczBreak == 1) {
        $("#currentTime span").text($("#tbres").text());
        $("#tempLicz").text($("#tbres").text());
      }
    }  
  });
  
  //more
  $("#twless").on('click', function() {
    if(liczChange) {
      var twres = parseInt($("#twres").text());
      if(twres > 1) {
        $("#twres").text((twres - 1));
        if(liczBreak == 0) {
          $("#currentTime span").text($("#twres").text());
          $("#tempLicz").text($("#twres").text());
        }      
      }
    }
  });
  $("#twmore").on('click', function() {
    if(liczChange) {
      var twres = parseInt($("#twres").text());
      $("#twres").text((twres + 1)); 
      if(liczBreak == 0) {
        $("#currentTime span").text($("#twres").text());
        $("#tempLicz").text($("#twres").text());
      } 
    }
  });
  
  //session
  //start
  var licz = true;
  var timer;
  
  $("#display").on('click', function() {
    liczBreak = parseInt($("#breakTimer").text());
    if(liczBreak == 1) {
      liczBreak = true;
    } else {
      liczBreak = false;
    }
    if(licz) {     
      liczChange = false;
      licz = false; 
      timer = clockFun(liczBreak);
      timer = timer[0];     
    } else {
      liczChange = true;
      licz = true;
      clearInterval(timer);
      $(".animPart").stop();
    }
  });
  
  function clockFun(liczBreak) {
    
    if(!liczBreak) {
        $(".boxTime").css({"background-color" : "#22BF0D"});
        $(".boxTime a").text("Session");
        var sec, j;
      
        if($("#tempLicz").text().length <= 2) {
          sec = 0;
          j = parseInt($("#tempLicz").text());
        } else {
          tempLicz = $("#tempLicz").text();
          sec = tempLicz.substr(tempLicz.length - 2);
          j = parseInt(tempLicz.substr(0,2));
        }
        if(j > 0 || sec > 0) {
          timer = setMyTimer(j, sec, liczBreak);
        }  
        return [timer, liczBreak]; 
      } else {
        $(".boxTime").css({"background-color" : "#FF502E"});
        $(".boxTime a").text("Break");
        
        var sec, j;
        if($("#tempLicz").text().length <= 2) {
          sec = 0;
          j = parseInt($("#tempLicz").text());
        } else {
          tempLicz = $("#tempLicz").text();
          sec = tempLicz.substr((tempLicz).length - 2);
          console.log(tempLicz,tempLicz.length,sec);
          j = parseInt(tempLicz.substr(0,2));
          console.log(tempLicz,j);
        }
        if(j > 0 || sec > 0) {
          timer = setMyTimer(j, sec, liczBreak);
        }        
        return [timer, liczBreak];
      }
  }

function setMyTimer(j, sec, liczBreak) {
  var timer = setInterval(function() { 
    if(sec > 0) {
      sec--;
    } else {
      j--;
      sec = 59;
    }
    if(sec < 10) {
      sec = "0" + sec;
    }

    for(var i = 0; i < 17; i++) {
      var temp = ".animPart:eq(" + i +")";
      $(temp).css({'background-color':  arrayColor[Math.floor(Math.random() * 2 )]});
      $(temp).animate({
        height: Math.floor(Math.random() * 40 ) + 40
      }, 1000);
    }

    $("#currentTime span").text(j + ':' + sec);
    $("#tempLicz").text(j + ':' + sec);
    if(j <= 0 && sec <= 0) {
      if(liczBreak) {
        liczBreak = false;
         $("#breakTimer").text(0);
      } else {
        liczBreak = true;
         $("#breakTimer").text(1);
      }
      if(!liczBreak) {
        $("#tempLicz").text($("#twres").text());
      } else {
        $("#tempLicz").text($("#tbres").text());
      }

      clearInterval(timer);          
      clockFun(liczBreak);
    }
  }, 1000);

  return timer;
}