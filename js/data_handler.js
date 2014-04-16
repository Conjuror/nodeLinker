function updateRoute() {
  console.log(links);
}

var route = {};

function highLight() {
  if (availableNodes.indexOf($(this).val()) != -1 && $("#"+$(this).val()).attr("class") != "node selected") {
    // console.log($(this).val()+" clicked");
    $("#"+$(this).val()).click(); 
  }
  // console.log("highlighted");
  $("circle[class*=selected]").each(function() {
    // console.log("self check");
    if ($(this).attr("id") != $("#sourceText").val() && $(this).attr("id") != $("#targetText").val()) {
      $(this).click();
    }
  });
}

var availableNodes = [];
for (i = 0 ; i < links.length ; i++) {
  if (availableNodes.indexOf(links[i]['source']) == -1) {
    availableNodes.push(links[i]['source']);
  }
  if (availableNodes.indexOf(links[i]['target']) == -1) {
    availableNodes.push(links[i]['target']);
  }
}

// autocomplete
$(function(){
  $("#sourceText").autocomplete({
    source: availableNodes
  }).bind("input.autocomplete", function () {
    $(this).autocomplete("search", this.value);
  });
  $("#targetText").autocomplete({
    source: availableNodes
  }).bind("input.autocomplete", function () {
    $(this).autocomplete("search", this.value);
  });

  $("#sourceText").on("keyup", highLight);
  $("#targetText").on("keyup", highLight);


  var selectedNode = [];
  var src = "", des = "";
  var selectedRoutes;

  function getRoutes(a, b) {
    console.log(availableNodes.length);
    src = availableNodes.indexOf(a);
    des = availableNodes.indexOf(b);
    console.log(a+"->"+b);
    now = src;
    nodes="";
    while (map[now][des][0]['next'] != null) {
      nodes = nodes + " "+availableNodes[now];
      console.log(availableNodes[now] + "->" + availableNodes[des] + " disToGo:" + map[now][des][0]['distance'] + " next:" + availableNodes[map[now][des][0]['next']]);
      now = map[now][des][0]['next'];
    }
    drawAccordion(1, a, b, nodes)
  }

  function drawAccordion(index, source, target, nodes, routes) {
    $("#accordion").append("<h3> Path " + index + "</h3>");
    $("#accordion").append("<div>" + "Source: " + source + "<br>" + "target: " + target + "<br>" + "nodes: " + nodes + "<br>" + "paths: " + routes + "<br>" + "</div>");
  }

  $(function() {$("#accordion").accordion();});

  // set a click event, add an event listener to every circle, when they are selected, change the color to yellow
  // You can not use addClass for svg
  $("circle").on("click", function() {
    nodeId = $(this).attr("id");
    if ($(this).attr("class").indexOf("selected") != -1 && selectedNode.length == 2) {
      // clean second node
      $("#accordion").empty();
      $(".route").each(function() {
        $(this).attr("class", $(this).attr("class").replace(" route", ""));
      });
      $(this).attr("class", "node");
      selectedNode.splice(selectedNode.indexOf(nodeId), 1);
      if ($("#sourceText").val() == nodeId) {
        $("#sourceText").val("");
      }
      else if ($("#targetText").val() == nodeId) {
        $("#targetText").val("");
      }
    }
    else if ($(this).attr("class").indexOf("selected") != -1) {
      // clean first node
      $(this).attr("class", "node");
      selectedNode.splice(selectedNode.indexOf(nodeId), 1);
      if ($("#sourceText").val() == nodeId) {
        $("#sourceText").val("");
      }
      else if ($("#targetText").val() == nodeId) {
        $("#targetText").val("");
      }
    }
    else if (selectedNode.length == 0) {
      // select first node
      $(this).attr("class", "node selected");
      selectedNode.push(nodeId);
      $("#sourceText").val(nodeId);
    }
    else if (selectedNode.length == 1) {
      // select second node
      $(this).attr("class", "node selected");
      selectedNode.push($(this).attr("id"));
      if (availableNodes.indexOf($("#sourceText").val()) == -1) {
        $("#sourceText").val(nodeId);
      }
      else {
        $("#targetText").val(nodeId);
      }

      // add routes
      getRoutes($("#sourceText").val(), $("#targetText").val());
      console.log("calculate route: " +$("#sourceText").val() + " -> " + $("#targetText").val() );
    }
  });

});

// main algorithm for generating routes
function generateRoute() {
  // init
  map = [];
  for (i = 0 ; i < availableNodes.length ; i++) {
    map[i] = [];
    for (j = 0 ; j < availableNodes.length ; j++) {
      map[i][j] = []
      if (i == j)
        map[i][j].push({"next": null, "distance": 0});
      else
        map[i][j].push({"distance": -1});
    }
  }

  // known distance = 1

  for (i = 0 ; i < links.length ; i++) {
    src = availableNodes.indexOf(links[i]['source']);
    des = availableNodes.indexOf(links[i]['target']);
    map[src][des][0] = {"next": des, "distance": 1};
    map[des][src][0] = {"next": des, "distance": 1};
  }

  console.log("start calculating...");
  change = true;
  while (change) {
    change = false;
    for (i = 0 ; i < availableNodes.length ; i++) {
      for (j = 0 ; j < availableNodes.length ; j++) {
        if (j == i)
          continue;
        for (k = 0 ; k < availableNodes.length ; k++) {
          if (i == k || j == k)
            continue;
          if (map[i][j][0]['distance'] == -1 && map[i][k][0]['distance'] == 1 && map[k][j][0]['distance'] > 0) {
            map[i][j][0] = {"next": k, "distance": map[i][k][0]['distance']+map[k][j][0]['distance']};
            change = true;
          }
          else if (map[i][j][0]['distance'] > 0 && map[i][k][0]['distance'] == 1 && map[k][j][0]['distance'] > 0 && map[i][k][0]['distance']+map[k][j][0]['distance'] <= map[i][j][0]['distance']) {
            exist = false;
            for (c = 0 ; c < map[i][j].length ; c++) {
              if (map[i][j][c]['next'] == k)
                exist = true
            }
            if (!exist) {
              map[i][j].push({"next": k, "distance":map[i][k][0]['distance']+map[k][j][0]['distance']})
              change = true;
            }
          }
        }
      }
    }
  }
  console.log("done");
}

generateRoute();
