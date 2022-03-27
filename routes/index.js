const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// 👇 Ajout de routes
/* Movies routes */
const movies = require('./movies.routes');
router.use('/movies', movies);

/* Celebrities routes */
const celebs = require('./celebs.routes');
router.use('/celebs', celebs);


module.exports = router;
