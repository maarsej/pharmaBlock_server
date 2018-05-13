const express = require('express');
const cors = require('cors')
const router = express.Router();
const bcrypt = require('bcrypt');
const block = require('../chainHelpers.js');


router.all('*', cors());

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    knex.select('public_address', 'username', 'password').from('patients').where('email', req.body.email)
      .then((qres) => {
        if (qres.length === 1) {
          if (bcrypt.compareSync(req.body.password, qres[0].password)) {
            req.session.userId = qres[0].public_address;
            res.status(200).json({ userId: req.session.userId, userName: qres[0].username, userType: 'patient' });
          } else {
            res.status(401);  // found patient, but password failed
          }
        } else {
          knex.select('public_address', 'company_name', 'password').from('pharmacos').where('email', req.body.email)
            .then((qres) => {
              if (qres.length === 1) {
                if (bcrypt.compareSync(req.body.password, qres[0].password)) {
                  req.session.userId = qres[0].public_address;
                  res.status(200).json({ userId: req.session.userId, userName: qres[0].company_name, userType: 'pharma' });
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
  router.get('/logout', (req, res) => {
    req.session = null;
  });

  router.get('/', (req, res) => {
    res.status(200).send('<h1>Here it is.</h1>');
  });

  // return all contracts for patient [{id: cId, name: res.brand_name, company: res.company_name + blockchain info } ...]
  router.get('/patients/:public_address/contracts', (req, res) => {
  knex('contracts')
    .join('drugs', 'drugs.id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address AS cId', 'contracts.end_date', 'pharmacos.company_name', 'drugs.brand_name')
    .where('patient_pubaddr', req.params.public_address)
    .then((qres) => {
      let response = qres.map((contract) => {
        if (contract.end_date) {
          let bArr = block.findFilled(contract.cId);
          let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], costPerDose: bArr[4], type: 'filled'};
          return output;
        } else {
          let blockInfoArray = block.find(contract.cId);
          let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], type: 'pending'};
          return output;
        }
      })
      return response;
    })
    .then(response => res.json(response));
  });

  // create prescription, submit bids from companies with that drug id, return all contracts
  router.post('/patients/:public_address/contracts', (req, res) => {

    let contractAddress = block.create(req.body.drugId, req.body.dosage, req.body.numberOfDoses, req.body.frequencyOfDose);
 
    knex('contracts')
    .returning('id')
    .insert({
      public_address: contractAddress,
      patient_pubaddr: req.params.public_address,
      drug_id: req.body.drugId
    })
    .then(qres => res.json(qres));

    // submit bids from pharmacos (helper function calls 'post bid' route below)
    //return all contracts as a follow up request from front end
  });

  // returns specific contract by contract id
  router.get('patients/:public_address/contracts/:cId', (req, res) => {
    knex.select()
      .from('contracts')
      .where('contract_address', req.params.cId)
      .then((qres) => {
        let response = qres.map((contract) => {
          if (contract.end_date) {
            let bArr = block.findFilled(contract.cId);
            let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], costPerDose: bArr[4], type: 'filled'};
            return output;
          } else {
            let blockInfoArray = block.find(contract.cId);
            let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], type: 'pending'};
            return output;
          }
        })
        return response
      })
      .then(response => res.json(response));
  });

  // fill prescription (accept bid)
  router.post('/patients/:public_address/contracts/:oldCId', (req, res) => {
      // expecting bid info
      // get info from old Prescription contract @ oldcID
      // fillPrescription.new get newCID
      let info = block.find(req.params.oldCId)
      let newCId = block.sign(info.drugId, info.dosage, info.numberOfDoses, info.frequencyOfDose,
                              req.body.costPerDose, req.body.startDate, req.body.endDate, req.body.pharma_address);

      //db concerns
      // add new contract to database @ newCID AND delete contract from database @ oldcID
    knex('contracts')
    .where('public_address', req.params.oldCId)
    .del()
    .then(() => {
      knex('contracts')
      .returning('id')
      .insert({
        public_address: newCId,
        patient_pubaddr: req.params.public_address,
        drug_id: info.drugId,
        end_date: req.body.endDate
      })  
      .then(qres => res.json(qres));
    });  
    //return all contracts as a follow up request from front end
  });    
  
  // patient info
  router.get('/patients/:public_address', (req, res) => {
    knex.select('public_address', 'email', 'username', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.params.public_address)
      .then((qres) => res.json(qres));
  });

  // basic pharmaceutical company, all contracts info
  router.get('/pharmacos/:public_address/contracts', (req, res) => {
    knex('contracts')
    .join('drugs', 'drugs.id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address', 'contracts.end_date', 'pharmacos.company_name', 'drugs.brand_name')
    .where('contracts.pharmaco_pubaddr', req.params.public_address)
    .then((qres) => {
      let response = qres.map((contract) => { 
        if (contract.end_date) {
          let bArr = block.findFilled(contract.cId);
          let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], costPerDose: bArr[4], type: 'filled'};
          return output;
        } else {
          let blockInfoArray = block.find(contract.cId);
          let output = {cId: contract.cId, end_date: contract.end_date, company_name: contract.company_name, brand_name: contract.brand_name, drugId: bArr[0], dosage: bArr[1], numberOfDoses: bArr[2], frequencyOfDose: bArr[3], type: 'pending'};
          return output;
        }
      })
      return response
    })
    .then(response => res.json(response));
  });
  
  // pharmaceutical company info
  router.get('/pharmacos/:public_address', (req, res) => {
    knex.select('company_name', 'contact_name', 'email', 'address', 'city', 'postal_code')
    .from('pharmacos')
    .where('public_address', req.params.public_address)
    .then(qres => res.json(qres));
  });

  router.post('/pharmacos/bid/:cId', (req, res) => {
    knex('contracts')
    .join('drugs', 'contracts.drug_id', 'drugs.id')
    .where('contracts.public_address', req.params.cId)
    .select(`drugs.pharmaco_pubaddr, ${req.params.cId} as contract_pubaddr`, drugs.price_per_mg)
    .then(selectResult => {
      return knex('bids')
      .returning('id')
      .insert(selectResult);  
    })
    // knex('contracts')
    // .join('drugs', 'contracts.drug_id', 'drugs.id')
    // .where('contracts.public_address', req.params.cId)
    // .select('drugs.price_per_mg, drugs.pharmaco_pubaddr')
    // .then(selectResult => {
    //   return knex('bids')
    //   .returning('id')
    //   .insert({
    //     pharmaco_pubaddr: selectResult.pharmaco_pubaddr,
    //     contract_pubaddr: req.params.cId,
    //     price_per_mg: selectResult.price_per_mg
    //   });  
    // })  
    .then(insertResult => res.json(insertResult));
  });  
  
  return router;
}