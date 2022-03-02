$(document).ready(function() {

    $("#slider").slider({
        value:2000,
        min: 1971,
        max: 2006,
        step: 1,
        slide: function( event, ui ) {
            $("#year").val(ui.value);
            redraw(ui.value.toString());
        }
    });
    $("#year").val($("#slider").slider("value") );
    
    var w = 1200;
    var h = 500;
    
    //setting projection to equi rectangular 
    var xy = d3.geo.equirectangular()
              .scale(1000);
    
    var path = d3.geo.path()
        .projection(xy);
    
    var svg = d3.select("#graph").insert("svg:svg")
        .attr("width", w)
            .attr("height", h);
    
    var states = svg.append("svg:g")
        .attr("id", "states");
    
    var circles = svg.append("svg:g")
        .attr("id", "circles");
    
    var labels = svg.append("svg:g")
        .attr("id", "labels");
    
    d3.json("world_countries.json", function(collection) {
      states.selectAll("path")
          .data(collection.features)
        .enter().append("svg:path")
          .attr("d", path)
                .on("mouseover", function(d) {
                    d3.select(this).style("fill","#6C0")
                        .append("svg:title")
                        .text(d.properties.name);})
                .on("mouseout", function(d) {
                    d3.select(this).style("fill","#ccc");})
                    .on("mouseout", function(d) {
                    d3.select(this).style("fill","#ccc");})
    });
    
    
   
    
    var scalefactor=1./50. ;
    
    d3.csv("data/co2_regions.csv", function(csv) {
      circles.selectAll("circle")
          .data(csv)
        .enter()
        .append("svg:circle")
          .attr("cx", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[0]; })
          .attr("cy", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[1]; })
          .attr("r",  function(d) { return (+d["1990"])*scalefactor; })
          .attr("title",  function(d) { return d["country"]+": "+Math.round(d["1990"]); })
                .on("mouseover", function(d) {
                    d3.select(this).style("fill","lightblue");})
                .on("mouseout", function(d) {
                    d3.select(this).style("fill","purple");});
    
      labels.selectAll("labels")
          .data(csv)
        .enter()
        .append("svg:text")
            .attr("x", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[0]; })
            .attr("y", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[1]; })
            .attr("dy", "0.3em")
            .attr("text-anchor", "middle")
            .text(function(d) { return Math.round(d["1990"]); });
    
    
    });
    
    function redraw(year) {
          circles.selectAll("circle")
          .transition()
              .duration(1000).ease("linear")
              .attr("r",  function(d) { return (+d[year])*scalefactor; })
              .attr("title",  function(d) { return d["country"]+": "+Math.round(d[year]); });
    
          labels.selectAll("text")
              .text(function(d) { return d["country"]+": "+Math.round(d[year]); });
    }
    
    legend_data = [
        {
        'status' : 'North America',
        'code' : '#006400'
        },
        {
        'status' : 'OECD Pacific',
        'code' : '#006400'
        },
        {
        'status' : 'Europe',
        'code' : '#006400'
        },
        {
        'status' : 'Africa',
        'code' : '#FFFFFF'
        },
        {
        'status' : 'South America',
        'code' : '#FFFFFF'
        },
        {
        'status' : 'Middle East',
        'code' : '#FFFFFF'
        },
        {
        'status' : 'Non-OECD Europe',
        'code' : '#90EE90'
        },
        {
        'status' : 'USSR',
        'code' : '#90EE90'
        },
        
        {
        'status' : 'Asia',
        'code' : '#FFFFFF'
        },
        {
        'status' : 'China',
        'code' : '#90EE90'
        },
    
        ]
    
        function create_legend() {
       $.each(legend_data, function(index, element) {
           col = element.code;
           $('#legend').append("<table width='100%'><td align='left' style='font-size: 10px'>" + element.status + "</td><td align='right'><div class='circle' style='background: " + col + "'>&nbsp;</div></td></table>"); 
       });
    }
    
    create_legend();
    
    
    });
    