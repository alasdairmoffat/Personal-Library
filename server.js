const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(cors({ origin: '*' })); // USED FOR FCC TESTING PURPOSES ONLY!

app.use(
  helmet({
    noCache: true,
    hidePoweredBy: { setTo: 'PHP 4.2.0' },
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/').get((req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
apiRoutes(app);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res
    .status(404)
    .type('text')
    .send('Not Found');
});

// Start our server and tests!
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        const error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

function stop() {
  mongoose.connection.close();
  server.close();
}

module.exports = app; // for unit/functional testing
module.exports.stop = stop;
