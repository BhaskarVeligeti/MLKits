const fs = require('fs');
const _ = require('lodash');

function extractColumns(data, columnNames) {
  // console.log('extractColumns:', columnNames);
  const headers = _.first(data);
  const indexes = _.map(columnNames, column => headers.indexOf(column));
  const extracted = _.map(data, row => _.pullAt(row, indexes));
  return extracted;
}

module.exports = function dataCSV(filename, { dataColumns = [], converters = {} }) {
  let data = fs.readFileSync(filename, { encoding: 'utf-8' });
  data = _.map(data.split('\n'), d => d.split(','));
  data = _.dropRightWhile(data, val => _.isEqual(val, ['']));
  const headers = _.first(data);

  data = _.map(data, (row, index) => {
    if (index === 0) {
      return row;
    }
    return _.map(row, (element, index) => {
      if (converters[headers[index]]) {
        const converted = converters[headers[index]](element);
        return _.isNaN(converted) ? element : converted;
      }

      const result = parseFloat(element.replace('"', ''));
      return _.isNaN(result) ? element : result;
    });
  });

  data = extractColumns(data, dataColumns);
  data.shift();
  // console.log('data:', data);
  return { observations: data };


};
