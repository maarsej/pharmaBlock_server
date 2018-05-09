const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  router.post('/patient/login', (req, res) => {
    console.log('got to login', req.body);
    knex.select().from('patients').where('email_address', req.body.username)
    .then((qres) => {
      if (bcrypt.compareSync(req.body.password, qres.password)) {
        req.session.user_id = qres.public_address;
        res.status(200).send(`<h1>User ${req.session.user_id} is logged in.</h1>`);
      } else {
        res.status(400).send('<h1>Login failed.</h1>');
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
  router.get('/patient/:public_address/contracts', (req, res) => {
    knex('contracts')
      .join('drugs', 'drugs.id', 'contracts.drug_id')
      .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('patient_pubaddr', req.params.public_address)
    .then(qres => res.json(qres));
  });

  // patient info
  router.get('/patient/:public_address', (req, res) => {
    knex.select('public_address', 'email', 'name', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.params.public_address)
    .then((qres) => {console.log ('qres', qres); res.json(qres)})
    .catch((err) => console.log(err));
  });

  // basic pharmaceutical company contract info
  router.get('/pharmaco/:public_address/contracts', (req, res) => {
    knex('contracts')
    .join('drugs', 'drugs.id', 'contracts.drug_id')
    .leftJoin('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('contracts.pharmaco_pubaddr', req.params.public_address)
    .then(qres => res.json(qres));
  });

   // pharmaceutical company info
  router.get('/pharmaco/:public_address', (req, res) => {
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