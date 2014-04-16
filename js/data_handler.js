function updateRoute() {
  console.log(links);
}

var route = {};

function getRoute(source, destination) {

}

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

// autocomplete
$(function(){
  for (i = 0 ; i < links.length ; i++) {
    if (availableNodes.indexOf(links[i]['source']['name']) == -1) {
      availableNodes.push(links[i]['source']['name']);
    }
    if (availableNodes.indexOf(links[i]['target']['name']) == -1) {
      availableNodes.push(links[i]['target']['name']);
    }
  }

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
    console.log("getRoutes");
    for (var i in routes) {
      if (routes[i].nodes.indexOf(a) != -1 && routes[i].nodes.indexOf(b) != -1) {
        routes[i].path[0].node.forEach(function(index, pos) {
          originClass = $("circle[id='"+index+"']").attr("class");
          $("circle[id='"+index+"']").attr("class", originClass + " route");
        });
        routes[i].path[0].route.forEach(function(index, pos) {
          originClass = $("path[id='"+index+"']").attr("class");
          $("path[id='"+index+"']").attr("class", originClass + " route");
        });

        for (var j = 0 ; j < routes[i].path.length ; j++) {
          drawAccordion(j, selectedNode[0], selectedNode[1], routes[i].path[j].node, routes[i].path[j].route);
        }

        $("#accordion").accordion("refresh");
        return routes[i];
      }
    }
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
      console.log("calculate route: " +$("#sourceText").val() + " -> " + $("#targetText").val() );
    }
  });

});

