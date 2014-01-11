
var links = [
  {source: "Root", target: "海洋", type: "contain", id: 1},
  {source: "Root", target: "海岸", type: "contain", id: 2},
  {source: "海洋", target: "水", type: "contain", id: 3},
  {source: "海洋", target: "招潮蟹", type: "contain", id:  4},
  {source: "海洋", target: "食藻螺", type: "contain", id: 5},
  {source: "海岸", target: "岩岸", type: "contain", id: 6},
  {source: "海岸", target: "沙岸", type: "contain", id: 7},
  {source: "招潮蟹", target: "沙岸", type: "relation", id: 8},
  {source: "食藻螺", target: "岩岸", type: "relation", id: 9},
  {source: "Oracle", target: "Google", type: "relation"},
  {source: "Apple", target: "HTC", type: "relation"},
  {source: "Microsoft", target: "Inventec", type: "relation"},
  {source: "Samsung", target: "Kodak", type: "resolved"},
  {source: "LG", target: "Kodak", type: "resolved"},
  {source: "RIM", target: "Kodak", type: "relation"},
  {source: "Sony", target: "LG", type: "relation"},
  {source: "Kodak", target: "LG", type: "resolved"},
  {source: "Apple", target: "Nokia", type: "resolved"},
  {source: "Qualcomm", target: "Nokia", type: "resolved"},
  {source: "Apple", target: "Motorola", type: "relation"},
  {source: "Microsoft", target: "Motorola", type: "relation"},
  {source: "Motorola", target: "Microsoft", type: "relation"},
  {source: "Huawei", target: "ZTE", type: "relation"},
  {source: "Ericsson", target: "ZTE", type: "relation"},
  {source: "Kodak", target: "Samsung", type: "resolved"},
  {source: "Apple", target: "Samsung", type: "relation"},
  {source: "Kodak", target: "RIM", type: "relation"},
  {source: "Nokia", target: "Qualcomm", type: "relation"}
];

var routes = [
  {"nodes": ["海洋", "海岸"], "path": [
    {"route": [4, 7, 8], "node": ["招潮蟹", "沙岸"]},
    {"route": [2, 5, 9], "node": ["岩岸", "食藻螺"]}]},
  {"nodes": ["海洋", "沙岸"], "path": [
    {"route": [4, 8], "node": ["招潮蟹"]}]},
  {"nodes": ["海洋", "岩岸"], "path": [
    {"route": [5, 9], "node": ["食藻螺"]}]},
  {"nodes": ["海洋", "食藻螺"], "path": [
    {"route": [5], "node": []}]},
  {"nodes": ["海洋", "招潮蟹"], "path": [
    {"route": [4], "node": []}]},
  {"nodes": ["海洋", "水"], "path": [
    {"route": [3], "node": []}]},
  {"nodes": ["海岸", "沙岸"], "path": [
    {"route": [7], "node": []}]},
  {"nodes": ["海岸", "岩岸"], "path": [
    {"route": [6], "node": []}]},
  {"nodes": ["海岸", "食藻螺"], "path": [
    {"route": [6, 9], "node": ["岩岸"]}]},
  {"nodes": ["海岸", "招潮蟹"], "path": [
    {"route": [7, 8], "node": ["沙岸"]}]},
  {"nodes": ["水", "招潮蟹"], "path": [
    {"route": [3, 4], "node": ["海洋"]}]},
  {"nodes": ["水", "食藻螺"], "path": [
    {"route": [3, 5], "node": ["海洋"]}]},
  {"nodes": ["水", "岩岸"], "path": [
    {"route": [3, 5, 9], "node": ["海洋", "食藻螺"]}]},
  {"nodes": ["水", "沙岸"], "path": [
    {"route": [3, 4, 8], "node": ["海洋", "招潮蟹"]}]},
  {"nodes": ["水", "海岸"], "path": [
    {"route": [3, 5, 9, 6], "node": ["海洋", "食藻螺", "岩岸"]},
    {"route": [3, 4, 8, 7], "node": ["海洋", "招潮蟹", "沙岸"]}]},
  {"nodes": ["招潮蟹", "食藻螺"], "path": [
    {"route": [4, 5], "node": ["海洋"]}]},
  {"nodes": ["招潮蟹", "岩岸"], "path": [
    {"route": [4, 5, 9], "node": ["海洋", "食藻螺"]},
    {"route": [8, 7, 6], "node": ["沙岸", "海岸"]}]},
  {"nodes": ["招潮蟹", "沙岸"], "path": [
    {"route": [8], "node": []}]},
  {"nodes": ["食藻螺", "岩岸"], "path": [
    {"route": [9], "node": []}]},
  {"nodes": ["食藻螺", "沙岸"], "path": [
    {"route": [4, 5, 8], "node": ["海洋", "招潮蟹"]},
    {"route": [9, 7, 6], "node": ["岩岸", "海岸"]}]},
  {"nodes": ["岩岸", "沙岸"], "path": [
    {"route": [7, 6], "node": ["海岸"]}]}
];

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

function getRoutes(a, b) {
  for (var i in routes) {
    if (routes[i].nodes.indexOf(a) != -1 && routes[i].nodes.indexOf(b) != -1) {
      break;
    }
  }
  return routes[i];
}

// set a click event, add an event listener to every circle, when they are selected, change the color to yellow
// You can not use addClass for svg
$("circle").on("click", function() {
  if ($(this).attr("class").indexOf("selected") != -1 && selectedNode.length == 2) {
    $(".route").each(function() {
      $(this).attr("class", $(this).attr("class").replace(" route", ""));
    });
    $(this).attr("class", "node");
    selectedNode.splice(selectedNode.indexOf($(this).attr("id")), 1);
  }
  else if ($(this).attr("class").indexOf("selected") != -1) {
    // selected
    $(this).attr("class", "node");
    selectedNode.splice(selectedNode.indexOf($(this).attr("id")), 1);
  }
  else if (selectedNode.length == 0) {
    $(this).attr("class", "node selected");
    selectedNode.push($(this).attr("id"));
  }
  else if (selectedNode.length == 1) {
    $(this).attr("class", "node selected");
    selectedNode.push($(this).attr("id"));
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
  }
});