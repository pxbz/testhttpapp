const xmlparser = require('express-xml-bodyparser')
const express = require('express')
const app = express();

app.use(xmlparser)

// app.get('/api/ping', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end({ping: "pong"});
// })

app.post('/api/ccc', (req, res) => {
  let { infoa } = req.body;
  res.send({"infoa":infoa, request: req.body});
});

app.post('/api', (req, res) => {
  res.send({test:"weeee", request: req.body});
});

module.exports = app