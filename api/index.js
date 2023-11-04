import { createRequire } from "module";
const require = createRequire(import.meta.url);
import {sql} from "@vercel/postgres"
const request = require('request')
const xmlparser = require('express-xml-bodyparser')
const express = require('express')
const app = express();

// app.use(xmlparser({explicitArray:false}))

// Create table before endpoints are set up
await sql`CREATE TABLE IF NOT EXISTS test_Estimates (
  ro_number INT NOT NULL,
  estimator_full_name VARCHAR(128) NOT NULL,
  
  PRIMARY KEY (ro_number)
);`

app.post('/api/ccc/estimate', xmlparser({trim: false, explicitArray: false}), (req, res) => {
  let roNumber = searchEstimateXML(req.body, "/DocumentInfo/ReferenceInfo/RepairOrderID")
  let estimatorName = searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/FirstName") + " " + searchEstimateXML(req.body, "/AdminInfo/Estimator/Party/PersonInfo/PersonName/LastName")

  // let roNumber = req.body.vehicledamageestimateaddrq.documentinfo.referenceinfo.repairorderid
  // let estimatorName = req.body.vehicledamageestimateaddrq.admininfo.estimator.party.personinfo.personname.firstname + " " + req.body.vehicledamageestimateaddrq.admininfo.estimator.party.personinfo.personname.lastname
  
  post({"RONumber": roNumber, "Estimator": estimatorName})
  res.send({"RO": roNumber, "Estimator": estimatorName});
  return

  let checkedInDate = req.body.vehicledamageestimateaddrq.eventinfo.repairevent.arrivaldatetime
  let bodyRepairsCompletionDate = req.body.vehicledamageestimateaddrq.eventinfo.repairevent.actualcompletiondatetime
  let pickupCompletionDate = req.body.vehicledamageestimateaddrq.eventinfo.repairevent.actualpickupdatetime
  let totalLossIndicator = req.body.vehicledamageestimateaddrq.claiminfo.lossinfo.totallossind
  let carColor = req.body.vehicledamageestimateaddrq.vehicleinfo.paint.exterior.color.colorname
  let carMake = req.body.vehicledamageestimateaddrq.vehicleinfo.vehicledesc.makedesc
  let carModel = req.body.vehicledamageestimateaddrq.vehicleinfo.vehicledesc.modelname + " " + req.body.vehicledamageestimateaddrq.vehicleinfo.vehicledesc.modelyear

  // await sql`INSERT INTO test_Estimates (ro_number, estimator_full_name)
  // VALUES (${roNumber}, ${estimatorName})
  // ON CONFLICT (ro_number) DO UPDATE 
  //   SET estimator_full_name = excluded.estimator_full_name;`

  res.send({"RO": roNumber, "Estimator": estimatorName});
});

app.post('/api/test', express.json(), async (req, res) => {
  const { RONumber, EstimatorName } = req.body

  

  const { rows } = await sql`SELECT * from test_Estimates`

  res.send({"rows": rows})
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

export default app

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