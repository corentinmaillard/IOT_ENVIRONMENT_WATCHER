let express=require('express');
let router=express.Router();



router.get('/', (req,res)=>
{
    res.render("moisture.ejs");
});

router.get('/soilmoisture', (req,res)=>
{
    res.render("soilmoisture.ejs");
});

router.get('/light', (req, res) => {
  res.render("light.ejs");
});

router.get('/temperature', (req, res) => {
  res.render("temperature.ejs");
});

module.exports = router;
