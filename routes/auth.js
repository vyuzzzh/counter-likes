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
  console.log('>>>>>>>>>>>>>>>>>>>>>>REG>>>>>>>>>>>>>>>');
  
  const { code } = req.query;
  console.log('>>>>>>>>>>>>>>>>>>>>>>REG>>>>>>>>>>>>>>>');

  console.log(code);
  
  const url = `https://oauth.vk.com/access_token?client_id=7327798&client_secret=d60Ug4amPVS7N2qlGBoq&redirect_uri=http://counter-likes.herokuapp.com/auth/reg&code=${code}`;
  
  console.log(`>>>>>>>URL>>>>${url}`);
  
  rp(url)
    .then(async (objInfo) => {
      console.log('gagjagkajglkralgrje');
      console.log(`>>>>>>>>>>>${objInfo}`);
      
      const info = JSON.parse(objInfo);
      console.log(`INFOO>>>>${info}`);
      
      const id = info.user_id;
      const { email, access_token, expires_in } = info;
      console.log(id, email, access_token);
      
      const userFind = await User.findOne({ id });

      console.log('<<<<<<<<WTF???');
      if (!userFind) {
        
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
