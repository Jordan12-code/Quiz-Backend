require('dotenv').config();
const mongoose = require('mongoose');
const Prize = require('../models/Prize');

const DB_URI = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;

const prizes = [
  { name: 'Emas 10 gram', quota: 1, winners: 0, probability: 0.001 },
  { name: 'Smartphone X', quota: 5, winners: 0, probability: 0.005 },
  { name: 'Smartwatch Y', quota: 10, winners: 0, probability: 0.01 },
  { name: 'Voucher Rp100.000', quota: 100, winners: 0, probability: 0.1 },
  { name: 'Pulsa Rp50.000', quota: 500, winners: 0, probability: 0.3 },
];

mongoose.connect(DB_URI).then(async () => {
  await Prize.deleteMany({});
  await Prize.insertMany(prizes);
  console.log('Prizes seeded!');
  process.exit();
});
