const brcrypt = require('bcrypt');
const express = require('express');
const { error } = require('npmlog');
const router = express.Router();
const User = require('../model/user.model');

router.use('/', (req, res, next) => {
  res.locals.layout = 'admin/layout';
  next();
});

// auth routes
router.get('/register', (req, res) => {
  res.render('admin/register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  let errors = [];
  const { name, email, password, password2 } = req.body;
  if (!(name && email && password && password2)) {
    errors.push({ msg: 'All fileds are required' });
  }

  if (password != password2) {
    errors.push({ msg: 'Password not matching' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characers' });
  }

  if (errors.length > 0) {
    res.render('admin/register', { errors, name, email, password, password2 });
  } else {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      errors.push({ msg: 'Email address already exist!' });
      return res.render('admin/register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }

    const hashPassword = await brcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    try {
      await user.save();
      req.flash('success_msg', 'User Registration Success');
      res.redirect('/admin/login');
    } catch (e) {
      console.log(e);
      errors.push({ msg: 'Registration failed!' });
      res.render('admin/register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }
  }
});

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  if (!(email && password)) {
    errors.push({ msg: 'Please provide email and password' });
  }

  let user = await User.findOne({ email });

  if (!user) {
    errors.push({ msg: 'User does not exist' });
  }

  if (user && !(await brcrypt.compare(password, user.password))) {
    errors.push({ msg: 'Incorrect Password!' });
  }

  if (errors.length == 0) {
    res.redirect('/admin');
  } else {
    res.render('admin/login', { errors, email, password });
  }
});

// post routes
router.get('/', (req, res) => {
  res.render('admin/dashboard', { title: 'Dashboard' });
});

router.get('/post/add', (req, res) => {
  res.render('admin/add', { title: 'Add new post' });
});

router.post('/post/add', (req, res) => {
  res.send('hello');
});

router.get('/post/edit/:id', (req, res) => {
  res.render('admin/edit');
});

router.post('/post/edit/:id', (req, res) => {
  res.send('hello');
});

router.get('/post/delete/:id', (req, res) => {
  res.send('hello');
});

module.exports = router;
