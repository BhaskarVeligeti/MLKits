/* eslint-disable no-unused-vars,no-undef  */
// import * as fs from 'fs'
// import _ from 'lodash'
// import shuffleSeed from 'shuffle-seed'

// import { readFileSync } from 'fs';
import { first, map, pullAt, dropRightWhile, isEqual, isNaN, isNumber } from 'lodash';
import { shuffle as _shuffle } from 'shuffle-seed';
import Axios from "axios"; // Import Axios or use Fetch.


function extractColumns(data, columnNames) {
  // console.log('extractColumns:', columnNames);
  const headers = first(data);
  const indexes = map(columnNames, column => headers.indexOf(column));
  const extracted = map(data, row => pullAt(row, indexes));
  return extracted;
}

function printFile(file) {
  console.log("printFile :", file)
  var reader = new FileReader();
  reader.onload = function (evt) {
    alert(reader.result)
  };
  reader.readAsText(new File([""], file, { type: "text/plain" }));
}

// function handleFiles(file) {
//   const fileReader = new FileReader();
//   fileReader.onload = function (e) {
//     // Use reader.result
//     alert(fileReader.result)
//   }
//   fileReader.readAsText(new File([""], file, { type: "text/plain" }));
// }

const _reader = (file) => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      alert('fileReader.result@_reader : ', fileReader.result)
      resolve(fileReader.result)
    };
    fileReader.readAsText(new File([""], file, { type: "text/plain" }));
  });
}
const _readFile =  (file) => printFile(file)

const getUploadedFile =  (file) => {

  const _file = printFile(file);
  console.log("_file :", _file)
  return _file

}

// function _reader(file) {
//   const fileReader = new FileReader();
//   console.log('_reader: ', file)
//   fileReader.onload = (e) => {
//     alert('fileReader.result@_reader : ', fileReader)
//     // resolve(fileReader.result)
//   };
//   fileReader.readAsText(new File([""], file, { type: "text/plain" }));
// }
/*


async function _readFile(file) {
  return await _reader(file);
}

function _readFile1(file) {
  return _reader(new Blob([file]));
}
*/
export default function loadCSV(filename, { dataColumns = [], labelColumns = [], converters = {}, shuffle = false, splitTest = false }) {

  // const fileReader = new FileReader();
  // fileReader.onload = function (event) {
  //   alert(fileReader.result);
  // };




  // function _reader(file) {
  //   // console.log('_reader: ', file)
  //   return new Promise((resolve, reject) => {
  //     fileReader.onload = (e) => {
  //       alert('fileReader.result@_reader : ', file,fileReader.result)
  //       resolve(fileReader.result)
  //     };
  //     fileReader.readAsText(new File([""], file, { type: "text/plain" }));
  //   });
  // }


  // function _reader1(file) {
  //   return fileReader.readAsText(new File([""], file, { type: "text/plain" }));
  // };


  // let _readFile = async (file) => await _reader(file);
  // let data = async function data() {
  //   console.log('at data(): ')
  //   return await _readFile(filename);
  // }
  // let data = async () => await _reader(filename);
  // let data = getUploadedFile('aprilsales.csv')
  let data = getUploadedFile(filename)
  // var fr = new FileReader();
  // fr.onload = function (e) {
  //   // e.target.result should contain the text
  //   console.log(e.target.result)
  // };
  // var file = new File([""], './aprilsales.csv', { type: "text/plain" });
  // let data = fr.readAsText(file);

  // let data = async () => await _readFile(filename)

  // process CSV data
  // let data = readFileSync(filename, { encoding: 'utf-8' });
  console.log('data : ', data)
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
  let labels = extractColumns(data, labelColumns);
  data = extractColumns(data, dataColumns);

  data.shift();
  labels.shift();

  if (shuffle) {
    data = _shuffle(data, 'phrase');
    labels = _shuffle(labels, 'phrase');
  }

  if (splitTest) {
    const trainSize = isNumber(splitTest)
      ? splitTest
      : Math.floor(data.length / 2);

    return {
      features: data.slice(trainSize),
      labels: labels.slice(trainSize),
      testFeatures: data.slice(0, trainSize),
      testLabels: labels.slice(0, trainSize)
    };
  } else {
    return { features: data, labels };
  }
}
