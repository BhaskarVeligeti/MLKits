/* Express.js, or simply Express, is a back end web application framework for Node.js */
require('@tensorflow/tfjs-node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');
const requireAuth = require('./middlewares/requireAuth');
const hostname = 'localhost' //'127.0.0.1';
const port = 4002;
// var dt = require('./linearregression/lrindex'); // command line testing


// step 1:create an express application.
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(routes);
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.username}`);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// console.log(`Predict Total Bill Amount = ${dt.process('junesales')} Billions`);// junesales /maysales  // command line testing
