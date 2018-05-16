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

    function Prescription(uint incDrugID, uint incDosage, uint incNumberOfDoses, uint incFrequencyOfDose) public {
        patient = msg.sender;
        drugID = incDrugID;
        dosage = incDosage;
        numberOfDoses = incNumberOfDoses;
        frequencyOfDose = incFrequencyOfDose;
        signed = false;
    }

    function getInfo() public returns ( uint[4] ) {
        return [drugID, dosage, numberOfDoses, frequencyOfDose];
    }
}
