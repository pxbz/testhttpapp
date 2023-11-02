// const express = require('express');
// const app = express()

// app.use(express.json())

// app.get('/tshirt', (req, res) => {
//   res.status(200).send({
//     tshirt: "red",
//     size: "large"
//   })
// });

// app.post('/tshirt:id', (req, res) => {

//   const { id } = req.params;
//   const { logo } = req.body;
  
//   if (!logo) {
//     res.status(418).send({ message: 'We need a logo!' })
//   }
//   else {
//     res.send({tshirt: `red with your ${logo} and ID of ${id}`})
//   }
// });

// app.post('/echo', (req, res) => {
//   res.send(req)
// })

// app.listen()