const express = require('express');
const cors = require('cors')
const router = express.Router();
const bcrypt = require('bcrypt');
const block = require('../chainHelpers.js');


router.all('*', cors());

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    knex.select('public_address', 'name', 'password').from('patients').where('email', req.body.email)
    .then((qres) => {
      if (qres.length === 1) {
        if (bcrypt.compareSync(req.body.password, qres[0].password)) {
          req.session.userId = qres[0].public_address;
          res.status(200).json({userId: req.session.userId, userName: qres[0].name, type: 'patient'});
        } else {
          res.status(401);  // found patient, but password failed
        }
      } else {
        knex.select('public_address', 'company_name', 'password').from('pharmacos').where('email', req.body.email)
        .then((qres) => {
          if (qres.length === 1) {
            if (bcrypt.compareSync(req.body.password, qres[0].password)) {
              req.session.userId = qres[0].public_address;
              res.status(200).json({userId: req.session.userId, name: qres[0].company_name, type: 'pharma'});
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
      .select('contracts.public_address AS cId', 'pharmacos.company_name', 'drugs.brand_name')
      .where('patient_pubaddr', req.params.public_address)
      // .then(qres => qres.forEach((contract) => { // maybe use a map (spread object add to it from blockchain response)
        //getInfo for every contract using block chain helpers
        //return s
      // }))
      .then(qres => res.json(qres));
  });
  
  // create prescription, submit bids from companies with that drug id, return all contracts
  router.post('patients/:public_address/contracts', (req, res) => {
    // expecting prescription info
    //create Prescription.new
    // wait for contractAddress

    //db concerns
    //add it to the database @user with :public_address
    // submit bids from pharmacos (helper function)
    //return all contracts as a follow up request from front end
  });


  // returns specific contract by contract id
  router.get('patients/:public_address/contracts/:cId', (req, res) => {
    knex.select()
      .from('contracts')
      .where('contract_address', req.params.cId)
      .then(qres => res.json(qres));
      // getInfo for contract @ cId
      // return info
  });

  // fill prescription (accept bid)
  router.post('patients/:public_address/contracts/:oldcId', (req, res) => {
      // expecting bid info
      // get info from old Prescription contract @ oldcID
      // fillPrescription.new get newCID

      //db concerns
      // add new contract to database @ newCID AND delete contract from database @ oldcID
      //return all contracts as a follow up request from front end
  });

  // patient info
  router.get('/patients/:public_address', (req, res) => {
    knex.select('public_address', 'email', 'name', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.params.public_address)
      .then((qres) => { console.log('qres', qres); res.json(qres) })
      .catch((err) => console.log(err));
  });

  // basic pharmaceutical company, all contracts info
  router.get('/pharmacos/:public_address/contracts', (req, res) => {
    knex('contracts')
      .join('drugs', 'drugs.id', 'contracts.drug_id')
      .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
      .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('contracts.pharmaco_pubaddr', req.params.public_address)
      // .then(qres => qres.forEach((contract) => { // maybe use a map (spread object add to it from blockchain response)
        //getInfo for every contract using block chain helpers
        //return s
      // }))
      .then(qres => res.json(qres));
  });

  // pharmaceutical company info
  router.get('/pharmacos/:public_address', (req, res) => {
    knex.select('company_name', 'contact_name', 'email', 'address', 'city', 'postal_code')
      .from('pharmacos')
      .where('public_address', req.params.public_address)
      .then(qres => res.json(qres));
  });

  return router;
}