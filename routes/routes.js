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
          res.status(200).json({userId: req.session.userId, name: qres[0].name, userType: 'patient'});
        } else {
          res.status(401);  // found patient, but password failed
        }
      } else {
        knex.select('public_address', 'company_name', 'password').from('pharmacos').where('email', req.body.email)
        .then((qres) => {
          if (qres.length === 1) {
            if (bcrypt.compareSync(req.body.password, qres[0].password)) {
              req.session.userId = qres[0].public_address;
              res.status(200).json({userId: req.session.userId, name: qres[0].company_name, userType: 'pharma'});
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

  // basic patient contract info
  router.get('/patients/:public_address/contracts', (req, res) => {
    knex('contracts')
      .join('drugs', 'drugs.id', 'contracts.drug_id')
      .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
      .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('patient_pubaddr', req.params.public_address)
      .then(qres => res.json(qres));
  });

  // patient info
  router.get('/patients/:public_address', (req, res) => {
    knex.select('public_address', 'email', 'name', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.params.public_address)
      .then((qres) => { console.log('qres', qres); res.json(qres) })
      .catch((err) => console.log(err));
  });

  // basic pharmaceutical company contract info
  router.get('/pharmacos/:public_address/contracts', (req, res) => {
    knex('contracts')
      .join('drugs', 'drugs.id', 'contracts.drug_id')
      .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
      .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('contracts.pharmaco_pubaddr', req.params.public_address)
      .then(qres => res.json(qres));
  });

  // pharmaceutical company info
  router.get('/pharmacos/:public_address', (req, res) => {
    knex.select('company_name', 'contact_name', 'email', 'address', 'city', 'postal_code')
      .from('pharmacos')
      .where('public_address', req.params.public_address)
      .then(qres => res.json(qres));
  });

  // pharmaceutical company info
  router.get('/contract/:id', (req, res) => {
    knex.select()
      .from('contracts')
      .where('public_address', req.params.id)
      .then(qres => res.json(qres));
  });


  return router;
}
