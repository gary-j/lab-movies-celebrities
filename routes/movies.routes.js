const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get("/", async (req, res, next)=>{
   
    try{
        const allMovies = await Movie.find().populate('cast')
        console.log(allMovies, 'MOVIIIIIES HERE');
    
        // res.send('ROUTE MOVIES OK !');
        res.render('./movies/movies', {allMovies})
    }catch(err){
        next(err)
    }
  
})

router.get('/create', async (req, res, next)=>{
 // get the stars from db
 const allCelebs = await Celebrity.find()
 console.log(allCelebs, 'all celebs there');

    res.render('./movies/new-movie', {allCelebs})
})

router.post('/create', async (req, res, next)=>{

    const movieToCreate = req.body;
    console.log('LA REQUEST', movieToCreate, 'LA REQUEST');

    try{
        const createdMovie = await Movie.create(movieToCreate)

        res.redirect('/movies');

    }catch(err){
        next(err)
    }
    

});

router.get('/:id', async(req, res, next)=>{

    try{
    const movieId = req.params.id
    await Movie.findById(movieId).populate('cast')
    .then((movie)=>{
        const theMovie = movie
        res.render('./movies/movie-details', {theMovie})
    })

    }catch(err){
        next(err)
    }
})

// D E L E T E  M O V I E
router.post('/:id/delete', async (req, res, next)=>{

    try{
        await Movie.findByIdAndDelete(req.params.id)
        .then(
            // console.log('movie deleted !')
            res.redirect('/movies')
        )
    }
    catch(err){
        next(err)
    }
})

module.exports = router;