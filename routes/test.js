const block = require('../chainHelpers.js');

let id = "0xac68dB96A9E756a83AEC20d47DbeE90017a05bF2"

let cId = "0xd49bDC6802Acc58931591749607ad08cb13F8e67"




block.create(123,456,30,1);

block.sign(cId, 69, 1, 30, id)

block.find(id);