const express = require('express');
// const request = require('request');
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

  // request(url, (error, response, body) => {
  //   console.error('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  //   res.redirect('/');
  // });

  rp(url)
    .then((objInfo) => {
      console.log(objInfo);
      res.redirect('/');
      // Process html...
    })
    .catch((err) => {
      console.log(err);
      // Crawling failed...
    });
  // const options = {
  //   uri: 'https://api.github.com/user/repos',
  //   qs: {
  //     access_token: 'xxxxx xxxxx', // -> uri + '?access_token=xxxxx%20xxxxx'
  //   },
  //   headers: {
  //     'User-Agent': 'Request-Promise',
  //   },
  //   json: true, // Automatically parses the JSON string in the response
  // };

  // rp(options)
  //   .then((repos) => {
  //     console.log('User has %d repos', repos.length);
  //   })
  //   .catch((err) => {
  //     // API call failed...
  //   });
});

// router.get('/main')

module.exports = router;
