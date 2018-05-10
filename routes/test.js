const block = require('../chainHelpers.js');

let id = "0xac68dB96A9E756a83AEC20d47DbeE90017a05bF2"

let pId = "0x6268c4b8490beA0880c6CC7fFFB8362c2D3B5Ff4"

let currentUser = "0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2"


block.create(currentUser, 123,456,30,1);

block.findFilled("0x486b83d941d771a081bb05b6cc9536837cbf4b94"); 

block.find(id);

block.pay("0x486b83d941d771a081bb05b6cc9536837cbf4b94", 100) // not sure if it really transfers eth

block.sign(id, currentUser, 69, 1, 30, pId)
