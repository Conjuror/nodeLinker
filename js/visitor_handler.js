var user = window.top.location.search.substring(1).split('=')[1];

var counter = 0;
var startTime = new Date();

function sayGoodBye() {
  data = {};
  data['action'] = 'log';
  data['user'] = user;
  data['counter'] = counter;
  data['time'] = new Date() - startTime;
  $.post("admin.html", data);
  console.log("byebye");
}

$(window).unload(sayGoodBye);

$(function () {
  $("#logout").on("click", function () {
    window.location.href="login.html";
  });
});
