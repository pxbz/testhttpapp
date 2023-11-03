const request = require('request')
const xmlparser = require('express-xml-bodyparser')
const express = require('express')
const app = express();

// app.use(xmlparser({explicitArray:false}))

app.post('/api/ccc/estimate', xmlparser({trim: false, explicitArray: false}), (req, res, next) => {
  console.log(req.body)
  let roNumber = searchEstimateXML(req.body, "/DocumentInfo/ReferenceInfo/RepairOrderID");
  let estimatorName = searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/FirstName") + " " + searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/LastName")

  post({"RO": roNumber, "Estimator": estimatorName, "request": req})
  res.send({"RO": roNumber, "Estimator": estimatorName});
});

app.post('/api/test', express.json(), (req, res) => {
  const { RONumber } = req.body
  res.send({"RONumber":RONumber})
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
      uri: 'https://hooks.zapier.com/hooks/catch/16910047/38cjokf/',
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