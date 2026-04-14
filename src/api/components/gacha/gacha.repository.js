const GachaLog = require('../../../models/GachaLog');
const Prize = require('../../../models/prize');

const countTodayGacha = async (userId) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return GachaLog.countDocuments({ userId, createdAt: { $gte: start } });
};

const getAllPrizes = async () => Prize.find();

const saveLog = async (userId, prize, isWin) =>
  GachaLog.create({ userId, prize: prize?._id || null, isWin });

const incrementWinner = async (prizeId) =>
  Prize.findByIdAndUpdate(prizeId, { $inc: { winners: 1 } });

const getLogsByUser = async (userId) =>
  GachaLog.find({ userId }).populate('prize').sort({ createdAt: -1 });

const getWinnersByPrize = async (prizeId) =>
  GachaLog.find({ prize: prizeId, isWin: true });

module.exports = {
  countTodayGacha,
  getAllPrizes,
  saveLog,
  incrementWinner,
  getLogsByUser,
  getWinnersByPrize,
};
