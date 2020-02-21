const express = require('express');
const rp = require('request-promise');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Counter-likes' });
});

router.get('/reg', (req, res, next) => {
  const { code } = req.query;
  console.log(`CODE>>>>>>>>>>>>>>${code}`);
  const url = `https://oauth.vk.com/access_token?client_id=7327798&client_secret=KVv5burkbNpWD5qLKyIt&redirect_uri=https://counter-likes.herokuapp.com/reg/&code=${code}`;
  console.log(`URL>>>>>>>>>>>>>>>${url}`);


  rp(url)
    .then((objInfo) => {
      console.log('>>>>>>>>>>>>>>>');
      console.log(objInfo);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
