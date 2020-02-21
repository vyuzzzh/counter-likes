const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  delete req.app.locals.infoPerson;
  delete req.app.locals.count;
  delete req.app.locals.items;

  res.render('index', { title: 'Counter-likes' });
});


module.exports = router;
