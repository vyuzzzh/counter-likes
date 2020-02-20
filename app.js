const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const VkStrategy = require('passport-vkontakte').Strategy;
const User = require('./models/user');


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-lawna.mongodb.net/Counter-likes`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: '>ochki&&nado?',
//   store: new FileStore({}),
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false },
// }));

// app.use((req, res, next) => {
//   const { name } = req.session;
//   if (name) {
//     app.locals.username = name;
//     return next();
//   }
//   return res.redirect('/auth/login');
// });

const { VK_APP_ID } = process.env;
const { VK_APP_SECRET } = process.env;

// if (!VK_APP_ID || !VK_APP_SECRET) {
//   throw new Error('Set VK_APP_ID and VK_APP_SECRET env vars to run the example');
// }

// // User session support for our hypothetical `user` objects.
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then((user) => { done(null, user); })
//     .catch(done);
// });

// Use the VkStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and VK
//   profile), and invoke a callback with a user object.
// passport.use(new VkStrategy(
//   {
//     clientID: VK_APP_ID,
//     clientSecret: VK_APP_SECRET,
//     callbackURL: 'http://localhost:3000/auth/vk/callback',
//     scope: ['email'],
//     profileFields: ['email'],
//   },
//   ((accessToken, refreshToken, params, profile, done) => {
//     // asynchronous verification, for effect...
//     process.nextTick(() =>

//       // To keep the example simple, the user's VK profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the VK account with a user record in your database,
//       // and return that user instead.
//       done(null, profile));
//   }),
// ));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
