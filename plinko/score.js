const outputs = [];  // Contains Obesravtion Data


/* -------------- --------------  Fundamentals -------------- -------------- -------------- 
                                  1. Features VS Labels
                                  2. Test VS Training sets of data
                                  3. Feature Normalization
                                  4. Common data structure (array of arrays)
                                  5. Feature Selection
-------------- -------------- -------------- -------------- -------------- -------------- */



/* -------------- Step 1: Identify data that is relevant to the problem --------------*/
// dropPosition, bounciness, size

/* -------------- Step 2: Assemble a set of data related to the problem you're trying to solve : --------------*/
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  //Record Obesravtion Data :  Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel])

  /* 
   console.log('Obesravtion Data : ', outputs);
   dropPosition, bounciness, size, bucketLabel
 
 trainingSet :
  [ 
    [ 340, 0.5486763985717652, 16,4],
    [ 366, 0.528283942723914,  16,4],
    [ 161, 0.5135252332011988, 16,5],
    [ 541, 0.5027592069727845, 16,6]
  ]
testSet :
  [ 
    [ 64, 0.5191095742492486,  16,5],
    [ 666, 0.5257010767601874, 16,6]
  ]
  */

}


/* --------------Step 3: Decide on the type of output you are predicting --------------*/
//This is Classification  type : because ball can only land in one of these buckets

/* -------------- Step 4: Based on type of output,pick an algorithm that will determine a correlation between your "features" and "labels" --------------*/
/*
Algorithm = K-Nearest Neighbor (knn)
            "Birds of a feather flock together"
Why  = Looking other observations very close in nature features output
*/

/*  ------------------- Finding ideal K value  -------------------
1.Records a bunch of data points
2.Split that data into a "Training" and "Test" set
3.For each "Test" record, run KNN using the "Training" data
4.Does the result of KNN equal the "Test" record bucket?
*/

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet]

}

/* Problem : Which bucket will a ball go into if dropped at 300px ? */

/* ---------------------: Implementation Process for "dropPosition" "bounciness" "size" all Independant variable :--------------------- */
/*  To calcualte distance : 3D Pythagorean Theorem
pointA = [ 340, 0.5486763985717652, 16]
pointB = [ 64, 0.5191095742492486,  16]
D = sqrt(sqaure(340-64)+sqaure(0.5486763985717652-0.5191095742492486)+sqaure(16-16))

*/
function distance(pointA, pointB) {
  return _.chain(pointA)
    .zip(pointB)   // [ [340,64], [0.5486763985717652,0.5191095742492486], [16,16] ]
    .map(([a, b]) => (a - b) ** 2)  //sqaure
    .sum()
    .value() ** 0.5; //sqrt
}

/* --------------------- Generalise KNN function ---------------------*/
function knn(trainingSet, testPoint, k) {
  return _.chain(trainingSet) /* 1: Drop a ball a bunch of times all around the board, record which bucket it goes */
    .map(row => [distance(_.initial(row), testPoint), _.last(row)]) /* 2: _.initial(row) = [ 340, 0.5486763985717652, 16]  only features testPoint = [ 64, 0.5191095742492486,  16] For each obseravtion, subtract from testPoint  ,take absolute value */
    .sortBy(row => row[0]) /* 3: Sort the result from least to gratest  */
    .slice(0, k) /* 4: Look at the "K" top records.What was the most commnon bucket?  */
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()/* 5: Whichever bucket came up most frequently is the one ours will probably go into */
    .value();
}

/* -------------- Step 5: Use model generated by algoritm to make a prediction --------------*/
function runAnalysis() {
  const testSetSize = 100;
  const k = 10;

  /*
  let numberCorrect = 0;
  for (let i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    console.log('Your point will probably into bucket : ', bucket, 'Original Bucket ', testSet[i][3]);
    if (bucket === testSet[i][3]) {
      numberCorrect++
    }
  }
*/
  /* Individual Feature  accuracy analysis : we have 3 features */
  _.range(0, 3).forEach(feature => {

    const data = _.map(outputs, row => [row[feature], _.last(row)])    /* data preparation for each Feature */
    const [testSet, trainingSet] = splitDataset(minMax(data, 1), testSetSize);   /* split data for each Feature */

    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint))
      .size()
      .divide(testSetSize)
      .multiply(100)
      .value();
    // console.log('At K :', k, ' | ', 'Accuracy : ', accuracy, '%');
    console.log('At K :', k, ' | ', 'For feature of :', feature, ' | ', 'Accuracy is : ', accuracy, '%');

  })
}

/* Features Normalisation with MinMax */
function minMax(data, featureCount) {
  const cloneData = _.cloneDeep(data);  // not modify oiginal data

  for (let i = 0; i < featureCount; i++) {
    const column = cloneData.map(row => row[i])  // column extract
    const min = _.min(column);
    const max = _.max(column);
    // scalling the values
    for (let j = 0; j < cloneData.length; j++) {
      cloneData[j][i] = (cloneData[j][i] - min) / (max - min)
    }

  }
  return cloneData
}


