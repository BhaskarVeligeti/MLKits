const tf = require('@tensorflow/tfjs');
const _ = require('lodash')


/** This is javascript class */

/** ---------- Vectorized Linear Regression Gradient Descent ----------
        step 1: Constructor to make "features" and "labels" into tensors
        step 2: Standardization 
        step 3: Append a column of 1's to the "features" tensor
        step 4: Make a tensor for our weights as well with initial values 0
        step 5:    Slope of MSE with respect to M and B =        Features * ((Features*Weights)-Labels)
                                                      ---------------------------------------
                                                                        n
              Labels = Tensor of our label data
              Features = Tensor of our feature data
              n        =  Number of observations
              weights =  M and B in a tensor  
        
        step 6: Custom Optimization of Learning Rate
        Vectorized Mean Squared Erro = sum( ((Features*Weights)-Labels)sqrt 2 )
                                        ---------------------------------------
                                                        n
                            
----------------------------------------*/

class LinearRegression {

    standardize(features) {
        const { mean, variance } = tf.moments(features, 0)
        this.mean = mean;
        this.variance = variance;
        return features.sub(mean).div(variance.pow(0.5))
    }


    processFeatures(features) {
        features = tf.tensor(features); //step 1: Constructor to make "features" and "labels" into tensors
        //step 2: Standardization 
        /* not first time */
        if (this.mean && this.variance) {
            features = features.sub(this.mean).div(this.variance.pow(0.5))
        } else {
            /* first time only */
            features = this.standardize(features)
        }

        features = tf.ones([features.shape[0], 1]).concat(features, 1) //step 3: Append a column of 1's to the "features" tensor

        return features
    }

    recordMSE() {
        const mse = this.features.matMul(this.weights)
            .sub(this.labels)
            .pow(2)
            .sum()
            .div(this.features.shape[0])
            .get();
        this.mseHistory.unshift(mse);
    }

    updateLearningRate() {
        if (this.mseHistory.length < 2) {
            return;
        }

        /* MSE went up  = bad update */
        if (this.mseHistory[0] > this.mseHistory[1]) {
            this.options.learningRate /= 2;
        } else { /* MSE went down : it is right direction  */
            this.options.learningRate *= 1.05
        }


    }


    // initial class
    constructor(features, labels, options) {
        this.features = this.processFeatures(features);
        this.labels = tf.tensor(labels);
        this.weights = tf.zeros([this.features.shape[1], 1]) //step 4: Make a tensor for our weights as well
        this.options = Object.assign({ learningRate: 0.1, iterations: 1000 }, options);
        this.mseHistory = [];
        this.bHistory = [];
    }

    /* Run one iteration of GD and update 'm' and 'b' */

    /* --------- working much faster  with TensorFlow--------- */
    gradientDescent(features, labels) { // step 5:
        /* step 1: calculate "mx+b" = Features * Weights by using Matrix Multiplication */
        const currentGuessess = features.matMul(this.weights);

        /* step 2: (Features*Weights)-Labels = Subtract Labels */
        const differences = currentGuessess.sub(labels);

        /* step 3: Features * differences */
        const slopes = features.transpose().matMul(differences).div(features.shape[0]);

        /* step 4: Multiply both slopes by learning rate and Subtract*/
        this.weights = this.weights.sub(slopes.mul(this.options.learningRate));

        // console.log(' Slope of MSE with respect to M and B : ', this.weights)
    }


    /* Traing data */
    train() {

        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize)

        for (let i = 0; i < this.options.iterations; i++) {

            for (let j = 0; j < batchQuantity; j++) {
                const { batchSize } = this.options;
                const startIndex = j * batchSize;
                const featuresSlice = this.features.slice([startIndex, 0], [batchSize, -1])
                const labelsSlice = this.labels.slice([startIndex, 0], [batchSize, -1])
                this.gradientDescent(featuresSlice, labelsSlice);
            }
            // console.log(' mseHistory : ', this.mseHistory)
            // console.log(' Learning Rate : ', this.options.learningRate)
            // this.bHistory.push(this.weights.get(0,0))
            this.recordMSE();
            this.updateLearningRate();
        }
    }

    /* Test data */
    test(testFeatures, testLabels) {
        testFeatures = this.processFeatures(testFeatures);
        testLabels = tf.tensor(testLabels);

        /* step 3: calculate  Predictions "mx+b" = testFeatures * Weights by using Matrix Multiplication */
        const predictions = testFeatures.matMul(this.weights);
        // console.log(' predictions : ',);
        // predictions.print();

        /* step 4: calculate  Sum Squares of Residuals  (SS(res)) */
        const res = testLabels.sub(predictions).pow(2).sum().get();

        /* step 5: calculate  Total Sum of  Squares (SS(tot)) */
        const tot = testLabels.sub(testLabels.mean()).pow(2).sum().get();

        /* step 5: calculate Coefficent of Determination*/
        return 1 - res / tot


    }

    /* Prediction*/
    predict(observations) {

        /*      observations 
           [
               ['horsepower', 'weight', 'displacement'],
               ['horsepower', 'weight', 'displacement'],
               ['horsepower', 'weight', 'displacement']
           ]  
     */

        return this.processFeatures(observations).matMul(this.weights)

    }



} // end of class

module.exports = LinearRegression;

