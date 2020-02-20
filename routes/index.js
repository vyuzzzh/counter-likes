const express = require('express');
const request = require('request');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Counter-likes' });
});

router.get('/reg', (req, res, next) => {
  const { code } = req.query;
  console.log(code);
  const url = `https://oauth.vk.com/access_token?client_id=1&client_secret=H2Pk8htyFD8024mZaPHm&redirect_uri=https://counter-likes.herokuapp.com/reg/&code=${code}`;

  request(url, (error, response, body) => {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.redirect('/');
  });
});


module.exports = router;
