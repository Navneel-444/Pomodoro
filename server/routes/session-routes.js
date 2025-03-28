const router = require('express').Router();
const sessionController = require('../controllers/session-controller');

router.route('/')
    .get(sessionController.index);

module.exports = router;