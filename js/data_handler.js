function updateRoute() {
  console.log(links);
}

var route = {};

function getRoute(source, destination) {

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
});
