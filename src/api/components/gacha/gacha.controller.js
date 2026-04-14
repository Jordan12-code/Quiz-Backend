const service = require('./gacha.service');

const gacha = async (req, res) => {
  const { userId } = req.body;
  const result = await service.doGacha(userId);
  res.json(result);
};

const history = async (req, res) => {
  const { userId } = req.params;
  const result = await service.getHistory(userId);
  res.json(result);
};

const prizeList = async (req, res) => {
  const result = await service.getPrizeList();
  res.json(result);
};

const winners = async (req, res) => {
  const { prizeId } = req.params;
  const result = await service.getWinnersByPrize(prizeId);
  res.json(result);
};

module.exports = { gacha, history, prizeList, winners };
