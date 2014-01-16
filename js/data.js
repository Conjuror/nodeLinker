
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