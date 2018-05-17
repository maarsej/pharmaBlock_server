
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drugs').del()
  .then(function () {
    return Promise.all([
      knex('drugs').insert({
        id: 1,
        pharmaco_pubaddr: "0xBC56119401f146F5eb3852C2618207349b321062",
        brand_name: 'Gonzalidine',
        price_per_mg: 2,
        image_url: 'rusticpill.jpg',
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 2,
        pharmaco_pubaddr: "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f",
        brand_name: 'Husainicin',
        price_per_mg: 1,
        image_url: 'bluetablet.jpg',
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 3,
        pharmaco_pubaddr: "0xD00c9661221a448c3D6B97b968363be5A330d722",
        brand_name: 'Millsoletra',
        price_per_mg: 2,
        image_url: 'colorpill.jpg',
        generic_id: 3
      }),
      knex('drugs').insert({
        id: 4,
        pharmaco_pubaddr: "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f",
        brand_name: 'Sumiyostryl',
        price_per_mg: 1,
        price_per_mg: 3,
        image_url: 'glitterpill.jpg',
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 5,
        pharmaco_pubaddr: "0xD00c9661221a448c3D6B97b968363be5A330d722",
        brand_name: 'Feferidine',
        price_per_mg: 2,
        image_url: 'gumimaci.jpg',
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 6,
        pharmaco_pubaddr: "0x04C8559326Cd7649424708F85D45f8F924CC5b74",
        brand_name: 'Tsangoplex',
        price_per_mg: 2,
        image_url: 'happypill.jpg',
        generic_id: 3
      }),
      knex('drugs').insert({
        id: 7,
        pharmaco_pubaddr: "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f",
        brand_name: 'Izzyanbital',
        price_per_mg: 4,
        image_url: 'lightpill.jpg',
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 8,
        pharmaco_pubaddr: "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f",
        brand_name: 'Piyaledizem Sheardoprotin',
        price_per_mg: 4,
        image_url: 'moodpill.jpg',
        generic_id: 3
      }),
      knex('drugs').insert({
        id: 9,
        pharmaco_pubaddr: "0xBC56119401f146F5eb3852C2618207349b321062",
        brand_name: 'Annaruvax Hermansolac',
        price_per_mg: 3,
        image_url: 'pill11.jpg',
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 10,
        pharmaco_pubaddr: "0xD00c9661221a448c3D6B97b968363be5A330d722",
        brand_name: 'Alixane Alidibine',
        price_per_mg: 4,
        image_url: 'pill12.jpg',
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 12,
        pharmaco_pubaddr: "0xBC56119401f146F5eb3852C2618207349b321062",
        brand_name: 'Malaikamin',
        price_per_mg: 4,
        image_url: 'pill3.jpg',
        generic_id: 3
      }),
      knex('drugs').insert({
        id: 14,
        pharmaco_pubaddr: "0xD00c9661221a448c3D6B97b968363be5A330d722",
        brand_name: 'Topazunex',
        price_per_mg: 4,
        image_url: 'pill4.jpg',
        generic_id: 5
      }),
      knex('drugs').insert({
        id: 15,
        pharmaco_pubaddr: "0x04C8559326Cd7649424708F85D45f8F924CC5b74",
        brand_name: 'Essenol',
        price_per_mg: 4,
        image_url: 'pill6.jpg',
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 16,
        pharmaco_pubaddr: "0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f",
        brand_name: 'Lorenzetin',
        price_per_mg: 4,
        image_url: 'pill7.jpg',
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 17,
        pharmaco_pubaddr: "0xBC56119401f146F5eb3852C2618207349b321062",
        brand_name: 'Ciborowskirol',
        price_per_mg: 2,
        image_url: 'pill8.jpg',
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 18,
        pharmaco_pubaddr: "0x04C8559326Cd7649424708F85D45f8F924CC5b74",
        brand_name: 'Amabide Mansellized',
        price_per_mg: 3,
        image_url: 'pill9.jpg',
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 19,
        pharmaco_pubaddr: "0x04C8559326Cd7649424708F85D45f8F924CC5b74",
        brand_name: 'Viranonex',
        price_per_mg: 4,
        image_url: 'pinktablet.jpg',
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 20,
        pharmaco_pubaddr: "0xD00c9661221a448c3D6B97b968363be5A330d722",
        brand_name: 'Shakotrol',
        price_per_mg: 3,
        image_url: 'redtablet.jpg',
        generic_id: 2
      }),
      
      knex('drugs').insert({ id: 11, pharmaco_pubaddr: "0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B", brand_name: 'Sagerolac Franchagine', price_per_mg: 1, image_url: 'pill13.jpg', generic_id: 1 }),
      knex('drugs').insert({ id: 13, pharmaco_pubaddr: "0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B", brand_name: 'Bortsoban', price_per_mg: 1, image_url: 'glitterpill.jpg', generic_id: 2 }),
      knex('drugs').insert({ id: 21, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B', brand_name: 'Faisaluclude', price_per_mg: 1, image_url: 'colorpill.jpg', generic_id: 3 }),
      knex('drugs').insert({ id: 22, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Fabiomine', price_per_mg: 1, image_url: 'pinktablet.jpg ', generic_id: 4  }),
      knex('drugs').insert({ id: 23, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Stoshumab', price_per_mg: 3, image_url: 'gumimaci.jpg ', generic_id: 5 }),
      knex('drugs').insert({ id: 24, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Kowsheekeron', price_per_mg: 1, image_url: 'happypill.jpg ', generic_id: 6 }),
      knex('drugs').insert({ id: 25, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Thompsoxin', price_per_mg: 1, image_url: 'lightpill.jpg '}),
      knex('drugs').insert({ id: 26, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Montingaban', price_per_mg: 4, image_url: 'moodpill.jpg '}),
      knex('drugs').insert({ id: 27, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Timanide', price_per_mg: 5, image_url: 'pill11.jpg '}),
      knex('drugs').insert({ id: 28, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Justinone', price_per_mg: 1, image_url: 'pill12.jpg '}),
      knex('drugs').insert({ id: 30, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Amoxizach', price_per_mg: 5, image_url: 'pill3.jpg '}),
      knex('drugs').insert({ id: 31, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Jackiewdine', price_per_mg: 5, image_url: 'pill4.jpg '}),
      knex('drugs').insert({ id: 32, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Fishbomar', price_per_mg: 2, image_url: 'pill5.jpg '}),
      knex('drugs').insert({ id: 33, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Razvanolence', price_per_mg: 5, image_url: 'pill6.jpg '}),
      knex('drugs').insert({ id: 34, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Ericamine', price_per_mg: 2, image_url: 'pill7.jpg '}),
      knex('drugs').insert({ id: 35, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Willmentin', price_per_mg: 1, image_url: 'pill8.jpg '}),
      knex('drugs').insert({ id: 36, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Benharazine', price_per_mg: 5, image_url: 'pill9.jpg '}),
      knex('drugs').insert({ id: 37, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Laithinum', price_per_mg: 2, image_url: 'pinktablet.jpg '}),
      // knex('drugs').insert({ id: 38, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Viganeva Humurenone', price_per_mg: 3, image_url: 'redtablet.jpg '}),
      // knex('drugs').insert({ id: 39, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Palocine Olakeran', price_per_mg: 3, image_url: 'rocketcandy.jpg '}),
      // knex('drugs').insert({ id: 40, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Abacaprotin Pentacline', price_per_mg: 2, image_url: 'rocketpill.jpg '}),
      // knex('drugs').insert({ id: 41, pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B' , brand_name: 'Alvederm Fragpion', price_per_mg: 5, image_url: 'rusticpill.jpg '}),
     ]);
  });
};
