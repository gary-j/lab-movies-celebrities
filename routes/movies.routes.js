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


// Brian Valette's code idea
// Get selected status on celebrities
async function getCelebritiesWithSelectedStatus(movie) {
	const celebrities = await Celebrity.find();
	return celebrities.map(celeb => {
		return {
			isSelected: movie.cast.some(starId => starId.equals(celeb._id)),
			data: celeb,
		}
	});
}

// E D I T I N G  M O V I E
router.get('/:id/edit', async (req, res, next)=>{

    try{

      const movie = await Movie.findById(req.params.id)

      const celebs = await getCelebritiesWithSelectedStatus(movie)

        console.log(celebs, 'All celebs');

        res.render('./movies/edit-movie', {movie, celebs} )

    }catch(err){
        console.log(err, 'erreur');
        next(err)
    }
})

router.post('/:id/edit', async (req, res, next)=>{
    console.log(req.body, 'CE QU\'ENVOI LE FORMULAIRE');
    const updatedMovie = req.body

    try{

        await Movie.findByIdAndUpdate(req.params.id, updatedMovie)
        .then( (rep)=> console.log(rep, 'la réponse'))
       
        res.redirect(`/movies/${req.params.id}`)
    }
    catch(err){
        console.log(err, 'erreur');
        res.redirect(`/movies/${req.params.id}`)

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

// En dernier pour éviter l'override
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

module.exports = router;