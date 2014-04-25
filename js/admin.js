$(function() {
  $("#exec").on("click", function() {
    console.log("I am clicked");
    myForm = {};
    myForm['action'] = $("input[name=action]:checked").val();
    myForm['source'] = $("#sourceSetup").val();
    myForm['target'] = $("#targetSetup").val();
    myForm['type'] = $("input[name=type]:checked").val();
    myForm['relationship'] = $("#relationSetup").val();
    myForm['revrel'] = $("#revrelSetup").val();
    $.post("admin.html", myForm);
    window.location.href="admin.html";
  });

  $("#saveGraph").on("click", function() {
    myForm = {};
    myForm['action'] = 'saveGraph';
    graph = {};
    for (var x in nodes) {
      graph[x] = {};
      graph[x]['name'] = nodes[x]['name'];
      graph[x]['x'] = nodes[x]['x'];
      graph[x]['y'] = nodes[x]['y'];
      graph[x]['fixed'] = true;
    }
    myForm['nodes'] = JSON.stringify(graph);
    $.post("admin.html", myForm);
  });

  $("#editUser").on("click", function() {
    window.location.href="user.html";
  });

  $("#logout").on("click", function() {
    $.post("admin.html", {'action': 'logout'});
    window.location.href="login.html";
  });
});
