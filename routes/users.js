const express = require('express');
const rp = require('request-promise');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/info', (req, res, next) => {
  const id = req.session.user;
  const { token } = req.session;
  const url = `https://api.vk.com/method/users.get?user_ids=${id}&fields=photo_max,career,city,verified&access_token=${token}&v=5.103`;
  // console.log('>>>>>>.', url);

  rp(url)
    .then(async (objInfo) => {
      console.log(objInfo);

      const info = JSON.parse(objInfo);
      console.log(info.response[0]);
      req.app.locals.infoPerson = info.response;

      return res.redirect('/info');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/friends', (req, res, next) => {
  const id = req.session.user;
  const { token } = req.session;
  const url = `https://api.vk.com/method/friends.get?user_ids=${id}&count=2&fields=bdate,contacts,photo_100&access_token=${token}&v=5.103`;
  console.log('>>>>>>.', url);

  rp(url)
    .then(async (objInfo) => {
      // console.log(objInfo);

      const info = JSON.parse(objInfo);
      console.log(info.response);
      req.app.locals.count = info.response.count;
      req.app.locals.items = info.response.items;

      return res.redirect('/friends');
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get('/groups', (req, res, next) => {
//   const id = req.session.user;
//   const { token } = req.session;
//   const url = `https://api.vk.com/method/friends.get?user_ids=${id}&fields=bdate,contacts,photo_100&access_token=${token}&v=5.103`;
//   console.log('>>>>>>.', url);

//   rp(url)
//     .then(async (objInfo) => {
//       // console.log(objInfo);

//       const info = JSON.parse(objInfo);
//       console.log(info.response);
//       req.app.locals.count = info.response.count;
//       req.app.locals.items = info.response.items;

//       return res.redirect('/friends');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
module.exports = router;
