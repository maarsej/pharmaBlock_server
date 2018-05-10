// var Voting = artifacts.require("./Voting.sol");
// //var buyDrugs = artifacts.require("./buyDrugs.sol");
// /* var terms = {
//           dosage: 100, //in mG
//           amount: 31, //number of doses
//           frequency: 24 //every ** hours
//           doctorID: 123, 
//           ppmG: 1000, //in cents per mG
//           drugID: 123,
//           startDate: 01/01/2018,
//           endDate: 01/02/2018
// } */

// module.exports = function(deployer) {
//   deployer.deploy(Voting, ['Rama', 'Nick', 'Jose'], {gas: 6700000});
//   // deployer.deploy(buyDrugs, terms, {gas: 6700000});
// };

const Prescription = artifacts.require("./Prescription.sol");

//accounts[0] = "0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2";
//accounts[1] = "0xa273e1C1Bd3FBC09b5274B2a2319193cd7298873";

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Prescription, 123, 100, 30, 1, {from: accounts[0], gas: 1000000}),
  deployer.deploy(Prescription, 456, 120, 60, 2, {from: accounts[1], gas: 1000000})
}
