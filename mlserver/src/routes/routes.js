const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
var dt = require('../linearregression/lrindex');
const router = express.Router();
router.use(requireAuth);

/* --------------------------------  requests : web application  --------------------------------  */
router.post('/predict', async (req, res) => {
  const { action, fileName } = req.body; //action === 1 ? 'maysales' : 'junesales'
  // console.log('fileName :', fileName); 

  try {
    const TotalBillAmount = parseFloat(dt.process(fileName));
    // const TotalBillAmount = parseFloat(1.64);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.status(200).send(`Predict Total Bill Amount = ${dt.process('maysales')} Billions`);
    // res.status(200).send(TotalBillAmount);
    return res.status(200).send({ prediction: { action, TotalBillAmount,accuracy:90.22 } });

  } catch (err) {
    return res.send({ status: 422, message: 'Internal Server Error!' })
  }





});



module.exports = router;
