// Import libraries we need.
const Web3 = require('web3');
const contract = require('truffle-contract');

const prescription_artifacts = require('./build/contracts/Prescription.json')
const filledprescription_artifacts = require('./build/contracts/filledPrescription.json')

const EROFS = require('constants').EROFS


let provider = null
// import { default as Web3 } from 'web3';
// import { default as contract } from 'truffle-contract'

// import prescription_artifacts from '../../build/contracts/Prescription.json'
// import { EROFS } from "constants";


// Contract object
const Prescription = contract(prescription_artifacts);
const filledPrescription = contract(filledprescription_artifacts);

let values = { "drugID": "field-1", "dosage": "field-2", "numberOfDoses": "field-3", "frequencyOfDose": "field-4" }

setProvider = function () {
    if (typeof web3 !== 'undefined' /*'&& false' used to escape metamask being installed in my browser */) {
        // console.warn("Using web3 detected from external source like Metamask")

        // Use MetaMask's provider
        // window.web3 = new Web3(web3.currentProvider);
        web3 = new Web3(web3.currentProvider);
    } else if (provider) {
        web3 = new Web3(provider.currentProvider);
    } else {
        // console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");

        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    Prescription.setProvider(web3.currentProvider);
    filledPrescription.setProvider(web3.currentProvider);
}



findFilled = function (id) {
    return new Promise((resolve, reject) => {
        setProvider();
        Prescription.setProvider(web3.currentProvider);
        const contractInstance = filledPrescription.at(id); //0xd49bDC6802Acc58931591749607ad08cb13F8e67
        contractInstance.getInfo.call().then(function (v) {
            // console.log(v);
            resolve(v);
        }).catch((error) => {
            reject(error);
        });
    })
}

find = function (id) {
    return new Promise((resolve, reject) => {
        setProvider();
        Prescription.setProvider(web3.currentProvider);
        const contractInstance = Prescription.at(id); //0xd49bDC6802Acc58931591749607ad08cb13F8e67
        contractInstance.getInfo.call().then(function (v) {
            // console.log(v);
            resolve(v);
        }).catch((error) => {
            reject(error);
        });
    })
}

create = function (currentUser, drugID, dosage, numberOfDoses, frequencyOfDose) {
    return new Promise((resolve, reject) => {
        setProvider(); // not sure how to handle telling it how to access webmask
        Prescription.new(drugID, dosage, numberOfDoses, frequencyOfDose, { from: currentUser, gas: 6000000 }).then(instance => {
            let checkAddress = setInterval(() => {
                if (instance.address) {
                    console.log("Contract address: " + instance.address);
                    clearInterval(checkAddress)
                    resolve(instance.address);
                }
            }, 100);
        }).catch((error) => {
            reject(error)
        });
    })
}

sign = function (id, currentUser, costPerDose, startDate, endDate, pharmaPubAddr) {
    return new Promise((resolve, reject) => {
        setProvider();
        const contractInstance = Prescription.at(id); //0xac68dB96A9E756a83AEC20d47DbeE90017a05bF2
        contractInstance.getInfo.call().then((output) => {
            filledPrescription.new(output[0], output[1], output[2], output[3], costPerDose, startDate, endDate, pharmaPubAddr, { from: currentUser, gas: 6000000 }).then(instance => {
                let checkAddress = setInterval(() => {
                    if (instance.address) {
                        console.log("Contract address: " + instance.address);
                        clearInterval(checkAddress)
                        resolve(instance.address);
                    }
                }, 100);
            }).catch((error) => {
                console.log(error)
            });
        }).catch((error) => {
            reject(error)
        });
    })
}

getProvider = function (web3Object) {
    provider= web3Object;
    console.log("PROVIDER: ", provider)
}

const blockFunc = {
    create: create,
    find: find,
    sign: sign,
    findFilled: findFilled,
    getProvider: getProvider,

}


module.exports = blockFunc;