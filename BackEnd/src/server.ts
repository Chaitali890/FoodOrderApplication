import express from "express";
import cors from "cors"
import { sample_food, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"


const app = express();
app.use(express.json())
app.use(cors({
        credentials:true,
        origin:["http://localhost:4200"]
}));

app.get("/api/foods",(req,res)=>{
    res.send(sample_food)
})

//Get food vis searchterm
app.get("/api/foods/search/:searchTerm",(req,res)=>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_food.filter(food =>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})

//Get foods by All tags
app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tags)
})

//Get foods by special tags
app.get("/api/foods/tag/:tagName",(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_food.filter(food=>food.tag?.includes(tagName));
    res.send(foods)
})

//Get food by id
app.get("/api/foods/:foodId",(req,res)=>{
    const foodId = req.params.foodId;
    const food = sample_food.find(food=>food.id==foodId);
    res.send(food);
})

//Login api
app.post("/api/users/login",(req,res)=>{
    const {email, password} = req.body;
    const user = sample_users.find(user=>user.email === email && user.password ===password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("User name or Password is invalid")
    }
})

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"WebTut",{
        expiresIn:"30d"
    });
    user.token = token;
    return user;
}

const port = 5000;
app.listen(port,()=>{
    console.log("Website is running on http://localhost:"+port)
})