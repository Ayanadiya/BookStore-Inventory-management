const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {config}=require('dotenv');
const { where } = require('sequelize');

const SALTROUND=process.env.SALTROUND;
const JWTSECRETKEY=process.env.JWTSECRETKEY;

function generateToken(id, name){
    return jwt.sign({userId:id, name:name},JWTSECRETKEY);
}

exports.postSignUp= async(req, res)=>{
   try{ const {name, email, password}=req.body;
   if(!name || !email || !password)
   {
    res.status(400).json({message:"All fields are required"});
   }
    const hashedPassword=bcrypt(password, SALTROUND);
    const user=await User.create({
        username:name,
        password:hashedPassword,
        email:email,
        role:"user"
    });
    const token=await generateToken(user.id, user.username);
    res.status(200).json({role:user.role, token:token})
}catch(error){
    if(error.name==='SequelizeUniqueConstraintError')
        {
            res.status(400).json({message:"Email already have account, Please Login"});
            return;
        }
        console.log(error);
        res.status(500).json({error:error, message:"Could not add user"});
}
}

exports.postAdminRegister= async(req,res)=>{
    try {
        const {name, email, password}=req.body;
   if(!name || !email || !password)
   {
    res.status(400).json({message:"All fields are required"});
   }
    const hashedPassword=bcrypt(password, SALTROUND);
    const user=await User.create({
        username:name,
        password:hashedPassword,
        email:email,
        role:"admin"
    });
    const token=await generateToken(user.id, user.username);
    res.status(200).json({role:user.role, token:token})
        
    } catch (error) {
        if(error.name==='SequelizeUniqueConstraintError')
        {
            res.status(400).json({message:"Email already have account, Please Login"});
            return;
        }
        console.log(error);
        res.status(500).json({error:error, message:"Could not add user"});
    }
}

exports.postLogin= async(req,res)=>{
    try {
        const {email, password}=req.body;
        const user=await User.findOne({where:{email:email}});
        if(user)
        {
            const isMatch=await bcrypt.compare(password, user.password);
            if(isMatch)
            {
                const token=generateToken(user.id, user.username);
                res.status(200).json({role:user.role, token:token});
            }
            else
            {
                res.status(401).json({message:"Invalid password"});
            }
        }
        res.status(401).json({message:"User not found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.getAdmin= async(req,res)=>{
    try {
        const admins= await User.findAll({
            where:{role:"admin"},
            attributes:[username,email]
        })
        console.log(admins);
        res.status(200).json({admins:admins});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.getUser= async(req,res)=>{
    try {
        const users= await findAll({
            where:{role:"admin"},
            attributes:[username, email]
        })
        console.log(users);
        res.status(200).json({users:users});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
}