var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["relation", "contain", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; })
    .attr("id", function(d) {return d.id || -1});

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 6)
    .attr("class", "node")
    .attr("id", function(d) { return d.name; })
    .attr("title", function(d) { return d.name; })
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

// start from here

var selectedNode = [];
var src = "", des = "";

function getRoutes(a, b) {
  for (var i in routes) {
    if (routes[i].nodes.indexOf(a) != -1 && routes[i].nodes.indexOf(b) != -1) {
      break;
    }
  }
  return routes[i];
}

function drawAccordion(index, source, target, nodes, routes) {
  $("#accordion").append("<h3> Path " + index + "</h3>");
  $("#accordion").append("<div>" + "Source: " + source + "<br>" + "target: " + target + "<br>" + "nodes: " + nodes + "<br>" + "paths: " + routes + "<br>" + "</div>");
}

// set a click event, add an event listener to every circle, when they are selected, change the color to yellow
// You can not use addClass for svg
$("circle").on("click", function() {
  nodeId = $(this).attr("id");
  if (nodeId == "root") {
    return;
  }
  if ($(this).attr("class").indexOf("selected") != -1 && selectedNode.length == 2) {
    // clean
    $("#accordion").empty();
    $(".route").each(function() {
      $(this).attr("class", $(this).attr("class").replace(" route", ""));
    });
    $(this).attr("class", "node");
    selectedNode.splice(selectedNode.indexOf(nodeId), 1);
    (src == nodeId) ? src = "" : des = "";
  }
  else if ($(this).attr("class").indexOf("selected") != -1) {
    // selected
    $(this).attr("class", "node");
    selectedNode.splice(selectedNode.indexOf(nodeId), 1);
    (src == nodeId) ? src = "" : des = "";
  }
  else if (selectedNode.length == 0) {
    $(this).attr("class", "node selected");
    selectedNode.push(nodeId);
    (src == "") ? src = nodeId : des = nodeId;
  }
  else if (selectedNode.length == 1) {
    $(this).attr("class", "node selected");
    selectedNode.push($(this).attr("id"));
    (src == "") ? src = nodeId : des = nodeId;
    // add routes
    route = getRoutes(selectedNode[0], selectedNode[1]);
    route.path[0].node.forEach(function(index, pos) {
      originClass = $("circle[id='"+index+"']").attr("class");
      $("circle[id='"+index+"']").attr("class", originClass + " route");
    });
    route.path[0].route.forEach(function(index, pos) {
      originClass = $("path[id='"+index+"']").attr("class");
      $("path[id='"+index+"']").attr("class", originClass + " route");
    });

    for (var i = 0 ; i < route.path.length ; i++) {
      drawAccordion(i, selectedNode[0], selectedNode[1], route.path[i].node, route.path[i].route);
    }

    $("#accordion").accordion("refresh");
  }
  console.log(src + "/" + des);
  $("#source").val(src);
  $("#target").val(des);
});

$(function() {$("#accordion").accordion();});