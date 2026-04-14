const express = require('express');
const controller = require('./gacha.controller');

const router = express.Router();

router.post('/gacha', controller.gacha); // Main gacha
router.get('/gacha/history/:userId', controller.history); // Bonus 1
router.get('/gacha/prizes', controller.prizeList); // Bonus 2
router.get('/gacha/winners/:prizeId', controller.winners); // Bonus 3

module.exports = router;
