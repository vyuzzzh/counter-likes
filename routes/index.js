const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Counter-likes' });
});

router.get('/reg', (req, res, next) => {
  console.log('fasdfasf');
  
  console.log(req.query.code);

  res.render('test');
});


module.exports = router;
