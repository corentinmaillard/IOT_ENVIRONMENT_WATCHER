let express=require('express');
let router=express.Router();



router.get('/', (req,res)=>
{
    // on est redirigé vers /user direct
    res.redirect('/');
});



module.exports=router;