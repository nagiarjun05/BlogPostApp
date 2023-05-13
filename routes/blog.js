const express=require('express');
const router=express.Router();

const blogControllers=require('../controllers/blog');
const userAuthentication=require('../middleware/authentication')


router.post('/postblog',userAuthentication.authentication,blogControllers.postBlog);
router.get('/getblog',userAuthentication.authentication,blogControllers.getBlogDetail);
router.get('/getauthblog',userAuthentication.authentication,blogControllers.getAuthorBlogs);

module.exports=router;
