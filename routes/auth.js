const router = require('express').Router();
const rp = require('request-promise');
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/reg', (req, res, next) => {
  const { code } = req.query;
  const url = `https://oauth.vk.com/access_token?client_id=7327798&client_secret=KVv5burkbNpWD5qLKyIt&redirect_uri=https://counter-likes.herokuapp.com/reg/&code=${code}`;

  rp(url)
    .then(async (objInfo) => {
      console.log(objInfo);
      const {
        access_token, user_id, email,
      } = objInfo;
      console.log('>>>>>>>>>>>>>>TEST-USER>>>>>>>>>>>>>>>');

      await User.create({ user_id, email });
      req.session.user = user._id;
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    // delete req.app.locals.username;
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

module.exports = router;
