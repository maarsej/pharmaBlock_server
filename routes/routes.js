const express = require('express');
const cors = require('cors')
const router = express.Router();
const bcrypt = require('bcrypt');
const block = require('../chainHelpers.js');

router.all('*', cors());

sendJSONMergedWithBlockchainInfo = (fieldsFromDb, response) => {
  Promise.all (fieldsFromDb.map((contract) => {
    if (contract.end_date) {
      return block.findFilled(contract.cId)
    } else {
      return block.find(contract.cId)
    }
  }))
  .then ((blockchainResponse) => {
    let output = [];
    for (contractIndex = 0; contractIndex < fieldsFromDb.length; ++contractIndex) {
      let dbInfo = fieldsFromDb[contractIndex];
      let blockInfo = blockchainResponse[contractIndex];
      output.push (dbInfo.end_date ?
      { // would love to use spread operator for dbInfo fields, but it seems to be incompatible with node
        cId: dbInfo.cId,
        end_date: dbInfo.end_date,
        company_name: dbInfo.company_name,
        generic_name: dbInfo.generic_name,
        drugId: blockInfo[0],
        dosage: blockInfo[1],
        numberOfDoses: blockInfo[2],
        frequencyOfDose: blockInfo[3],
        costPerDose: blockInfo[4],
        contractStatus: 'filled'
      } : {
        cId: dbInfo.cId,
        drugId: blockInfo[0],
        dosage: blockInfo[1],
        numberOfDoses: blockInfo[2],
        frequencyOfDose: blockInfo[3],
        contractStatus: 'pending'
      });
    }
    response.json(output);
  });
}

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    console.log ('LOGIN', req.body)
    knex.select('public_address', 'username', 'password').from('patients').where('email', req.body.email)
    .then((resultFromSelect) => {
      if (resultFromSelect.length === 1) {
        if (bcrypt.compareSync(req.body.password, resultFromSelect[0].password)) {
          req.session.userId = resultFromSelect[0].public_address;
          res.status(200).json({ userId: req.session.userId, userName: resultFromSelect[0].username, userType: 'patient' });
        } else {
          res.status(401);  // found patient, but password failed
        }
      } else {
        knex.select('public_address', 'company_name', 'password').from('pharmacos').where('email', req.body.email)
        .then((resultFromSelect) => {
          if (resultFromSelect.length === 1) {
            if (bcrypt.compareSync(req.body.password, resultFromSelect[0].password)) {
              req.session.userId = resultFromSelect[0].public_address;
              res.status(200).json({ userId: req.session.userId, userName: resultFromSelect[0].company_name, userType: 'pharma' });
            } else {
              res.status(401);  // found pharmaco, but password failed
            }
          } else {
            res.status(404);  // didn't find specified email
          }  
        });  
      }    
    });  
  });    
      
  // logout request: delete cookie
  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(303);
  });  
      
  // router.get('/', (req, res) => {
  //   res.status(200).send('<h1>Here it is.</h1>');
  // });  
      
  // returns specific contract by contract id
  router.get('/patients/:public_address/contracts/:cId', (req, res) => {
    knex('contracts')  
    .join('drugs', 'drugs.generic_id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    // this "distinct" clause is a workaround for the fact that each drug may have multiple entries in the drugs table -- not ideal, but...
    .distinct('contracts.public_address AS cId', 'contracts.end_date', 'pharmacos.company_name', 'drugs.generic_name')
    .select()
    .where('contracts.public_address', req.params.cId)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(404).send('Contract not found.');
      }
    });
  });

  // fill prescription (accept bid)
  router.post('/patients/:public_address/contracts/:oldCId', (req, res) => {
    block.sign(req.params.oldCId, req.params.public_address, req.body.costPerDose, req.body.startDate, req.body.endDate, req.body.pharma_address)
    .then((newCId) => {
      knex('contracts').select('drug_id').where('public_address', req.params.oldCId)
      .then((drugIdResponse) => {
        console.log ("drugIdResponse", drugIdResponse)
        knex('contracts').where('public_address', req.params.oldCId).del()
        .then(() => {
          knex('contracts').returning('id').insert({
            public_address: newCId,
            patient_pubaddr: req.params.public_address,
            pharmaco_pubaddr: req.body.pharma_address,
            drug_id: drugIdResponse[0].drug_id,
            end_date: req.body.endDate
          })  
          .then(resultFromInsert => {
            if (resultFromInsert.length === 1) {
              res.status(200).send(`SIGNED ${req.params.oldCId}`);
            } else {
              res.status(500).send(`Failed to create replacement for ${req.params.oldCId}`);
            }
        });  
      })
    })
  });    
  
  // return all contracts for patient [{id: cId, name: res.brand_name, company: res.company_name + blockchain info } ...]
  router.get('/patients/:public_address/contracts', (req, res) => {
    knex('contracts')  
    .join('drugs', 'drugs.generic_id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    // this "distinct" clause is a workaround for the fact that each drug may have multiple entries in the drugs table -- not ideal, but...
    .distinct('contracts.public_address AS cId', 'contracts.end_date', 'pharmacos.company_name', 'drugs.generic_name')
    .select()
    .where('patient_pubaddr', req.params.public_address)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(404).send('Contract not found.');
      }  
    })  
  });  

  // create prescription, submit bids from companies with that drug id, return all contracts
  router.post('/patients/:public_address/contracts', (req, res) => {
    block.create(req.params.public_address, req.body.drugId, req.body.dosage, req.body.numberOfDoses, req.body.frequencyOfDose)
    .then((contractAddress) => {
      knex('contracts').returning('id').insert({
        public_address: contractAddress,
        patient_pubaddr: req.params.public_address,
        drug_id: req.body.drugId
      })  
      .then(resultFromInsert => res.json(resultFromInsert));
    });
    // submit bids from pharmacos (helper function calls 'post bid' route below)
    //return all contracts as a follow up request from front end
  });  

  // patient info
  router.get('/patients/:public_address', (req, res) => {
    knex.select('public_address', 'email', 'username', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.params.public_address)
      .then((resultFromSelect) => res.json(resultFromSelect));
  });

  router.get('/pharmacos/:public_address/drugs', (req, res) => {
    knex.select()
      .from('drugs')
      .where('drugs.pharmaco_pubaddr', req.params.public_address)
      .then(resultFromSelect => res.json(resultFromSelect));
  });

  // basic pharmaceutical company product info
  router.get('/pharmacos/:public_address/drugs', (req, res) => {
    knex.select()
      .from('drugs')
      .where('drugs.pharmaco_pubaddr', req.params.public_address)
      .then(qres => res.json(qres));
  });

  // basic pharmaceutical company contract info
  router.get('/pharmacos/:public_address/contracts', (req, res) => {
    knex('contracts')  
    .join('drugs', 'drugs.generic_id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    // this "distinct" clause is a workaround for the fact that each drug may have multiple entries in the drugs table -- not ideal, but...
    .distinct('contracts.public_address AS cId', 'contracts.end_date', 'pharmacos.company_name', 'drugs.generic_name')
    .select()
    .where('contracts.pharmaco_pubaddr', req.params.public_address)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(404).send('Contract not found.');
      }  
    })  
  });
  
  // pharmaceutical company info
  router.get('/pharmacos/:public_address', (req, res) => {
    knex.select('company_name', 'contact_name', 'email', 'address', 'city', 'postal_code')
    .from('pharmacos')
    .where('public_address', req.params.public_address)
    .then(resultFromSelect => res.json(resultFromSelect));
  });

  router.post('/contracts/:cId/bid', (req, res) => {
    // let response = [];
    knex('contracts')
    .join('drugs', 'contracts.drug_id', 'drugs.generic_id')
    .where('contracts.public_address', req.params.cId)
    .select('drugs.price_per_mg', 'contracts.public_address as cId', 'drugs.pharmaco_pubaddr')
    .then(resultFromSelect => {
      resultFromSelect.forEach(row => {
        knex('bids')
        .returning('*')
        .insert({
          pharmaco_pubaddr: row.pharmaco_pubaddr,
          contract_pubaddr: req.params.cId,
          price_per_mg: row.price_per_mg
        })
        // .then(insertResult => response.push(insertResult));  
      })
      res.json(resultFromSelect);
    })  
  });  
  
  return router;
}
