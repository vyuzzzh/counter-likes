const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.app.locals.infoPerson);

  res.render('info');
});


module.exports = router;
