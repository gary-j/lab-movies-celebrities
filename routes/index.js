const router = require("express").Router();

// 👇 Ajout de routes
const movies = require('./movies.routes');
router.use('/movies', movies);

const celebs = require('./celebs.routes');
router.use('/celebs', celebs);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* movies routes */
router.get("/movies", (req,res,next)=> {
  res.render('movies.routes');
})

/* celebrities routes*/
router.get("/celebs", (req, res, next)=> {
  res.render("celebs.routes");
})

module.exports = router;
