var width = window.innerWidth - 254,
  height = 450,
  margin = {top: 0, bottom: 0, left: 0, right: 0};

var svg = d3.select("#map-wrapper").append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom);

var states = svg.append("g")
  .attr("id", "states")
  .selectAll("path");


var projection = d3.geo.albers()
  //.scale(width / 2 / Math.PI)
  //.scale(1000)
  //.translate([width / 2, height / 2])
  .origin([0, 46])
  .scale(160);

var topology,
  geometries,
  carto_features;

var pop_data = d3.map();

var carto = d3.cartogram()
    .projection(projection)
    .properties(function (d) {
      // this adds the "properties" properties to the geometries
      return d.properties;
    });

let population_data = "populations.csv"

d3.csv("populations.csv", function(data){
  data.forEach(function(d){
    pop_data.set(d.country, [d.population], d.id)
  });
});

d3.json("countries.topo.json", function(data){
  topology = data;
  geometries = topology.objects['countries'].geometries;
  var features = carto.features(topology, geometries),
    path = d3.geo.path()
      .projection(projection);

  states = states.data(features)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("id", function (d) { return (d.properties.country_name); })
      .attr("fill", "white")
      .attr("d", path)
      .attr("stroke", "black")
      .attr("idNumber", function (d) { return d.id; });

});

function reCompute() {
  document.getElementById("card-container").innerHTML = ""

  pop_data_new.forEach(function(d){
                pop_data.set(d.country, [d.population], d.id)
              });
  d3.select("#click_to_recompute").text("thinking...");
  setTimeout(function () {

    carto.value(function (d) {
      var ret = +pop_data.get(d.properties["country_name"])[0]
      return ret;
    });

    //if (carto_features == undefined)
        carto_features = carto(topology, geometries).features;

    states.data(carto_features)
      .text(function (d) {  
        return d.properties.country_name;
      })

    states.transition()
        .duration(3750)
        .each("end", function () {
            d3.select("#click_to_recompute").text("Recompute")
        })
        .attr("d", carto.path);
  }, 10);

      let articleList = getArticleNumbers()
      console.log("adding articles")
      articleList.forEach(function(d){
        findArticles(d[1], d[0]);
      })
}

function do_update() {
  console.log(pop_data)
  d3.select("#click_to_run").text("thinking...");
  setTimeout(function () {

    carto.value(function (d) {
      var ret = +pop_data.get(d.properties["country_name"])[0]
      return ret;
    });

    //if (carto_features == undefined)
        carto_features = carto(topology, geometries).features;

    states.data(carto_features)
      .text(function (d) {  
        return d.properties.ST_NM;
      })

    states.transition()
        .duration(3750)
        .each("end", function () {
            d3.select("#click_to_run").text("View by Population")
        })
        .attr("d", carto.path);
  }, 10);

}

function do_normal() {
  d3.select("#click_to_normal").text("thinking...");
  setTimeout(function () {

  var features = carto.features(topology, geometries),
    path = d3.geo.path()
      .projection(projection);

  states.data(features)
      .transition()
        .duration(3750)
        .each("end", function () {
            d3.select("#click_to_normal").text("View Normal")
        })
       .attr("d", path);
  }, 10);

};

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
