const request = require('request')
const xmlparser = require('express-xml-bodyparser')
const express = require('express')
const app = express();

// app.use(xmlparser({explicitArray:false}))

// app.get('/api/ping', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end({ping: "pong"});
// })

app.post('/api/ccc', xmlparser({trim: false, explicitArray: false}), (req, res, next) => {
  console.log(req.body)
  let roNumber = searchEstimateXML(req.body, "/DocumentInfo/ReferenceInfo/RepairOrderID");
  let estimatorName = searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/FirstName") + " " + searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/LastName")

  post({"RO": roNumber, "Estimator": estimatorName})
  res.send({"RO": roNumber, "Estimator": estimatorName});
});

app.post('/api/test', (req, res) => {
  console.log(req + "111111111")
  console.log(req.params)
  res.send({"received":"yes!"})
})

app.post('/api', (req, res) => {
  res.send({test:"weeee", request: req.body});
});

function searchEstimateXML(toSearch, xmlPath) {
  return searchXML(toSearch, ("VehicleDamageEstimateAddRq" + xmlPath).toLowerCase())
}

function searchXML(toSearch, xmlPath) {
  let xmlPathArr = xmlPath.split("/")
  if (xmlPathArr.length == 1) {
    return toSearch[xmlPath];
  }
  else {
    let firstElement = xmlPathArr.shift()
    return searchXML(toSearch[firstElement], xmlPathArr.join("/"))
  }
}


function post(postData){
  var clientServerOptions = {
      uri: 'https://eo7q6qtuaqkwpto.m.pipedream.net',
      body: JSON.stringify(postData),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  }
  request(clientServerOptions, function (error, response) {
      // console.log(error,response.body);
      return;
  });
}

module.exports = app

//  <VehicleDamageEstimateAddRq>
//    <DocumentInfo>
//      <ReferenceInfo>
//        <RepairOrderID>3040</RepairOrderID>
//      </ReferenceInfo>
//    </DocumentInfo>
//    <AdminInfo>
//      <Estimator>
//        <Party>
//          <PersonInfo>
//            <PersonName>
//              <FirstName>John</FirstName>
//              <LastName>Ellis</LastName>
//            </PersonName>
//          </PersonInfo>
//        </Party>
//      </Estimator>
//    </AdminInfo>
//  </VehicleDamageEstimateAddRq>