$(document).ready(function() {
  var date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    valcode = [],
    exchange = [];

  day = day;
  day = (day < 10) ? '0' + day : day;
  month = (month < 9) ? '0' + (++month) : (++month);

  var getEUR = function() {
    var d = $.Deferred();
    $.ajax({
      url: 'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=' + year + month + day,
      type: 'GET',
      success: function(res) {
        var headline = $(res.responseText).find('cc').text(),
          rate = $(res.responseText).find('rate').text();
        valcode.push(headline);
        exchange[headline] = rate;
        d.resolve();
      }
    });
    return d;
  };

  var getUSD = function() {
    var d = $.Deferred();
    $.ajax({
      url: 'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=' + year + month + day,
      type: 'GET',
      success: function(res) {
        var headline = $(res.responseText).find('cc').text(),
          rate = $(res.responseText).find('rate').text();
        valcode.push(headline);
        exchange[headline] = rate;
        d.resolve();
      }
    });
    return d;
  };

  var getGBP = function() {
    var d = $.Deferred();
    $.ajax({
      url: 'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=GBP&date=' + year + month + day,
      type: 'GET',
      success: function(res) {
        var headline = $(res.responseText).find('cc').text(),
          rate = $(res.responseText).find('rate').text();
        valcode.push(headline);
        exchange[headline] = rate;
        d.resolve();
      }
    });
    return d;
  };


  $.when(
      getEUR(),
      getUSD(),
      getGBP())
    .done(function() {
      $('.result').highcharts({
        chart: {
          type: 'column',
          renderTo: 'charts',
          defaultSeriesType: 'bar'
        },
        title: {
          text: 'Курсы основных валют'
        },
        xAxis: {
          categories: ['EUR', 'USD', 'GBP']
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        plotOptions: {
            column: {
                pointWidth: 100,
            }
        },
        series: [{
          showInLegend: false,
          name: 'текущий курс',
          data: [+exchange['EUR'], +exchange['USD'], +exchange['GBP']]
        }]
      });

    });
});