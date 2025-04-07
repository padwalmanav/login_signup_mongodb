import { Router } from "express";

const authRoutes = Router()

authRoutes.route('/login')
    .get((req,res)=>{
        res.render('login')
    })
    .post((req,res)=>{
        const {email,password} = req.body
    
        if(email === 'padwalmanav03@gmail.com')
        {
            res.render('home')
        }
        else{
            res.render('login',{email:email})
        }
    })
    

authRoutes.route('/signup')
    .get((req,res)=>{
        res.render('signup')
    })
    .post((req,res)=>{
        const {name,email,password} = req.body

        if(name==='manav')
        {
            res.send("user already exists")
        }
        else{
            res.render('login')
        }
    })

export default authRoutes