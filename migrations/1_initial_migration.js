console.log ("not got Migrations")
var Migrations = artifacts.require("./Migrations.sol");
console.log ("got Migrations")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
