$(function () {

  $("#add").on("click", function() {
    $.post("admin.html", {'action': 'addUser', 'name': $("#addNewUser").val()});
    window.location.href="user.html";
  });

  $("#update").on("click", function() {
    $.post("admin.html", {'action': 'editUser', 'name': $("#editUser").val(), 'counter': $("#counter").val(), 'time': $("#time").val()});
    window.location.href="user.html";
  });

  $("#del").on("click", function() {
    $.post("admin.html", {'action': 'delUser', 'name': $("#delUser").val()});
    window.location.href="user.html";
  });

  $("#logout").on("click", function () {
    $.post("admin.html", {'action': 'logout'});
    window.location.href="login.html";
  });
});
