const express = require('express');
const app = express()
const PORT = 8080;

app.use(express.json())

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

app.get('/echo', (req, res) => {
  res.send(req)
})

app.listen(
  PORT,
  () => console.log(`it's alive on http://localhost:${PORT}`)
)



let clickCounter = 0;
document.getElementById("test").setAttribute("onclick", "aaa()");

function aaa() {
  document.getElementById("test").innerHTML = `Click counter: ${++clickCounter}`;
}