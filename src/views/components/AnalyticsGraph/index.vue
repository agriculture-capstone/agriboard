<template>
  <div :id="this.title">
    <svg width="80vw" height='33vh'></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "graph",
  data() {
    return {
    heightScaling: 0.9,
    widthScaling: 0.85,
    };
  },
  props: ["values", "title", "xUnits", "yUnits"],

  mounted() {
    /**
     * @description Create an event listener for window resizing that rerenders the graph 
     *
     * @returns New event listener created
    */
    this.$nextTick(function() {
      window.addEventListener("resize", this.redrawGraph);
    });
    //initialize the graph
    this.drawLinesGraph(
      document.getElementById(this.title).offsetHeight * this.heightScaling,
      document.getElementById(this.title).offsetWidth * this.widthScaling,
      this.values,
      this.title,
      this.xUnits,
      this.yUnits
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.redrawGraph);
  },
  methods: {
    /** 
    * @description remove the specified SVG and rerender it with the new window dimensions 
    *
    * @returns New SVG graph will be rendered in div
    */
    redrawGraph() {
      d3.select("#" + this.title)
        .selectAll("g")
        .remove();
      this.drawLinesGraph(
        document.getElementById(this.title).offsetHeight * this.heightScaling,
        document.getElementById(this.title).offsetWidth * this.widthScaling,
        this.values,
        this.title,
        this.xUnits,
        this.yUnits
      );
    },
    /**
    * @description Renders the template SVG as a D3 graph
    * 
    * @returns Rendered SVG graph in div
    */
    drawLinesGraph(
      containerHeight,
      containerWidth,
      data,
      title,
      xUnits,
      yUnits
    ) {
      let svg = d3.select("#" + title).select("svg");
      let margin = { top: 10, left: 50, bottom: 30, right: 10 };

      let height = containerHeight - margin.top - margin.bottom;
      let width = containerWidth - margin.right - margin.left;

      let g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("overflow", "hidden");

      let minX = d3.min(data, function(d) {
        return d3.min(d, function(e) {
          return e.datetime;
        });
      });
      let maxX = d3.max(data, function(d) {
        return d3.max(d, function(e) {
          return e.datetime;
        });
      });
      let minY = d3.min(data, function(d) {
        return d3.min(d, function(e) {
          return e.amountOfProduct;
        });
      });
      let maxY =
        d3.max(data, function(d) {
          return d3.max(d, function(e) {
            return e.amountOfProduct;
          });
        }) * 1.3;

      let ratio = height / width;

      let xScale = d3
        .scaleTime()
        .range([0, width])
        .domain([minX, maxX]);

      let yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([minY, maxY]);

      let line = d3
        .line()
        .x(function(d) {
          return xScale(d.datetime);
        })
        .y(function(d) {
          return yScale(d.amountOfProduct);
        });

      let colors = d3
        .scaleOrdinal()
        .domain([0, data.length])
        .range(d3.schemeCategory20);

      let xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

      let brush = d3.brush().on("end", brushended),
        idleTimeout,
        idleDelay = 350;

      let drag = d3.drag().on("drag", dragged);

      svg
        .append("g")
        .attr("class", "brush")
        .call(brush);
      // X Axis
      g
        .append("g")
        .attr("class", "axis--x")
        .attr("transform", "translate(0, " + height + ")")
        .style("font-weight", "bold")
        .call(xAxis);
      // Y Axis
      g
        .append("g")
        .attr("class", "axis--y")
        .style("font-weight", "bold")
        .call(yAxis);

      g
        .append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);

      let main = g
        .append("g")
        .attr("class", "main")
        .attr("clip-path", "url(#clip)");

      let legend = g.append("g").attr("class", "legend");
      // iterate over data and generte lines
      for (let i = 0; i < data.length; i++) {
        main
          .append("path")
          .datum(data[i])
          .attr("d", line)
          .attr("stroke", d => colors(i))
          .attr("stroke-width", 2)
          .attr("fill", "none")
          .attr("class", "line");

        main
          .selectAll(".circle")
          .data(data[i])
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return xScale(d.datetime);
          })
          .attr("cy", function(d) {
            return yScale(d.amountOfProduct);
          })
          .attr("r", 2)
          .attr("fill", "white")
          .attr("stroke", d => colors(i))
          .attr("stroke-width", 1)
          .attr("class", "circles");

        // legend
        legend = g
          .append("text")
          .data(data[i])
          .attr(
            "transform",
            "translate(" +
              (width / 1.5 + 80 + 90 * i) +
              " ," +
              height / 10 +
              ")"
          )
          .style("text-anchor", "middle")
          .style("font-size", "2.2vh")
          .attr("stroke", d => colors(i))
          .text(function(d) {
            return d.type;
          });
      }

      //voronoi

      let vorData = d3.merge(data);

      let voronoiDiagram = d3
        .voronoi()
        .x(function(d) {
          return xScale(d.datetime);
        })
        .y(function(d) {
          return yScale(d.amountOfProduct);
        })
        .size([containerWidth, containerHeight])(vorData);

      let voronoiRadius = width;

      //focus
      let focus = g.append("g").style("display", "none");

      focus
        .append("line")
        .attr("id", "focusLineX")
        .attr("class", "focusLine");
      focus
        .append("line")
        .attr("id", "focusLineY")
        .attr("class", "focusLine");
      focus
        .append("circle")
        .attr("id", "focusCircle")
        .attr("r", 4)
        .attr("class", "circle focusCircle");

      svg
        .select(".overlay")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() {
          focus.style("display", null);
        })
        .on("mouseout", function() {
          focus.style("display", "none");
        })
        .on("mousemove", function() {
          let [mx, my] = d3.mouse(this);

          // use the new diagram.find() function to find the Voronoi site
          // closest to the mouse, limited by max distance voronoiRadius
          let site = voronoiDiagram.find(mx, my, voronoiRadius);
          let x = site[0];
          let y = site[1];

          focus
            .select("#focusCircle")
            .attr("cx", x)
            .attr("cy", y);
          focus
            .select("#focusLineX")
            .attr("x1", x)
            .attr("y1", yScale(yScale.domain()[0]))
            .attr("x2", x)
            .attr("y2", yScale(yScale.domain()[1]));
          focus
            .select("#focusLineY")
            .attr("x1", xScale(xScale.domain()[0]))
            .attr("y1", y)
            .attr("x2", xScale(xScale.domain()[1]))
            .attr("y2", y);
        })
        .on("contextmenu", function() {
          this.dispatchEvent(new Event("drag"));
          d3.event.preventDefault();
        });

      function brushended() {
        let s = d3.event.selection;
        if (!s) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
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
        svg
          .select(".axis--x")
          .transition(t)
          .call(xAxis);
        g
          .select(".axis--y")
          .transition(t)
          .call(yAxis);
        g
          .selectAll(".circles")
          .transition(t)
          .attr("cx", function(d) {
            return xScale(d.datetime);
          })
          .attr("cy", function(d) {
            return yScale(d.amountOfProduct);
          });
        g
          .selectAll(".line")
          .transition(t)
          .attr("d", function(d) {
            return line(d);
          });

        voronoiDiagram = d3
          .voronoi()
          .x(function(d) {
            return xScale(d.datetime);
          })
          .y(function(d) {
            return yScale(d.amountOfProduct);
          })
          .size([containerWidth, containerHeight])(vorData);
      }

      function dragged() {
        d3
          .selectAll(".line")
          .attr("transform", `translate(${d3.event.x}, ${d3.event.y})`);
        d3
          .selectAll(".line")
          .attr("transform", `translate(${d3.event.x}, ${d3.event.y})`);
        g.select(".axis--x").call(xAxis);
        g.select(".axis--y").call(yAxis);
      }

      //Graph Title from props
      g
        .append("text")
        .attr("transform", "translate(" + width / 2 + " ," + height / 10 + ")")
        .attr("text-anchor", "middle")
        .style("font-size", "2.2vh")
        .style("text-decoration", "underline")
        .style("font-weight", "bold")
        .text(title);

      // text label for the x axis taken from props
      g
        .append("text")
        .attr(
          "transform",
          "translate(" + width / 2 + " ," + (height + margin.top * 4) + ")"
        )
        .style("text-anchor", "middle")
        .style("font-size", "2vh")
        .style("font-weight", "bold")
        .text(xUnits);

      // text label for the y axis taken from props
      g
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left + 4))
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "2vh")
        .style("font-weight", "bold")
        .text(yUnits);
    }
  }
};
</script>
<style>
body {
  font: 15px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.y.axis path {
  display: none;
}

.overlay1 {
  fill: none;
  stroke: none;
  pointer-events: all;
}

.focusLine {
  fill: none;
  stroke: steelblue;
  stroke-width: 0.5px;
}

.focusCircle {
  fill: steelblue;
}

.brush {
  width: 500;
}
</style>

