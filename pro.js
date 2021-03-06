var width = 960,
		height = 500;
	
	var projection = d3.geo.mercator()
		.center([0, 3 ])
		.scale(200)
		.rotate([250,0]);
	
	var svg = d3.select("#chart").append("svg")
		.attr("width", width)
		.attr("height", height);
	
	var path = d3.geo.path()
		.projection(projection);
	
    var g = svg.append("g");
    
    var labels = svg.append("svg:g")
    .attr("id", "labels");
	
	// load and display the World
	d3.json("world-110m2.json", function(error, topology) {
	
	// load and display the cities
	d3.csv("cities.csv", function(error, data) {
		g.selectAll("circle")
		   .data(data)
		   .enter()
		   .append("a")
					  .attr("xlink:href", function(d) {
						  return "https://www.google.com/search?q="+d.country;}
					  )
		   .append("circle")
		   .attr("cx", function(d) {
				   return projection([d.lon, d.lat])[0];
		   })
		   .attr("cy", function(d) {
				   return projection([d.lon, d.lat])[1];
		   })
		   .attr("r", 5)
		   .style("fill", "red");
	});
	
	
	
	g.selectAll("path")
		  .data(topojson.object(topology, topology.objects.countries)
			  .geometries)
		.enter()
		  .append("path")
		  .attr("d", path)
	});
	
	// zoom and pan
	var zoom = d3.behavior.zoom()
		.on("zoom",function() {
			g.attr("transform","translate("+ 
				d3.event.translate.join(",")+")scale("+d3.event.scale+")");
			g.selectAll("circle")
				.attr("d", path.projection(projection));
			g.selectAll("path")  
                .attr("d", path.projection(projection)); 
    
    labels.selectAll("labels")
      .data(csv)
    .enter()
    .append("svg:text")
        .attr("x", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[0]; })
        .attr("y", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[1]; })
        .attr("dy", "0.3em")
        .attr("text-anchor", "middle")
        .text(function(d) { return Math.round(d.value); });
	
	  });

	  var diameter = 500, //max size of the bubbles
    format   = d3.format(",d"),
    color    = d3.scaleOrdinal(d3.schemeCategory10);
    //more color options: https://github.com/d3/d3-scale-chromatic

var bubble = d3.pack()
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
    
	svg.call(zoom)