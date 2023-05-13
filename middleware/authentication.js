const jwt=require('jsonwebtoken');
const User=require('../models/user');
const authentication=async (req, res, next)=>{
    try{
        const token=req.headers.authorization;
        const user=jwt.verify(token, 'secretToken')
        User.findByPk(user.userId)
        .then((user)=>{
            req.user=user;
            next();
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success: false});
    }
};

module.exports={
    authentication
};