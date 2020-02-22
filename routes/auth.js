const router = require('express').Router();
const rp = require('request-promise');
const User = require('../models/user');


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    delete req.app.locals.username;
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

router.get('/reg', (req, res, next) => {
  const { code } = req.query;
  const url = `https://oauth.vk.com/access_token?client_id=7327798&client_secret=d60Ug4amPVS7N2qlGBoq&redirect_uri=http://counter-likes.herokuapp.com/auth/reg&code=${code}`;
  rp(url)
    .then(async (objInfo) => {
      const info = JSON.parse(objInfo);
      const id = info.user_id;
      const { email, access_token, expires_in } = info;
      const userFind = await User.findOne({ id });
      console.log(`USER FINDED ${userFind}`);

      if (!userFind) {
        console.log('<<<<<<<<CREATE USER');
        await User.create({
          id, email, access_token, expires_in,
        });
      }
      req.session.user = id;
      req.session.token = access_token;
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
