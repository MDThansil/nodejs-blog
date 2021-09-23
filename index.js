require('dotenv').config();
const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const PORT = 8000;

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayout);
app.set('layout', 'client/layout');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// routes
app.use('/admin', require('./routes/admin.routes'));
app.use('/', require('./routes/blog.routes'));

mongoose
  .connect(process.env.DATABASE_URL)
  .then((client) => {
    app.listen(process.env.PORT || PORT, () => {
      console.log('server started');
    });
  })
  .catch((error) => {
    console.log(error);
  });
