const router = require('express').Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/registration', (req, res) => {
  res.render('registr');
});

router.post('/registration', async (req, res) => {
  const {
    name, email, password,
  } = req.body;
  console.log(name, email, password);
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    return res.json({ answ: 'Такая почта уже зарегистрирована.' });
  }
  const user = await User.create({ name, email, password });
  req.session.user = user._id;
  req.session.name = user.name;
  return res.json({ state: true });
});

router.post('/registration/:token', async (req, res) => {
  const { token } = req.params;
  const {
    name, email, password,
  } = req.body;
  console.log(name, email, password);
  console.log(token);
});

router.post('https://oauth.vk.com/:token', async (req, res) => {
  const { token } = req.params;
  const {
    name, email, password,
  } = req.body;
  console.log(name, email, password);
  console.log(token);
});

router.post('/login', async (req, res) => {
  const {
    email, password,
  } = req.body;
  console.log(email, password);

  const findedUser = await User.findOne({ email, password });
  if (findedUser) {
    req.session.user = findedUser._id;
    req.session.name = findedUser.name;
    return res.json({ state: true });
  }
  return res.json({ answ: 'Неверное имя пользователя или пароль.' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    delete req.app.locals.username;
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

module.exports = router;
