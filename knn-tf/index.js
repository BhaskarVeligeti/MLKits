require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');


function knn(features, labels, predictionPoint, k) {
    const { mean, variance } = tf.moments(features, 0)
    const scaledPrediction =
        predictionPoint
            .sub(mean)
            .div(variance.pow(0.5))

    return features
        .sub(mean)
        .div(variance.pow(0.5))
        .sub(scaledPrediction)
        .pow(2)
        .sum(1)
        .pow(0.5)
        .expandDims(1)
        .concat(labels, 1)
        .unstack()
        .sort((a, b) => a.get(0) > b.get(0) ? 1 : -1)
        .slice(0, k)
        .reduce((acc, pair) => acc + pair.get(1), 0) / k;
}

let { features, labels, testFeatures, testLabels } = loadCSV('kc_house_data.csv', {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long', 'sqft_lot','sqft_living'],
    labelColumns: ['price']
});

console.log('testFeatures :', testFeatures)
console.log('testLabels :', testLabels)

// convert into tensor
features = tf.tensor(features);
labels = tf.tensor(labels);
// testFeatures = tf.tensor(testFeatures);
// testLabels = tf.tensor(testLabels);

/*
// this is fro signle location
const result = knn(features, labels, tf.tensor(testFeatures[0]), 10);
const err = 100 * (testLabels[0][0] - result) / testLabels[0][0]
console.log('Predicted Price :', result)
console.log('Expected Price :', testLabels[0][0])
console.log('Error:', err)
*/
// for all locations
testFeatures.forEach((testPoint, i) => {
    const result = knn(features, labels, tf.tensor(testPoint), 10);
    const err = 100 * (testLabels[i][0] - result) / testLabels[i][0]
    console.log('Predicted Price :', result)
    console.log('Expected Price :', testLabels[0][0])
    console.log('Error:', err)
    console.log('-----------------------------------------',)
})







