const express = require('express');
const cors = require('cors')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const block = require('../chainHelpers.js');

router.all('*', cors());


sendJSONMergedWithBlockchainInfo = (fieldsFromDb, response) => {
  console.log('fields', fieldsFromDb)
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
      if (dbInfo.end_date) {
        output.push(
          Object.assign(
            dbInfo,
            {
              drugId: parseInt(blockInfo[0]),
              dosage: parseInt(blockInfo[1]),
              numberOfDoses: parseInt(blockInfo[2]),
              frequencyOfDose: parseInt(blockInfo[3]),
              costPerDose: parseInt(blockInfo[4]),
              contractStatus: 'filled'
            }));
      } else {
        output.push(
          Object.assign(
            dbInfo,
            {
              drugId: parseInt(blockInfo[0]),
              dosage: parseInt(blockInfo[1]),
              numberOfDoses: parseInt(blockInfo[2]),
              frequencyOfDose: parseInt(blockInfo[3]),
              contractStatus: 'pending'
            }));
      }
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
          const payload = {
            email: req.body.email
          };
          const token = jwt.sign(payload, 'secretstring');
          res.status(200).json({
            success: true,
            message: 'Successful patient login.',
            token: token,
            userId: resultFromSelect[0].public_address,
            userName: resultFromSelect[0].username,
            userType: 'patient' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid password.' });
        }
      } else {
        knex.select('public_address', 'company_name', 'password').from('pharmacos').where('email', req.body.email)
        .then((resultFromSelect) => {
          if (resultFromSelect.length === 1) {
            if (bcrypt.compareSync(req.body.password, resultFromSelect[0].password)) {
              res.status(200).json({
                success: true,
                message: 'Successful patient login.',
                token: token,
                userId: resultFromSelect[0].public_address,
                userName: resultFromSelect[0].username,
                userType: 'pharma' });
            } else {
              res.status(401).json({ success: false, message: 'Invalid password.' });
            }
          } else {
            res.status(404).json({ success: false, message: `${req.body.email} not found.` });
          }  
        });  
      }    
    });  
  });    
      
  // logout request: delete cookie
  router.post('/logout', (req, res) => {
    provider = {};
    req.session = null;
    res.status(303);
  });  
      
  // router.get('/', (req, res) => {
  //   res.status(200).('<h1>Here it is.</h1><script src="./routes/routes.js"></script>');
  // });  
      
  // returns specific contract by contract id
  router.get('/patients/:public_address/contracts/:cId', (req, res) => {
    knex('contracts')  
    .join('generic_drugs', 'generic_drugs.id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'pharmacos.public_address', 'contracts.pharmaco_pubaddr')
    .select('contracts.public_address as cId', '*')
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
    })
  });    
  
  // return all contracts for patient [{id: cId, name: res.brand_name, company: res.company_name + blockchain info } ...]
  router.get('/patients/:public_address/contracts', (req, res) => {
    knex('contracts')  
    .join('generic_drugs', 'generic_drugs.id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address as cId', '*')
    .where('patient_pubaddr', req.params.public_address)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(200).send('No contracts.');
      }  
    })  
  });  

  // create prescription, submit bids from companies with that drug id, return all contracts
  router.post('/patients/:public_address/contracts', (req, res) => {
    block.create(req.params.public_address, req.body.drugId, req.body.dosage, req.body.numberOfDoses, req.body.frequencyOfDose)
    .then((contractAddress) => {
      knex('contracts').returning('*').insert({
        public_address: contractAddress,
        patient_pubaddr: req.params.public_address,
        drug_id: req.body.drugId
      })  
      .then(resultFromInsert => {
        console.log ('after inserting contract', resultFromInsert);
        if (resultFromInsert.length === 1) {
          res.json(resultFromInsert);
        } else {
          res.status(500).send('Failed to create contract.');
        }
      });  
    });
  });  

  // patient info
  router.get('/patients/:public_address', (req, res) => {
    knex.select()
      .from('patients')
      .where('public_address', req.params.public_address)
      .then((resultFromSelect) => res.json(resultFromSelect));
  });

  // basic pharmaceutical company product info
  router.get('/pharmacos/:public_address/drugs/:id', (req, res) => {
    knex('drugs')
      .join('generic_drugs', 'generic_drugs.id', 'drugs.generic_id')
      .where('drugs.pharmaco_pubaddr', req.params.public_address)
      .andWhere('drugs.id', req.params.id)
      .then(resultFromSelect => res.json(resultFromSelect));
  });

  // basic pharmaceutical company product info
  router.get('/pharmacos/:public_address/drugs', (req, res) => {
    knex('drugs')
      .join('generic_drugs', 'generic_drugs.id', 'drugs.generic_id')
      .where('drugs.pharmaco_pubaddr', req.params.public_address)
      .then(resultFromSelect => res.json(resultFromSelect));
  });

  // basic pharmaceutical company contract info
  router.get('/pharmacos/:public_address/contracts/:cId', (req, res) => {
    knex('contracts')  
    .join('drugs', 'drugs.generic_id', 'contracts.drug_id')
    .join('generic_drugs', 'generic_drugs.id', 'contracts.drug_id')
    .join('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address AS cId', '*')
    .where('contracts.pharmaco_pubaddr', req.params.public_address)
    .andWhere('drugs.pharmaco_pubaddr', req.params.public_address)
    .andWhere('contracts.public_address', req.params.cId)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(200).send('No contracts.');
      }  
    })  
  });
  
  // basic pharmaceutical company contract info
  router.get('/pharmacos/:public_address/contracts', (req, res) => {
    knex('contracts')  
    .join('drugs', 'drugs.generic_id', 'contracts.drug_id')
    .join('generic_drugs', 'generic_drugs.id', 'contracts.drug_id')
    .join('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address AS cId', '*')
    .where('contracts.pharmaco_pubaddr', req.params.public_address)
    .andWhere('drugs.pharmaco_pubaddr', req.params.public_address)
    .then((dbResponse) => {
      if (dbResponse.length > 0) {
        sendJSONMergedWithBlockchainInfo(dbResponse, res);
      } else {
        res.status(200).send('No contracts.');
      }  
    })  
  });
  
   // pharmaceutical company info
  router.get('/pharmacos/:public_address', (req, res) => {
    knex.select()
    .from('pharmacos')
    .where('public_address', req.params.public_address)
    .then(resultFromSelect => res.json(resultFromSelect));
  });

  // current bids
  router.get('/contracts/:cId/bids', (req, res) => {
    knex('contracts')
    .join('bids', 'bids.contract_pubaddr', 'contracts.public_address')
    .join('drugs', function () {
      this.on('contracts.drug_id', 'drugs.generic_id').andOn('drugs.pharmaco_pubaddr', 'bids.pharmaco_pubaddr')
    })
    .join('generic_drugs', 'generic_drugs.id', 'drugs.generic_id')
    .where('bids.contract_pubaddr', req.params.cId)
    .select()
    .then(resultFromSelect => res.json(resultFromSelect));
  });

  router.post('/contracts/:cId/bids', (req, res) => {
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
        .catch(err => {
          res.status(err);
        })
      })
      res.json(resultFromSelect.length);
    })  
  });  
  
  return router;
}
