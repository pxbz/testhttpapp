const app = require('express')();

// app.get('/api/ping', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end({ping: "pong"});
// })

app.post('/api', (req, res) => {
  res.send({test:"weeee", request: req});
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app