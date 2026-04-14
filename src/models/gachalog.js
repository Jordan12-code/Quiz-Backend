const mongoose = require('mongoose');

const gachaLogSchema = new mongoose.Schema({
  userId: String, // identifier user
  prize: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', default: null },
  isWin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GachaLog', gachaLogSchema);
