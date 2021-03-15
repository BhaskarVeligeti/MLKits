/**
 * Change server.js to have ES6+ import syntax instead of Node’s require to test that Babel transpilation is happening correctly.
 */
import path from 'path'
import express from 'express'

const app = express();

app.use(express.static(__dirname))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

const PORT = process.env.PORT || 3002

app.listen(PORT, function (err) {
    if (err) {
      return console.log(`Client Express Error:${err}....`);
    }
    console.log(`Client running at http://localhost:${PORT}`)
  });
