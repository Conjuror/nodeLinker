$(function() {
  $("input[name=role]").on("change", function() {
    if ($("input[name=role]:checked").val() == 'admin') {
      $("#password").attr("disabled", false);
    }
    else {
      $("#password").attr("disabled", true);
    }
  });

  $("#exec").on("click", function() {
    console.log("I am clicked");
    myForm = {};
    myForm['action'] = 'login';
    myForm['account'] = $("#account").val();
    myForm['password'] = $("#password").val();
    myForm['role'] = $("input[name=role]:checked").val();
    $.post("admin.html", myForm);
    if ($("#password").val() != "" && $("input[name=role]:checked").val() == "admin") {
      window.location.href="admin.html";
    } else {
      window.location.href="index.html?id="+$("#account").val();
    }
  });
});
