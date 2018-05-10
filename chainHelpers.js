// Import libraries we need.
const Web3 = require('web3');
const contract = require('truffle-contract');

const prescription_artifacts = require('./build/contracts/Prescription.json')
const EROFS = require('constants').EROFS
// import { default as Web3 } from 'web3';
// import { default as contract } from 'truffle-contract'

// import prescription_artifacts from '../../build/contracts/Prescription.json'
// import { EROFS } from "constants";

// Contract object
var Prescription = contract(prescription_artifacts);

let values = { "drugID": "field-1", "dosage": "field-2", "numberOfDoses": "field-3", "frequencyOfDose": "field-4" }

setProvider = function () {
    if (typeof web3 !== 'undefined' /*'&& false' used to escape metamask being installed in my browser */) {
        // console.warn("Using web3 detected from external source like Metamask")

        // Use MetaMask's provider
        // window.web3 = new Web3(web3.currentProvider);
        web3 = new Web3(web3.currentProvider);
    } else {
        // console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");

        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    Prescription.setProvider(web3.currentProvider);
}



find = function (id) {
    setProvider();
    let values = { "drugID": "field-1", "dosage": "field-2", "numberOfDoses": "field-3", "frequencyOfDose": "field-4", "costPerDose": "field-5" }
    Prescription.setProvider(web3.currentProvider);
    let valueNames = Object.keys(values);
    for (var i = 0; i < valueNames.length; i++) {
        let value = valueNames[i];
        const contractInstance = Prescription.at(id); //0xd49bDC6802Acc58931591749607ad08cb13F8e67
        contractInstance[value].call().then(function (v) {
            console.log(`${value}: `, v);
        }).catch((error) => {
            console.log(error)
        });
    }
}

create = function (drugID, dosage, numberOfDoses, frequencyOfDose) {
    let currentUser = "0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2"
    setProvider(); // not sure how to handle telling it how to access webmask
    Prescription.new(drugID, dosage, numberOfDoses, frequencyOfDose, { from: currentUser, gas: 6000000 }).then(instance => {
        var checkAddress = setInterval(() => {
            if (instance.address) {
                console.log("Contract address: " + instance.address);
                clearInterval(checkAddress)
            }
        }, 100);
    }).catch((error) => {
        console.log(error)
    });
    console.log("contract creating...")
}

sign = function (id, costPerDose, startDate, endDate, pharmaPubAddr) {
    setProvider();
    Prescription.setProvider(web3.currentProvider);
    const contractInstance = Prescription.at(id); //0xd49bDC6802Acc58931591749607ad08cb13F8e67
    contractInstance.providerSignWithTerms.call(costPerDose, startDate, endDate, pharmaPubAddr).then((response) => {
        console.log(response)
        contractInstance.costPerDose.call().then((v) => {
            console.log("costPerDose: ", v)
        }).catch((error) => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    });
}

const blockFunc = {
    create: create,
    find: find,
    sign: sign,

}


module.exports = blockFunc;