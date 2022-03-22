const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();


router.get("/", async (req, res, next)=>{
    // res.send('ROUTE celebs OK !');
    const allCelebs = await Celebrity.find();

    console.log('I GOT A CELEBS IN THE DM !', allCelebs)
    // allCelebs to array from object for the view

    res.render('../views/celebs/celebs.hbs', { allCelebs })
})

router.get("/create", (req, res, next)=>{
    res.render('../views/celebs/new-celeb.hbs')
})

router.post("/create", async (req, res, next)=>{

    const {name, occupation, catchPhrase} = req.body
    const celebToCreate = {
        name,
        occupation,
        catchPhrase
    }

    // console.log(celebToCreate, 'PROFIL A CRÉER')
    try {
        // 1. PUT celeb in db
        await Celebrity.create(celebToCreate);
        console.log('CELEB IS CREATED !');
        // 2. All Celebs - to do in celebs route
        // const allCelebs = await Celebrity.find();
        // console.log('I GOT A CELEBS IN THE DM !', allCelebs)
        // 3. Redirect to display celebs in view
    res.redirect('/')

        
    } catch (error) {
        next()
    }

})

module.exports = router;
