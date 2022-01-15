var data = [
    { "date" : '2013-01-01', "close" : 45 },
    { "date" : '2013-02-01', "close" : 50 },
    { "date" : '2013-03-01', "close" : 55 },
    { "date" : '2013-04-01', "close" : 50 },
    { "date" : '2013-05-01', "close" : 45 },
    { "date" : '2013-06-01', "close" : 50 },
    { "date" : '2013-07-01', "close" : 50 },
    { "date" : '2013-08-01', "close" : 52 }
  ]
          
  function tabulate(data, columns) {
      var table = d3.select('body').append('table')
      var thead = table.append('thead')
      var	tbody = table.append('tbody');
  
      // append the header row
      thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
          .text(function (column) { return column; });
  
      // create a row for each object in the data
      var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
  
      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function (row) {
          return columns.map(function (column) {
            return {column: column, value: row[column]};
          });
        })
        .enter()
        .append('td')
          .text(function (d) { return d.value; });
  
    return table;
  }
  
  // render the tables
  tabulate(data, ['date', 'close']); // 2 column table
  tabulate(data, ['date']); // table with only date column
  tabulate(data, ['close']); // table with only close column