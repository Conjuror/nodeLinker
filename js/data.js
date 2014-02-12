
var links = [
  {source: "海洋生物", target: "脊椎動物", type: "contain", id: 1},
  {source: "脊椎動物", target: "魚綱", type: "contain", id: 2},
  {source: "脊椎動物", target: "爬蟲綱", type: "contain", id: 3},
  {source: "脊椎動物", target: "哺乳綱", type: "contain", id: 4},
  {source: "魚綱", target: "無頷魚", type: "contain", id: 5},
  {source: "魚綱", target: "軟骨魚", type: "contain", id: 6},
  {source: "魚綱", target: "條鰭魚", type: "contain", id: 7},
  {source: "爬蟲綱", target: "海龜科", type: "contain", id: 8},
  {source: "哺乳綱", target: "鯨豚目", type: "contain", id: 9},
  {source: "哺乳綱", target: "食肉目", type: "contain", id: 10},
  {source: "無頷魚", target: "八目鰻", type: "contain", id: 11},
  {source: "無頷魚", target: "盲鰻", type: "contain", id: 12},
  {source: "軟骨魚", target: "魟魚", type: "contain", id: 13},
  {source: "軟骨魚", target: "白眼鯊", type: "contain", id: 14},
  {source: "軟骨魚", target: "鯨鯊", type: "contain", id: 15},
  {source: "條鰭魚", target: "飛魚", type: "contain", id: 16},
  {source: "條鰭魚", target: "翻車魨", type: "contain", id: 17},
  {source: "條鰭魚", target: "鮭魚", type: "contain", id: 18},
  {source: "條鰭魚", target: "比目魚", type: "contain", id: 19},
  {source: "海龜科", target: "綠蠵龜", type: "contain", id: 20},
  {source: "海龜科", target: "赤蠵龜", type: "contain", id: 21},
  {source: "海龜科", target: "欖蠵龜", type: "contain", id: 22},
  {source: "海龜科", target: "革龜", type: "contain", id: 23},
  {source: "海龜科", target: "玳瑁", type: "contain", id: 24},
  {source: "食肉目", target: "海豹科", type: "contain", id: 25},
  {source: "食肉目", target: "海獅科", type: "contain", id: 26},
  {source: "食肉目", target: "海象科", type: "contain", id: 27},
  {source: "鯨豚目", target: "海豚科", type: "contain", id: 28},
  {source: "鯨豚目", target: "鬚鯨", type: "contain", id: 29},
  {source: "鬚鯨", target: "藍鯨", type: "contain", id: 30},
  {source: "海獅科", target: "飛魚", type: "resolve", id: 31},
  {source: "海豚科", target: "藍鯨", type: "suit", id: 32},
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