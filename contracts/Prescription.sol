pragma solidity ^0.4.18;

contract Prescription {

    //Set by patient/doctor
    uint public drugID;
    uint public dosage;
    uint public numberOfDoses;
    uint public frequencyOfDose;
    uint public doctorID = 123456;
    address public patient;

    bool public signed; //false if no bid acc, true if bid acc and provider signed on

    //agreed upon by pharma and set at time of signature
    uint public costPerDose;
    uint public startDate;
    uint public endDate;
    address public provider;
    
    uint public total;
    uint private remainingTotal;
    uint[] public paymentsRecieved;

    modifier authorizedToViewCheck {
        require (msg.sender == patient || msg.sender == provider); /* || msg.sender == doctorID*/
        _;
    } 

    modifier signedContract {
        require(signed);
        _;
    }

    function Prescription(uint incDrugID, uint incDosage, uint incNumberOfDoses, uint incFrequencyOfDose) public {
        patient = msg.sender;
        drugID = incDrugID;
        dosage = incDosage;
        numberOfDoses = incNumberOfDoses;
        frequencyOfDose = incFrequencyOfDose;
        signed = false;
    }

    function providerSignWithTerms(uint accCostPerDose, uint accStartDate, uint accEndDate, address accProvider) public {
        if (msg.sender == patient) {  //make sure that auction is being ended by the creator themselves
            costPerDose = accCostPerDose;
            startDate = accStartDate;
            endDate = accEndDate;
            provider = accProvider;
            signed = true;
            total = dosage*numberOfDoses*costPerDose;
        }
    }

    function recievePayment (uint paymentAmount) public {
        paymentsRecieved.push(paymentAmount);
    }

    function remainingPayment() public returns (uint) {
        remainingTotal = total;
        for (uint i = 0; i < paymentsRecieved.length; i++) {
            remainingTotal -= paymentsRecieved[i];
        }
        return remainingTotal;
    }

    // A JS FUNCTION ON THE OTHER SIDE THAT CALLS THEM ALL AND COMPILES INTO NICE OBJECT
}
