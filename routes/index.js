const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Counter-likes' });
});

router.get('/:code', (req, res, next) => {
  console.log(req.query.code);

  res.render('login');
});


module.exports = router;
