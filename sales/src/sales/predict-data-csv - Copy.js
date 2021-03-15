/* eslint-disable no-unused-vars,no-undef  */
// import * as fs from 'fs'
// import _ from 'lodash'
// import { readFileSync } from 'fs';
import { first, map, pullAt, dropRightWhile, isEqual, isNaN } from 'lodash';
import Axios from "axios"; // Import Axios or use Fetch.

function extractColumns(data, columnNames) {
  // console.log('extractColumns:', columnNames);
  const headers = first(data);
  const indexes = map(columnNames, column => headers.indexOf(column));
  const extracted = map(data, row => pullAt(row, indexes));
  return extracted;
}

export default function dataCSV(
  filename,
  {
    dataColumns = [],
    converters = {}
  }
) {
  // let data = readFileSync(filename, { encoding: 'utf-8' });
  // let data = Axios(filename).then(res => setText(res.data)); // This will have your text inside data attribute
  let data = Axios(filename).then(res => res.data); // This will have your text inside data attribute
  data = map(data.split('\n'), d => d.split(','));
  data = dropRightWhile(data, val => isEqual(val, ['']));
  const headers = first(data);

  data = map(data, (row, index) => {
    if (index === 0) {
      return row;
    }
    return map(row, (element, index) => {
      if (converters[headers[index]]) {
        const converted = converters[headers[index]](element);
        return isNaN(converted) ? element : converted;
      }

      const result = parseFloat(element.replace('"', ''));
      return isNaN(result) ? element : result;
    });
  });

  data = extractColumns(data, dataColumns);
  data.shift();
  // console.log('data:', data);
  return { observations: data };


}
