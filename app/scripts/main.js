/*global d3:false, console:false */
var deb;
(function() {
  'use strict';
  var jsonData;
var svg;
  d3.json('data/data.json',function (error, json) {
    jsonData = json;
    deb=jsonData;
    getMax();
    raster();
  });

  function getMax() {
    return 40;
  }

  function raster() {
    var w = 600;
    var h = 400;
    var rectW = 10;
    var rectH = 10;
    var rectPadding = 3;
    var labelPadding = 80;
    var padding = 15;
    var scale = d3.scale.linear();
    scale.domain([0,getMax()]);
    scale.range([0,255]);

    svg = d3.select('#graph')
      .append('svg')
      .attr('width', w)
      .attr('height',h);
    svg.append('line')
    .attr('x1',120)
    .attr('y1',0)
    .attr('x2',120)
    .attr('y2',120)
    .attr('stroke','#000')
    .attr('stroke-width',3);
    var g = svg.selectAll('g')
      .data(jsonData).enter().append('g');

      d3.selectAll(jsonData).each(function(d,u) {
        //var index = u;

        svg.append('text')
          .attr('x',function() {
            return 5+padding;
          })

          .attr('y',function() {
            return u*(rectH+rectPadding)+padding+9; // 9 = ca hälfte der schrifthöhe, muss angepasst werden
          })
          .text(jsonData[u].name);
      });



    g.selectAll('rect')
    .data(function(d) {

      return d.values;
    })
    .enter().append('rect')
    .attr('x',function(d,u) {
      return u*(rectW+rectPadding)+labelPadding+padding;
      // i = zeile
      // u = spalte
      // d = wert
    })
    .attr('y',function(d,u,i) {
      return i*(rectH+rectPadding)+padding;
    })
    .attr('width',rectW)
    .attr('height',rectH)
    .attr('fill',function(d){
      return 'rgb('+scale(d)+',0,0)';
    })
.on('mouseover',function(d,u,i) {
  console.log(jsonData[i].name,d);
});
  }
}());
