pragma solidity ^0.4.18;

contract filledPrescription {

    //Set by patient/doctor
    uint public drugID;
    uint public dosage;
    uint public numberOfDoses;
    uint public frequencyOfDose;
    uint public doctorID = 123456;
    string public test = "test";
    address public patient;

    bool public signed; //false if no bid acc, true if bid acc and provider signed on

    //agreed upon by pharma and set at time of signature
    uint256 public hello = 1;
    uint public costPerDose;
    uint public startDate;
    uint public endDate;
    address public provider;
    
    uint public total;
    uint private remainingTotal;
    uint[] public paymentsRecieved;

    event SenderLogger(address);
    event ValueLogger(uint);

    modifier isOwner {
        require(patient == msg.sender);
        _;
    }

    modifier authorizedToViewCheck {
        require (msg.sender == patient || msg.sender == provider); /* || msg.sender == doctorID*/
        _;
    } 

    modifier signedContract {
        require(signed);
        _;
    }

    function filledPrescription(uint incDrugID, uint incDosage, uint incNumberOfDoses, uint incFrequencyOfDose, uint accCostPerDose, uint accStartDate, uint accEndDate, address accProvider) public {
        patient = msg.sender;
        drugID = incDrugID;
        dosage = incDosage;
        numberOfDoses = incNumberOfDoses;
        frequencyOfDose = incFrequencyOfDose;
        costPerDose = accCostPerDose;
        startDate = accStartDate;
        endDate = accEndDate;
        provider = accProvider;
        signed = true;
        total = dosage*numberOfDoses*costPerDose;
    }

    function getInfo() public returns ( uint[5] ) {
        return [drugID, dosage, numberOfDoses, frequencyOfDose, costPerDose];
    }

    function pay() payable public isOwner {
        emit SenderLogger(msg.sender);
        emit ValueLogger(msg.value);
    }
    // function recievePayment (uint paymentAmount) public {
    //     paymentsRecieved.push(paymentAmount);
    // }

    // function remainingPayment() public returns (uint) {
    //     remainingTotal = total;
    //     for (uint i = 0; i < paymentsRecieved.length; i++) {
    //         remainingTotal -= paymentsRecieved[i];
    //     }
    //     return remainingTotal;
    // }

}
