const Prescription = artifacts.require("./Prescription.sol");
const filledPrescription = artifacts.require("./filledPrescription.sol");

today = 1526430433; //may 15th 
oneDay = 86400; 


//(Prescription, drugid, dosage, numD, freq, {from: accounts[x], gas: 1000000})
//(filledPrescription, drugid, dosage, numd, freq, cost, start, end, accounts[x], {from: accounts[x], gas: 1000000})

module.exports = function(deployer, network, accounts) {
  // patient 1
  deployer.deploy(Prescription, 1, 100, 30, 1, {from: accounts[0], gas: 1000000}),
  deployer.deploy(filledPrescription, 2, 55, 60, 2, 3, (today - (oneDay*6)), (today + (oneDay*24)), accounts[6], {from: accounts[0], gas: 1000000}),
  deployer.deploy(filledPrescription, 3, 120, 30, 1, 3, (today - (oneDay*26)), (today + (oneDay*4)), accounts[7], {from: accounts[0], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 100, 30, 1, 1, (today - (oneDay*32)), (today - (oneDay*2)), accounts[7], {from: accounts[0], gas: 1000000}),

  //patient 2
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*15)), (today + (oneDay*15)), accounts[5], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*45)), (today - (oneDay*15)), accounts[5], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*32)), (today + (oneDay*15)), accounts[5], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 2, 50, 60, 2, 5, (today - (oneDay*10)), (today - (oneDay*20)), accounts[6], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 3, 100, 30, 1, 3, (today - (oneDay*18)), (today - (oneDay*12)), accounts[7], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 4, 100, 30, 1, 3, (today - (oneDay*16)), (today - (oneDay*14)), accounts[7], {from: accounts[1], gas: 1000000}),
  deployer.deploy(filledPrescription, 5, 10, 120, 4, 1, (today - (oneDay*4)), (today - (oneDay*26)), accounts[7], {from: accounts[1], gas: 1000000}),
  deployer.deploy(Prescription, 6, 120, 30, 1, {from: accounts[1], gas: 1000000}),

  //pharma 1
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*1)), (today + (oneDay*29)), accounts[5], {from: accounts[0], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*3)), (today + (oneDay*27)), accounts[5], {from: accounts[2], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*5)), (today + (oneDay*25)), accounts[5], {from: accounts[3], gas: 1000000}),
  deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*7)), (today + (oneDay*23)), accounts[5], {from: accounts[4], gas: 1000000})
  
}

// Legend
// accounts[0] = patient 1 --> mareli 
// accounts[1] = patient 2 --> clayton 
// accounts[2] = patient 3 --> trevin
// accounts[3] = patient 4 --> taylor
// accounts[4] = patient 5 --> asia
// 
// accounts[5] = pharma 1 --> we make drugs
// accounts[6] = pharma 2 --> we also make drugs
// accounts[7] = pharma 3 --> we sometimes make drugs
// accounts[8] = pharma 4 --> 
// accounts[9] = pharma 5 -->


// drugIds: 
/*
  genericID = 1 --> bonadrogo - pharma 1 2 
            = 2 --> malbonadrogo - pharma 2
            = 3 --> bongustadrogo - pharma 3
            = 4 -->  genericName  - pharma 
            = 5 -->  - pharma 
            = 6 --> - pharma 
*/