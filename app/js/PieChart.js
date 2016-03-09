function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
  'use strict';
  var svgns = "http://www.w3.org/2000/svg",
    chart = document.createElementNS(svgns, "svg:svg"),
    i,
    total = 0, // Общая сумма всей диаграммы
    angles = [], // Угол в радианах для каждого сектора
    startangle = 0,
    endangle,
    x1, // координаты пересечения радиусов, образующих сектор
    y1, // углу 0 радиан соответствует точка в самой верхней части окружности
    x2, // положительные значения откладываются по часовой стрелке
    y2,
    big = 0, // Флаг для углов, больших половины коружности
    path = [], // Наши сектора
    d, // контур сектора
    icon = [], // квадратик для идентификации сектора
    label = []; // метка правее квадрата


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


    d = "M " + cx + "," + cy + // Старт в центре окружности
      " L " + x1 + "," + y1 + // Нарисовать линию к точке (x1,y1)
      " A " + r + "," + r + // Нарисовать дугу с радиусом r
      " 0 " + big + " 1 " + // Информация о дуге...
      x2 + "," + y2 + // Дуга заканчивается в точке (x2,y2)
      " Z"; // Замкунть линию в точке начала (cx,cy)

    path[i].setAttribute("d", d);  
    path[i].setAttribute("fill", colors[i]); 
    path[i].setAttribute("stroke", "black"); 
    path[i].setAttribute("stroke-width", "2"); 
    chart.appendChild(path[i]); 

    startangle = endangle;

    icon[i] = document.createElementNS(svgns, "rect");
    icon[i].setAttribute("x", lx); 
    icon[i].setAttribute("y", ly + 30 * i);
    icon[i].setAttribute("width", 20); 
    icon[i].setAttribute("height", 20);
    icon[i].setAttribute("fill", colors[i]); 
    icon[i].setAttribute("stroke", "black"); 
    icon[i].setAttribute("stroke-width", "2");
    chart.appendChild(icon[i]); 


    label[i] = document.createElementNS(svgns, "text");
    label[i].setAttribute("x", lx + 30); 
    label[i].setAttribute("y", ly + 30 * i + 18);

    label[i].setAttribute("font-family", "sans-serif");
    label[i].setAttribute("font-size", "16");

    label[i].appendChild(document.createTextNode(labels[i]));
    chart.appendChild(label[i]); 
  }

  return chart;
}