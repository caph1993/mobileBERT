//@ts-check
const { Router } = require("express");


const router = Router();

router.get('/', async (req, res) => {
  if (req.originalUrl.slice(-1) !== '/') return res.redirect(301, req.originalUrl + '/');
  res.render('pages/index.ejs');
});

module.exports = router;
