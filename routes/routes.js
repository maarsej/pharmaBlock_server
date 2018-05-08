const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  router.post('/patient/login', (req, res) => {
    // knex.select('')
    // for (let user in users) {
    //   if (users[user].email === req.body.email && bcrypt.compareSync(req.body.password, users[user].password)) {
    //     userFound = true;
    //     req.session.user_id = users[user].id;
    //     res.redirect('/home');
    //     break;
    //   }
    // }
    // if (!userFound) {
    //   res.status(400).send('Sorry, we don\'t know you.');
    // }
  });

  // logout request: delete cookie
  router.get('/logout', (req, res) => {
    req.session = null;
  });

  // basic patient contract info
  router.get('/patient/:public_address/contracts', (req, res) => {
    knex('contracts')
      .join('pharmacos', 'contracts.pharmaco_pubaddr', 'pharmacos.public_address')
      .join('drugs', 'drugs.pharmaco_pubaddr', 'pharmacos.public_address')
    .select('contracts.public_address', 'pharmacos.company_name', 'drugs.brand_name')
      .where('patient_pubaddr', req.public_address)
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

  // pharmaceutical company info
  router.get('/pharmaco/:id', (req, res) => {
    knex.select('company_name', 'contact_name', 'email', 'address', 'city', 'postal_code')
      .from('patients')
      .where('public_address', req.id)
    .then(qres => res.json(qres));
  });

  return router;
}