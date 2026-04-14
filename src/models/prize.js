const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: String, // nama hadiah
  quota: Number, // kuota total pemenang
  winners: { type: Number, default: 0 }, // jumlah pemenang saat ini
  probability: Number, // peluang menang (0-1)
});

module.exports = mongoose.model('Prize', prizeSchema);
