const tf = require('@tensorflow/tfjs');
const _ = require('lodash')

/** This is javascript class */

/** ---------- Gradient Descent ----------

        step 1: Pick a value for 'm' and 'b'
        step 2: Calculate the slope of MSE wih respect to 'm' and 'b'
        step 3: Are both slopes very small?If so, we are done!
        step 4: Multiply both slopes by learning rate
        step 5: Subtract results from 'm' and 'b'

----------------------------------------*/

class LinearRegression {
    // initial class
    constructor(features, labels, options) {
        this.features = features;
        this.labels = labels;
        this.options = Object.assign({ learningRate: 0.1, iterations: 1000 }, options);
        /**  step 1: Pick a value for 'm' and 'b'  */
        this.m = 0;
        this.b = 0;
    }

    /* Run one iteration of GD and update 'm' and 'b' */

    /* ---------  working but slow  with plain array --------- */
    gradientDescent() {
        /* Mean Squared Error : How good or bad our guesses */
        // mx+b :
        const currentGuessessForMPG = this.features.map(row => {
            return this.m * row[0] + this.b;
        })
        // console.log(' Current Guessess For MPG : ', currentGuessessForMPG)

        /* step 2: Slope of MSE with respect to B */
        const bSlope = (_.sum(currentGuessessForMPG.map((guess, i) => {
            return guess - this.labels[i][0];
        })) * 2) / this.features.length;

        // console.log(' Slope of MSE with respect to B : ', bSlope)

        /* step 2: Slope of MSE with respect to M */
        const mSlope = (_.sum(currentGuessessForMPG.map((guess, i) => {
            return -1 * this.features[i][0] * (this.labels[i][0] - guess);
        })) * 2) / this.features.length;

        // console.log(' Slope of MSE with respect to M : ', mSlope)
        /* step 4: Multiply both slopes by learning rate*/
        /* step 5: Subtract results from 'm' and 'b'*/
        this.b = this.b - bSlope * this.options.learningRate;
        this.m = this.m - mSlope * this.options.learningRate;

    }


    /* Run GD until we get the optimal values 'm' and 'b' */
    train() {
        for (let i = 0; i < this.options.iterations; i++) {
            this.gradientDescent();
        }
    }








} // end of class

module.exports = LinearRegression;

