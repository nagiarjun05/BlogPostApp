const express=require('express');
const router=express.Router();

const homeControllers=require('../controllers/home');
const userAuthentication=require('../middleware/authentication')

router.get('/authers',userAuthentication.authentication,homeControllers.getAuthers);
router.get('/blogs',userAuthentication.authentication,homeControllers.getBlogs);


module.exports=router;
