const express=require('express');
const router=express.Router();

const homeControllers=require('../controllers/home');

router.get('/authers',homeControllers.getAuthers);
router.get('/blogs',homeControllers.getBlogs);


module.exports=router;
