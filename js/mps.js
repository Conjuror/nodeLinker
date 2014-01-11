
var links = [
  {source: "Root", target: "海洋", type: "contain"},
  {source: "Root", target: "海岸", type: "contain"},
  {source: "海洋", target: "水", type: "contain"},
  {source: "海洋", target: "招潮蟹", type: "contain"},
  {source: "海洋", target: "食藻螺", type: "contain"},
  {source: "海岸", target: "岩岸", type: "contain"},
  {source: "海岸", target: "沙岸", type: "contain"},
  {source: "招潮蟹", target: "沙岸", type: "relation"},
  {source: "食藻螺", target: "岩岸", type: "relation"},
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
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 6)
    .attr("class", "node")
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

var selectedNode = 0;

// set a click event, add an event listener to every circle, when they are selected, change the color to yellow
$("circle").on("click", function() {
  console.log("selected, classes: " + $(this).attr("class"));
  $(this).toggleClass("selected");
  // $(this).on("click", function() {
  //   console.log("clicked, status: " + $(this).hasClass("selected") + " selected: " + selectedNode);
  //   if ($(this).hasClass("selected")) {
  //     console.log("Was not selected, SELECT IT!");
  //     $(this).removeClass("selected");
  //     selectedNode -= 1;
  //   }
  //   else if (selectedNode < 2) {
  //     console.log("Was selected, CANCEL IT!");
  //     $(this).addClass("selected");
  //     selectedNode += 1;
  //   }
  // })
});

