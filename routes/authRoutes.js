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
        console.log(isValid)

        if(isValid)
        {
            res.render('home')
        }
        else{
            res.send('Invalid email or password')
        }
    })
    

authRoutes.route('/signup')
    .get((req,res)=>{
        res.render('signup')
    })
    .post(async (req,res)=>{
        const {name,email,password} = req.body

        const data = {
            "name":name,
            "email":email,
            "password":password
        }
        
        const isPresent = await db.collection('users').findOne({"email":email})
        console.log(isPresent)

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