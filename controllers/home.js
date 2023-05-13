const User=require('../models/user');
const Blog=require('../models/blog');
const sequelize = require('../util/database');

let ITEM_PER_PAGE=5;
const getAuthers=async function(req,res){
    try{
        const page= +req.query.page || 1;
        const totalCount = await User.count();
        const users=await User.findAll({
            offset: (page-1)*ITEM_PER_PAGE,
            limit:ITEM_PER_PAGE
        });
        res.status(201).json({
            success: true, 
            Users: users, 
            currentPage:page,
            hasNextPage:ITEM_PER_PAGE*page<totalCount,
            nextPage:page+1,
            hasPreviousPage:page>1,
            previousPage:page-1,
            lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
        });
    }
    catch(err){
        res.status(500).json({
            message: "Unable to retrieve Authers Name !"
        })
    }
};
const getBlogs=async function(req,res){
    try{
        const page= +req.query.page || 1;
        const totalCount = await Blog.count();
        console.log(page)
        const blogs=await Blog.findAll({
            order:[['id','DESC']],
            offset: (page-1)*ITEM_PER_PAGE,
            limit:ITEM_PER_PAGE
        });
        res.status(201).json({
            success: true, 
            Blogs: blogs, 
            currentPage:page,
            hasNextPage:ITEM_PER_PAGE*page<totalCount,
            nextPage:page+1,
            hasPreviousPage:page>1,
            previousPage:page-1,
            lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
        });
    }
    catch(err){
        res.status(500).json({
            message: "Unable to retrieve Recent Blogs !"
        })
    }
};

module.exports={
    getAuthers,
    getBlogs
};