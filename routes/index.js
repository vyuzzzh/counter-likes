const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('USER >>>>>>>>>>>');
  console.log(req.session.user);

  console.log('LOCALS >>>>>');
  console.log(req.app.locals.username);
  res.render('index', { title: 'Counter-likes' });
});


module.exports = router;
