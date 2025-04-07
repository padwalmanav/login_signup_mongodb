import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";

dotenv.config()

const port = process.env.PORT
const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('onboarding')
})

app.route('/home')
    .get((req,res)=>{
        res.render('home')
    })    
    
app.use(authRoutes)

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`)
})