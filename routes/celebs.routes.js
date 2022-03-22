const router = require("express").Router();

router.get("/", (req, res, next)=>{
    res.send('ROUTE celebs OK !');
})

module.exports = router;
