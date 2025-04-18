import { Router } from "express";
import mongoose from "mongoose";

const authRoutes = Router()

mongoose.connect('mongodb://localhost:27017/login_signup')
const db = mongoose.connection

db.on('error',()=>console.log("Error in connection"))
db.once('open',()=>console.log("Connected to db"))

authRoutes.route('/login')
    .get((req,res)=>{
        res.render('login')
    })
    .post(async (req,res)=>{
        const {email,password} = req.body
        
        const data = {
            "email":email,
            "password":password
        }
        
        const isValid = await db.collection('users').findOne(data)

        if(isValid)
        {
            res.render('home')
        }
        else{
            return res.json({success:false, message:"Invalid Creds"})
        }
    })
    

authRoutes.route('/signup')
    .get((req,res)=>{
        res.render('signup')
    })
    .post(async (req,res)=>{
        const {name,email,phone,password} = req.body

        const data = {
            "name":name,
            "email":email,
            "phone no":phone,
            "password":password
        }
        
        const isPresent = await db.collection('users').findOne({$or:[{"email":email},{"phone no":phone}]})

        if(isPresent)
        {
            res.render('signup',{email:email})
            console.log('Users already exists')
        }else{
            await db.collection('users').insertOne(data)  
            res.redirect('/login')
        }
    })

export default authRoutes