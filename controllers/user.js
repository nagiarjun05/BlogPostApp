const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function stringValidator(string){
    return string===undefined||string.length===0?true:false
};

function generateTokken(id,name){
    return jwt.sign({userId: id, name: name}, 'secretToken')
}

const signup= async (req, res)=>{
    try{
        const {name,email,password}=req.body;

        if (stringValidator(name)||stringValidator(email)||stringValidator(password)){
            return res.status(401).json({err:"Invalid username or password"})
        };

        const users= await User.findOne({where:{'email':email }})
        if(users){
            return res.status(403).json({success: false, message: "User Already Exist"});
        };

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            await User.create({
                name: name,
                email: email,
                password: hash
            });

            return res.status(201).json({success: true, message: "Succesfully create new User"});
        }) 
    } catch(err){
        return res.status(500).json(err);
    }
};

const login=async (req, res)=>{
    try{
        const {email, password}=req.body;

        const users= await User.findAll({ where : { email }})
                
        if(users.length>0){
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(err){
                    throw new Error('Something went wrong')
                }
                else if(result){
                    return res.status(200).json({success: true, message: 'User Loged in Succesfully!', token:(generateTokken(users[0].id,users[0].name))})
                }
                else{
                    return res.status(401).json({success: false, message: 'Please check your username/password!'})
                }
            })
        }else{
            return res.status(404).json({success: false, message: `User Doesn't Exist!`})
        }
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
};

module.exports={
    signup,
    login
};