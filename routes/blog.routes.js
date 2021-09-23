const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('client/home', { name: 'Muhammed' });
});

router.get('/search', (req, res) => {
  const q = req.query.q;
  const page = req.query.page || 1;
  console.log(page);
  res.render('client/search', { query: q, totalResult: 10 });
});

router.get('/:id', (req, res) => {
  res.render('client/blog-preview');
});

module.exports = router;
