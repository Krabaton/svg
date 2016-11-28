(function() {
  'use strict';
  var s = Snap('#figure'),
    color = "#2F62AD",
    R = 175, // Радиус круга 
    r = 25,
    borderdWidth = 60, // Толщина диска
    border = 5, // Толщина контура
    lineWidth = 2,
    cx = 250, // центр
    cy = 250,
    maxCoord = 2 * cx - 30, // предполагаем что область построение квадрат
    minCoord = 30,
    delay = 1000; 


  var mainCircle = s.circle(cx, cy, 0);
  // Создаем первоначальный круг
  mainCircle.attr({
    fill: "none",
    stroke: color,
    strokeWidth: border,
    strokeDasharray: 2 * R * Math.PI
  });
  // анимируем его появление
  mainCircle.animate({r: R}, delay, mina.easeinout, function() {
    // создали внутрений круг который выполняет функцию заливки
    var subCircle = s.circle(cx, cy, R).attr({
                                              fill: "none",
                                              stroke: '#fff',
                                              strokeWidth: 0,
                                              strokeDasharray: 2 * R * Math.PI
                                            });
    // анимируем увеличение толщины главного круга
    mainCircle.animate({strokeWidth: borderdWidth}, delay, mina.easeinout);
    // анимируем меньший и помним что он тоньше на 2 * border
    subCircle.animate({strokeWidth: borderdWidth - 2 * border}, delay, mina.easeinout, function() {
      var line = s.line(cx, cy, cx, cy).attr({
            stroke:color,
            strokeWidth: lineWidth,
          });
      // анимируем разрыв для кругов
      mainCircle.animate({
        strokeDasharray: 1.8 * R * Math.PI + 10,
        strokeDashoffset: -0.1 * R * Math.PI + 5
      }, delay, mina.linear);

      subCircle.animate({
        strokeDasharray: 1.8 * R * Math.PI,
        strokeDashoffset: -0.1 * R * Math.PI
      }, delay, mina.linear);
      // анимируем появление вертиклаьной оси
      line.animate({y1: maxCoord, y2: minCoord}, delay, mina.easeinout, function() {
        // создаем линию под 45 градусов
        var line45 = s.line(cx, cy, cx, cy).attr({
            stroke:color,
            strokeWidth: lineWidth,
          });
        line45.transform("r-135," + cx + "," + cy);
        var line90 = s.line(cx, maxCoord, cx, minCoord).attr({
            stroke:color,
            strokeWidth: lineWidth,
          });
        // анимируем появление двух линий горизонтальной и биссектрисы
        line45.animate({y2: maxCoord}, delay, mina.easeinout);
        line90.animate({transform: "r-90," + cx + "," + cy}, delay);

        // создаем патерн штриховки
        var p = s.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
            fill: "none",
            stroke: "#ccc",
            strokeWidth: 3
          }).pattern(0, 0, 10, 10);
        // создаем круг где будем применять штриховку
        var patternCircle = s.circle(cx, cy, R).attr({
          fill: "none",
          stroke: '#fff',
          strokeWidth: borderdWidth - 2 * border,
          strokeDasharray: 0.5 * R * Math.PI,
          strokeDashoffset: -1.5 * R * Math.PI
        });
        // применяем
        patternCircle.attr({
          stroke: p
        });
        // создаем маску левой верхней четверти, чтобы не видеть другие штриховки
        var clipRect = s.rect(0, 0, cx, cy).attr({
          fill: "#fff",
          stroke: "#ccc",
          strokeWidth: 0
        });

        patternCircle.attr({
          mask: clipRect
        });

        patternCircle.animate({
          strokeDasharray: 0.5 * R * Math.PI,
          strokeDashoffset: -1 * R * Math.PI
        }, delay);

        // создаем анимацию - знак угла
        var angleCircle = s.circle(cx, cy, r).attr({
          fill: "none",
          stroke: color,
          strokeWidth: lineWidth,
          strokeDasharray: 0.25 * r * Math.PI + ' ' + 2 * r * Math.PI,
          strokeDashoffset: -1.5 * r * Math.PI
        });
        //создаем маску для отметки угла
        var clipTriangl = s.polygon(cx, cy, 2 * cx, cy, 2 * cx, 0).attr({
          fill: "#fff",
          stroke: "none",
          strokeWidth: 0
        });

        angleCircle.attr({
          mask: clipTriangl
        });

        angleCircle.animate({strokeDashoffset: -1.75 * r * Math.PI}, delay);
      })
    });
  });

})();