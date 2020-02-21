const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session.name);

  res.render('index', { title: 'Counter-likes' });
});


module.exports = router;
