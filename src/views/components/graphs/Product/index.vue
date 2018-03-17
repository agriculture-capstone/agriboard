<template>
    <svg id="product" width="80vw" height='33vh'></svg>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "product",
  mounted() {

  // generate data
    let values = [];

    values.push(fillData ());
    values.push(fillData ());
    values.push(fillData ());
    //add more pushes for more lines

    function fillData () {

      let data = [];

      let currentValue = 100;
      let random = d3.randomNormal(200, 1000);

      for(let i=0; i<40; i++) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);

        data.push([currentDate, currentValue]);
        currentValue = currentValue + random();

      }

    return data;

    }

//-------------------------------

    let drawLinesGraph = function(containerHeight, containerWidth, data, yLabel){

      let svg = d3.select('#product').append('svg')
                  .attr('width', containerWidth)
                  .attr('height', containerHeight);

      let margin = {top: 50, left: 50, bottom: 50, right: 50};

      let height = containerHeight - margin.top - margin.bottom;
      let width = containerWidth - margin.right - margin.left;

      let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('overflow', 'hidden');

      let minX = d3.min(data, function(d){ return d3.min(d, function(e){return e[0]})});
      let maxX = d3.max(data, function(d){ return d3.max(d, function(e){return e[0]})});
      let minY = d3.min(data, function(d){ return d3.min(d, function(e){return e[1]})});
      let maxY = d3.max(data, function(d){ return d3.max(d, function(e){return e[1]})});

      let ratio =  height / width;

      let xScale = d3.scaleTime()
                     .range([0, width])
                     .domain([minX, maxX]);

      let yScale = d3.scaleLinear()
                     .range([height, 0])
                     .domain([minY, maxY]);

     let line = d3.line()
         .x(function(d) { return xScale(d[0]); })
         .y(function(d) { return yScale(d[1]); });

     let colors = d3.scaleOrdinal()
          .domain([0, data.length])
          .range(d3.schemeCategory20);

    let xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

    let brush = d3.brush().on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    let drag = d3.drag().on('drag', dragged);

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

      g.append('g')
         .attr('class', 'axis--x')
         .attr('transform', 'translate(0, ' + height + ')')
         .call(xAxis);

      g.append('g')
         .attr('class', 'axis--y')
         .call(yAxis)
         .append('text')
             .attr('transform', 'rotate(-90)')
             .attr('y', 10)
             .attr('dy', '.1em')
             .attr('text-anchor', 'end')
             .attr('fill', 'rgb(54, 54, 54)')
             .attr('font-size', '1.2em')
             .text(yLabel)

      g.append('defs')
         .append('clipPath')
         .attr('id', 'clip')
         .append('rect')
           .attr('x', 0)
           .attr('y', 0)
           .attr('width', width)
           .attr('height', height);

      let main = g.append('g')
         .attr('class', 'main')
         .attr('clip-path', 'url(#clip)');



      for( let i = 0; i < data.length; i++ ){
          main.append('path')
            .datum(data[i])
            .attr('d', line)
            .attr('stroke', d => colors(i))
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'line');

          main.selectAll('.circle').data(data[i]).enter().append('circle')
            .attr('cx', function(d) { return xScale(d[0]); })
            .attr('cy', function(d) { return yScale(d[1]); })
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke', d => colors(i))
            .attr('stroke-width', 1)
            .attr('class', 'circles');
      }

      //voronoi

      let vorData = d3.merge(data);

      let voronoiDiagram = d3.voronoi()
          .x(function(d) {return xScale(d[0]); })
          .y(function(d) {return yScale(d[1]); })
          .size([containerWidth, containerHeight])(vorData);

      let voronoiRadius = width;


      //focus

      let focus = g.append('g').style('display', 'none');

      focus.append('line')
          .attr('id', 'focusLineX')
          .attr('class', 'focusLine');
      focus.append('line')
          .attr('id', 'focusLineY')
          .attr('class', 'focusLine');
      focus.append('circle')
          .attr('id', 'focusCircle')
          .attr('r', 4)
          .attr('class', 'circle focusCircle');


      svg.select('.overlay')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
          .attr('width', width)
          .attr('height', height)
          .on('mouseover', function() { focus.style('display', null); })
          .on('mouseout', function() { focus.style('display', 'none'); })
          .on('mousemove', function() {

              let [mx, my] = d3.mouse(this);

              // use the new diagram.find() function to find the Voronoi site
              // closest to the mouse, limited by max distance voronoiRadius
              let site = voronoiDiagram.find(mx, my, voronoiRadius);

              let x = site[0];
              let y = site[1];

              focus.select('#focusCircle')
                  .attr('cx', x)
                  .attr('cy', y);
              focus.select('#focusLineX')
                  .attr('x1', x).attr('y1', yScale(yScale.domain()[0]))
                  .attr('x2', x).attr('y2', yScale(yScale.domain()[1]));
              focus.select('#focusLineY')
                  .attr('x1', xScale(xScale.domain()[0])).attr('y1', y)
                  .attr('x2', xScale(xScale.domain()[1])).attr('y2', y);
          })
          .on('contextmenu', function() {
            this.dispatchEvent(new Event('drag'));
            d3.event.preventDefault();
          });
          // .on('drag', drag);


      function brushended() {
          let s = d3.event.selection;
          if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            xScale.domain([minX, maxX]);
            yScale.domain([minY, maxY]);
          } else {
            xScale.domain([s[0][0] * ratio, s[1][0]].map(xScale.invert, xScale));
            yScale.domain([s[1][1], s[0][1] * ratio].map(yScale.invert, yScale));
            svg.select(".brush").call(brush.move, null);
          }
          zoom();
        }

      function idled() {
        idleTimeout = null;
      }

      function zoom() {
        let t = svg.transition().duration(750);
        svg.select(".axis--x").transition(t).call(xAxis);
        g.select(".axis--y").transition(t).call(yAxis);
        g.selectAll(".circles").transition(t)
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); });
        g.selectAll(".line").transition(t)
            .attr("d", function(d) { return line(d); });


       voronoiDiagram = d3.voronoi()
          .x(function(d) {return xScale(d[0]); })
          .y(function(d) {return yScale(d[1]); })
          .size([containerWidth, containerHeight])(vorData);

      }

      function dragged() {
        d3.selectAll('.line')
          .attr('transform', `translate(${d3.event.x}, ${d3.event.y})`);
        d3.selectAll('.line')
          .attr('transform', `translate(${d3.event.x}, ${d3.event.y})`);
        g.select(".axis--x").call(xAxis);
        g.select(".axis--y").call(yAxis);
      }


    }

    drawLinesGraph(200, 1200, values, 'Score');
  }
};
</script>
<style>
svg {
  font-family: Sans-Serif, Arial;
}
.line {
  stroke-width: 2;
  fill: none;
}

.axis path {
  stroke: black;
}

.text {
  font-size: 12px;
}

.title-text {
  font-size: 12px;
}
</style>

