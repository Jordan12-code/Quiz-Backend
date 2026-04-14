const express = require('express');

const router = express.Router();

const gachaRouter = require('./components/gacha/gacha.route');

router.use(gachaRouter);

module.exports = router;
