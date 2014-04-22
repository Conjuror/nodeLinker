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

  function getLinksRelationship(a, b) {
    var result = "";
    for (var lnk = 0 ; lnk < links.length ; lnk++) {
      if (links[lnk]['source']['name'] == a && links[lnk]['target']['name'] == b) {
        result = links[lnk].relationship;
        break;
      }
      else if (links[lnk]['source']['name'] == b && links[lnk]['target']['name'] == a) {
        result = links[lnk].revrel;
        break;
      }
    }
    return result;
  }

  function getLinksOrder(src, des) {
    var result = -1;
    a = availableNodes[src];
    b = availableNodes[des];
    for (lnk = 0 ; lnk < links.length ; lnk++) {
      if ((links[lnk]['source']['name'] == a && links[lnk]['target']['name'] == b) || 
          (links[lnk]['source']['name'] == b && links[lnk]['target']['name'] == a)) {
        result = links[lnk]['id'];
        break;
      }
    }
    // console.log('Get Link Order->' + src + ' ' + des + ' ' + result);
    return result;
  }

  function getPaths(a, b) {
    src = availableNodes.indexOf(a);
    des = availableNodes.indexOf(b);
    
    // console.log(src + ' > ' + des);

    // TODO: replace the logic for multiple paths
    description = [];
    selectedRoutes = [];
    selectedRoutes.push([]);
    for (c = 0 ; c < selectedRoutes.length ; c++) {
      if (c == 0) {
        // new path
        description[0] = "<div>";
        now = src;
      }
      else {
        now = availableNodes.indexOf(selectedRoutes[c][selectedRoutes[c].length-1]);
      }
      while (map[now][des][0]['distance'] > 0) {
        for (l = map[now][des].length-1 ; l >= 0 ; l--) {
          if (l == 0) {
            k = c;
          }
          else {
            k = selectedRoutes.length;
            currentRoute = selectedRoutes[c].slice(0);
            currentDescription = description[c].slice(0);
            selectedRoutes.push(currentRoute);
            description.push(currentDescription);
          }
          nxt = map[now][des][l]['next'];
          nowNode = availableNodes[now];
          nxtNode = availableNodes[nxt];
          selectedRoutes[k].push(getLinksOrder(now, nxt));
          selectedRoutes[k].push(nxtNode);
          rel = getLinksRelationship(nowNode, nxtNode);
          description[k] += nowNode + "(" + rel + ")" + nxtNode + "<br>";
          if (l == 0) {
            now = nxt;
          }
        }
      }
      selectedRoutes[c].pop();
      description[c] += "</div>";
    }

    // description = "<div>";
    // now = src;
    // selectedRoutes = [];
    // selectedRoutes.push([]);
    // for (i = 0 ; i < map[src][des][0]['distance'] ; i++) {
    //   nxt = map[now][des][0]['next'];
    //   nowNode = availableNodes[now];
    //   nxtNode = availableNodes[nxt];
    //   selectedRoutes[0].push(getLinksOrder(now, nxt));
    //   selectedRoutes[0].push(nxtNode);
    //   rel = getLinksRelationship(nowNode, nxtNode);
    //   description += nowNode + "(" + rel + ")" + nxtNode + "<br>";
    //   now = nxt;
    // }
    // selectedRoutes[0].pop();
    // description += "</div>";
    drawAccordion(description);
    highlightSelectedRoutes(0);
    console.log(selectedRoutes);
  }

  function highlightSelectedRoutes(index) {
    $(".route").each(function() {
      originClass = $(this).attr("class");
      $(this).attr("class", originClass.replace(" route", ""));
    });
    for (i = 0 ; i < selectedRoutes[index].length ; i++) {
      originType = $("#"+selectedRoutes[index][i]).attr("class");
      $("#"+selectedRoutes[index][i]).attr("class", originType+" route");
    }
  }

  function drawAccordion(description) {
    for (i = 0 ; i < description.length ; i++) {
      $("#accordion").append("<h3> Path " + i + "</h3>");
      $("#accordion").append(description[i]);      
    }
    $("#accordion").accordion("refresh");
    $("#accordion").accordion("refresh");
    $(".ui-accordion-header").on("click", function() {
      highlightSelectedRoutes($(this)[0].id.split('-').pop());
    });
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
      if ($("#targetText").val() != nodeId) {
        $("#sourceText").val(nodeId);
      }
      else if ($("#sourceText").val() != nodeId) {
        $("#targetText").val(nodeId);
      }
    }
    else if (selectedNode.length == 1) {
      // select second node
      $(this).attr("class", "node selected");
      selectedNode.push($(this).attr("id"));
      if ($("#sourceText").val() != nodeId && availableNodes.indexOf($("#sourceText").val()) != -1) {
        $("#targetText").val(nodeId);
      }
      else if ($("#targetText").val() != nodeId && availableNodes.indexOf($("#targetText").val()) != -1) {
        $("#sourceText").val(nodeId);
      }

      // add routes
      console.log("calculate route: " +$("#sourceText").val() + " -> " + $("#targetText").val() );
      getPaths($("#sourceText").val(), $("#targetText").val());
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
    map[des][src][0] = {"next": src, "distance": 1};
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
