const Blog=require('../models/blog');
const User=require('../models/user')
let ITEM_PER_PAGE=5;

const postBlog=async function(req,res){
    try{
        const title=req.body.title;
        const content=req.body.content;
        console.log(req.user.name)
        console.log(req.user.id)

        await Blog.create({
            title:title,
            content:content,
            author:req.user.name,
            userId:req.user.id
        })
        return res.status(201).json({message: 'Your Blog has succefully posted!!'});
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Unable to save blog !!"
        })
    }
};

const getBlogDetail=async function(req,res){
    try{
        const id=req.query.blogId
        console.log(id)
        const blog=await Blog.findOne({where:{id:id}})
        if(blog){
            return res.status(200).json({blog:blog})
        }  
    }
    catch(err){
        res.status(500).json({
            message: "Unable to retrieve Blog Details..."
        })
    }
};

const getAuthorBlogs=async function(req,res){
    try{
        const page= +req.query.page || 1;
        const id=req.query.authId;
        const user=await User.findByPk(id)
        const totalCount = await Blog.count({where:{userId:id}})
        const Blogs=await Blog.findAll({
            where:{ userId : id },
            offset: (page-1)*ITEM_PER_PAGE,
            limit:ITEM_PER_PAGE
        });
        if(Blogs.length>0 && user){
            return res.status(201).json({
                success: true, 
                Blogs: Blogs,
                User:user, 
                currentPage:page,
                hasNextPage:ITEM_PER_PAGE*page<totalCount,
                nextPage:page+1,
                hasPreviousPage:page>1,
                previousPage:page-1,
                lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
            });
        }
        return res.status(404).json({message: "No Blogs by Author !"})
    }
    catch(err){
        res.status(500).json({
            message: "Unable to retrieve Blogs by Author !"
        })
    }
};


module.exports={
    postBlog,
    getBlogDetail,
    getAuthorBlogs
}