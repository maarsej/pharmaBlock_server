const today = 1526430433; //may 15th 
const oneDay = 86400;

const accounts = ["0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2", "0xa273e1C1Bd3FBC09b5274B2a2319193cd7298873", "0x6268c4b8490beA0880c6CC7fFFB8362c2D3B5Ff4", "0xe511708661CfAE7ae3C8Ae69810369cBA37BcE6b", "0xB3AA28edf71914e0d92f56B27d5340446Bbd0b59", "0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B", "0x04C8559326Cd7649424708F85D45f8F924CC5b74", "0xD00c9661221a448c3D6B97b968363be5A330d722", "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f", "0xBC56119401f146F5eb3852C2618207349b321062"]

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries

        // patient 1
        // deployer.deploy(Prescription, 1, 100, 30, 1, { from: accounts[0], gas: 1000000 }),
        // knex('contracts').insert({
        //   public_address: '0xd49bDC6802Acc58931591749607ad08cb13F8e67',
        //   patient_pubaddr: accounts[0],
        //   drug_id: 2,
        //   end_date: null
        // }),
        // deployer.deploy(filledPrescription, 2, 55, 60, 2, 3, (today - (oneDay * 6)), (today + (oneDay * 24)), accounts[6], { from: accounts[0], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x914B35cCC15aB326c539f8896c25A98B253aF41E',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[6],
          drug_id: 2,
          end_date: (today + (oneDay * 24))
        }),
        // deployer.deploy(filledPrescription, 3, 120, 30, 1, 3, (today - (oneDay * 26)), (today + (oneDay * 4)), accounts[7], { from: accounts[0], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x423ad19e54d5284A00A8F43EBE6cbbC1eF64b962',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[7],
          drug_id: 3,
          end_date: (today + (oneDay * 4))
        }),
        // deployer.deploy(filledPrescription, 1, 100, 30, 1, 1, (today - (oneDay * 32)), (today - (oneDay * 2)), accounts[7], { from: accounts[0], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x3B7821415887D1B8184e3bF06450b9e5b6bad1d4',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[7],
          drug_id: 1,
          end_date: (today - (oneDay * 2))
        }),


        //       //patient 2
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 15)), (today + (oneDay * 15)), accounts[5], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0xac68dB96A9E756a83AEC20d47DbeE90017a05bF2',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today + (oneDay * 15))
        }),
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 45)), (today - (oneDay * 15)), accounts[5], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x3b6B8aAeDFEB3D244af7a8dcD81161B22B6f8454',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today - (oneDay * 15))
        }),
        //       deployer.deploy(filledPrescription, 2, 50, 60, 2, 5, (today - (oneDay * 10)), (today + (oneDay * 20)), accounts[6], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x1803AE80d443A40EC0C1EaE274bC612E328923df',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[6],
          drug_id: 2,
          end_date: (today + (oneDay * 20))
        }),
        //       deployer.deploy(filledPrescription, 3, 100, 30, 1, 3, (today - (oneDay * 18)), (today + (oneDay * 12)), accounts[7], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x97f00367244221a37786bca69c340580095765B4',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[7],
          drug_id: 3,
          end_date: (today + (oneDay * 12))
        }),
        //       deployer.deploy(filledPrescription, 4, 100, 30, 1, 3, (today - (oneDay * 16)), (today + (oneDay * 14)), accounts[7], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x7C47A3bed37befE6C90dEaCC404B921028fe6B4e',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[7],
          drug_id: 4,
          end_date: (today + (oneDay * 14))
        }),
        //       deployer.deploy(filledPrescription, 5, 10, 120, 4, 1, (today - (oneDay * 4)), (today + (oneDay * 26)), accounts[7], { from: accounts[1], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x321D629936E453d5D6E06193865b2187Ae8EBE6D',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[7],
          drug_id: 5,
          end_date: (today + (oneDay * 26))
        }),
        //       deployer.deploy(Prescription, 6, 120, 30, 1, { from: accounts[1], gas: 1000000 }),
        // knex('contracts').insert({
        //   public_address: '0x2f621A9a4edb2B6A748A62a01C72d4DdE4010620',
        //   patient_pubaddr: accounts[1],
        //   drug_id: 6,
        //   end_date: null
        // }),


        //       //pharma 1
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 1)), (today + (oneDay * 29)), accounts[5], { from: accounts[0], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x486b83d941D771a081Bb05B6cC9536837CBf4b94',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today + (oneDay * 29))
        }),
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 3)), (today + (oneDay * 27)), accounts[5], { from: accounts[2], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x44271E36E3e47D74f2f41014FEea140e5840b51B',
          patient_pubaddr: accounts[2],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today + (oneDay * 27))
        }),
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 5)), (today + (oneDay * 25)), accounts[5], { from: accounts[3], gas: 1000000 }),
        knex('contracts').insert({
          public_address: '0x5Cd09FB5620AD519fa9f79E3EE8BA2144be50B05',
          patient_pubaddr: accounts[3],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today + (oneDay * 25))
        }),
        //       deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay * 7)), (today + (oneDay * 23)), accounts[5], { from: accounts[4], gas: 1000000 })
        knex('contracts').insert({
          public_address: '0xdb1E5325430358AB7a4F2A0B5E276d8Ef3a234AB',
          patient_pubaddr: accounts[4],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today + (oneDay * 23))
        }),




        // deployer.deploy(filledPrescription, 1, 80, 30, 1, 2, (today - (oneDay*1)), (today - (oneDay*29)), accounts[5], {from: accounts[0], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x38D3aC364d970B2a8C2A4Ff665701b0c87C56d71',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[5],
          drug_id: 1,
          end_date: (today - (oneDay * 29))
        }),
        // deployer.deploy(filledPrescription, 2, 80, 30, 1, 2, (today - (oneDay*3)), (today - (oneDay*27)), accounts[5], {from: accounts[1], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x57Fd5035FE4A430bA5799C969eF82D627E592308',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 2,
          end_date: (today - (oneDay * 27))
        }),
        // deployer.deploy(filledPrescription, 3, 80, 30, 1, 2, (today - (oneDay*5)), (today - (oneDay*25)), accounts[5], {from: accounts[1], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x7494FE642eBb8f9EA29170517f99eadaBbeAec27',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 3,
          end_date: (today - (oneDay * 25))
        }),
        // deployer.deploy(filledPrescription, 4, 80, 30, 1, 2, (today - (oneDay*7)), (today - (oneDay*23)), accounts[5], {from: accounts[1], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x62135672DD3b965326F2C9A85bA84B82E3E7949D',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 4,
          end_date: (today - (oneDay * 23))
        }),
        // deployer.deploy(filledPrescription, 5, 80, 30, 1, 2, (today - (oneDay*1)), (today - (oneDay*29)), accounts[5], {from: accounts[1], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x11e89dbfbddafd6ec47EA7000B541e854f529650',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 5,
          end_date: (today - (oneDay * 29))
        }),
        // deployer.deploy(filledPrescription, 6, 80, 30, 1, 2, (today - (oneDay*3)), (today - (oneDay*27)), accounts[5], {from: accounts[2], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0xBfC1C0637bC237D4De2AB9AD75E90f6E33552e60',
          patient_pubaddr: accounts[2],
          pharmaco_pubaddr: accounts[5],
          drug_id: 6,
          end_date: (today - (oneDay * 27))
        }),
        // deployer.deploy(filledPrescription, 5, 80, 30, 1, 2, (today - (oneDay*5)), (today - (oneDay*25)), accounts[5], {from: accounts[3], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0xd446fC2a39322cee80224fc705Ede87492e72a02',
          patient_pubaddr: accounts[3],
          pharmaco_pubaddr: accounts[5],
          drug_id: 5,
          end_date: (today - (oneDay * 25))
        }),
        // deployer.deploy(filledPrescription, 4, 80, 30, 1, 2, (today - (oneDay*7)), (today - (oneDay*23)), accounts[5], {from: accounts[4], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x9D32E1eDd6A24bdd639822F3513fFc7542715dc8',
          patient_pubaddr: accounts[4],
          pharmaco_pubaddr: accounts[5],
          drug_id: 4,
          end_date: (today - (oneDay * 23))
        }),
        // deployer.deploy(filledPrescription, 3, 80, 30, 1, 2, (today - (oneDay*1)), (today - (oneDay*29)), accounts[5], {from: accounts[0], gas: 1000000}),
        knex('contracts').insert({
          public_address: '0x88223Bf092f82A1a51E1dD47B516Af0AE41ff06d',
          patient_pubaddr: accounts[0],
          pharmaco_pubaddr: accounts[5],
          drug_id: 3,
          end_date: (today - (oneDay * 29))
        }),
        // deployer.deploy(filledPrescription, 2, 80, 30, 1, 2, (today - (oneDay*3)), (today - (oneDay*27)), accounts[5], {from: accounts[2], gas: 1000000})
        knex('contracts').insert({
          public_address: '0xDBc1201357037556b0022fbC92A33731b67CDC95',
          patient_pubaddr: accounts[1],
          pharmaco_pubaddr: accounts[5],
          drug_id: 2,
          end_date: (today - (oneDay * 29))
        })
        
      ]);
    });
};