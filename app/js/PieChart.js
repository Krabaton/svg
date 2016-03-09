function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
  'use strict';
  var svgns = "http://www.w3.org/2000/svg",
    chart = document.createElementNS(svgns, "svg:svg"),
    i,
    total = 0,
    angles = [],
    startangle = 0,
    endangle,
    x1,
    y1,
    x2,
    y2,
    big = 0,
    path = [],
    d,
    icon = [],
    label = [];


  chart.setAttribute("width", width);
  chart.setAttribute("height", height);
  chart.setAttribute("viewBox", "0 0 " + width + " " + height);


  for (i = 0; i < data.length; i += 1) {
    total += data[i];
  }

  for (i = 0; i < data.length; i += 1) {
    angles[i] = data[i] / total * Math.PI * 2;
  }

  for (i = 0; i < data.length; i += 1) {

    endangle = startangle + angles[i];


    x1 = cx + r * Math.sin(startangle);
    y1 = cy - r * Math.cos(startangle);
    x2 = cx + r * Math.sin(endangle);
    y2 = cy - r * Math.cos(endangle);

    if (endangle - startangle > Math.PI) {
      big = 1;
    }

    path[i] = document.createElementNS(svgns, "path");


    d = "M " + cx + "," + cy + // Start at circle center
      " L " + x1 + "," + y1 + // Draw line to (x1,y1)
      " A " + r + "," + r + // Draw an arc of radius r
      " 0 " + big + " 1 " + // Arc details...
      x2 + "," + y2 + // Arc goes to to (x2,y2)
      " Z"; // Close path back to (cx,cy)

    path[i].setAttribute("d", d); // Set this path 
    path[i].setAttribute("fill", colors[i]); // Set wedge color
    path[i].setAttribute("stroke", "black"); // Outline wedge in black
    path[i].setAttribute("stroke-width", "2"); // 2 units thick
    chart.appendChild(path[i]); // Add wedge to chart

    startangle = endangle;

    icon[i] = document.createElementNS(svgns, "rect");
    icon[i].setAttribute("x", lx); // Position the square
    icon[i].setAttribute("y", ly + 30 * i);
    icon[i].setAttribute("width", 20); // Size the square
    icon[i].setAttribute("height", 20);
    icon[i].setAttribute("fill", colors[i]); // Same fill color as wedge
    icon[i].setAttribute("stroke", "black"); // Same outline, too.
    icon[i].setAttribute("stroke-width", "2");
    chart.appendChild(icon[i]); // Add to the chart


    label[i] = document.createElementNS(svgns, "text");
    label[i].setAttribute("x", lx + 30); // Position the text
    label[i].setAttribute("y", ly + 30 * i + 18);

    label[i].setAttribute("font-family", "sans-serif");
    label[i].setAttribute("font-size", "16");

    label[i].appendChild(document.createTextNode(labels[i]));
    chart.appendChild(label[i]); // Add text to the chart
  }

  return chart;
}