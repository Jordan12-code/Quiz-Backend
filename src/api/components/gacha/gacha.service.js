const repo = require('./gacha.repository');

const MAX_DAILY = 5;

const doGacha = async (userId) => {
  // Cek batas harian
  const todayCount = await repo.countTodayGacha(userId);
  if (todayCount >= MAX_DAILY) {
    throw new Error('Kamu sudah mencapai batas maksimal gacha hari ini (5x)');
  }

  // Ambil semua hadiah yang masih ada kuota
  const prizes = await repo.getAllPrizes();
  const available = prizes.filter((p) => p.winners < p.quota);

  // Proses gacha berdasarkan probability
  let won = null;
  for (const prize of available) {
    if (Math.random() < prize.probability) {
      won = prize;
      break;
    }
  }

  // Simpan log
  await repo.saveLog(userId, won, !!won);
  if (won) await repo.incrementWinner(won._id);

  return won
    ? { isWin: true, prize: won.name }
    : { isWin: false, message: 'Lebih beruntung lain kali!' };
};

const getHistory = async (userId) => {
  const logs = await repo.getLogsByUser(userId);
  return logs.map((log) => ({
    isWin: log.isWin,
    prize: log.prize?.name || null,
    date: log.createdAt,
  }));
};

const getPrizeList = async () => {
  const prizes = await repo.getAllPrizes();
  return prizes.map((p) => ({
    name: p.name,
    quota: p.quota,
    remainingSlots: p.quota - p.winners,
  }));
};

const maskName = (name) => {
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 1) return word;
      return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
    })
    .join(' ');
};

const getWinnersByPrize = async (prizeId) => {
  const winners = await repo.getWinnersByPrize(prizeId);
  return winners.map((w) => ({ user: maskName(w.userId) }));
};

module.exports = { doGacha, getHistory, getPrizeList, getWinnersByPrize };
