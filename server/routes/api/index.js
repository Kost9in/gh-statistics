const router = require('express').Router();

router.use('/repo', require('./repo'));

module.exports = router;