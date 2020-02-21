const router = require('express').Router();
const rp = require('request-promise');


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    // delete req.app.locals.username;
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

router.get('/reg', (req, res, next) => {
  const { code } = req.query;
  console.log(`CODE>>>>>>>>>>>>>>${code}`);
  const url = `https://oauth.vk.com/access_token?client_id=7327798&client_secret=KVv5burkbNpWD5qLKyIt&redirect_uri=https://counter-likes.herokuapp.com/auth/reg/&code=${code}`;
  console.log(`URL>>>>>>>>>>>>>>>${url}`);


  rp(url)
    .then((objInfo) => {
      console.log('>>>>>>>>>>>>>>>');
      console.log(objInfo);
      const { user_id } = objInfo;
      req.session.user = user_id;
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
