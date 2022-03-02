d3.json('data/zipcode.json').then(json => {
    json = topojson.feature(json, json.objects.collection);

    var svg = d3.select('#svg2'),
        width = +svg.attr('width'),
        height = +svg.attr('height');

    var projection = d3.geoMercator()
        .fitSize([width, height], json);

    //🚧  try and explain
    projection = d3.geoMercator()
    .center([ -118.300, 34.295 ])
    .translate([ width * 0.5, height * 0.5 ])
    .scale([ 10000 ]);

    path = d3.geoPath()
        .projection(projection);

    svg.append('g')
        .attr('class', 'cities')
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .on('mouseenter', function (d) {
            svg.select('.selected')
                .classed('selected', false);
            d3.select(this)
                .classed('selected', true);
            d3.select('#info2')
                .text('properties = ' + JSON.stringify(this.__data__.properties, null, 2));
        });
});