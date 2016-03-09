(function() {
  'use strict';

  var date = new Date(),
      valcode = [],
      exchange = [],
      stringDate = date.toLocaleDateString('ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

  stringDate = stringDate.split('.').reverse().join('');

  var apiUrls = [
    'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=GBP&date=' + stringDate,
    'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=' + stringDate,
    'http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=' + stringDate
  ];

  function httpGet(apiUrl) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(response) {
          var headline = $(response.responseText).find('cc').text(),
            rate = $(response.responseText).find('rate').text();

          valcode.push(headline);
          exchange[headline] = rate;
          resolve();
        }
      });
    });
  }

  function createHighcharts() {
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
          pointWidth: 100
        }
      },
      series: [{
        showInLegend: false,
        name: 'текущий курс',
        data: [
          +exchange['EUR'],
          +exchange['USD'],
          +exchange['GBP']
        ]
      }]
    });
  }

  Promise
    .all(apiUrls.map(httpGet))
    .then(createHighcharts);
})();