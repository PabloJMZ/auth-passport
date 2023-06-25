const express = require('express');
const router = express.Router();

const views = require('./views.routes');
const auth = require('./auth.routes');

router.use(auth);
router.use(views);

module.exports = router;