const express = require('express');
const app = express()

// app.use(express.json())

app.get('/tshirt', (req, res) => {
  res.status(200).send({
    tshirt: "red",
    size: "large"
  })
});

app.post('/tshirt:id', (req, res) => {

  const { id } = req.params;
  const { logo } = req.body;
  
  if (!logo) {
    res.status(418).send({ message: 'We need a logo!' })
  }
  else {
    res.send({tshirt: `red with your ${logo} and ID of ${id}`})
  }
});

app.post('/echo', (req, res) => {
  res.send(req)
})

app.get('/ping', (req, res) => {
  res.send({ping: "pong!"})
})

// app.get('/api', (req, res) => {
//   const path = `/api/item/v5}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

module.exports = app