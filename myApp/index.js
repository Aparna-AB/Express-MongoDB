const express =require("express");
const cors=require("cors");

const app=express();
const port=3050;
app.use(express.json());

app.use(cors());


const {userRoutes}=require("./routes/Users/users.routes.js");
const {productRoutes}=require("./routes/products/products.routes.js");
const {studentRoutes}=require("./routes/Student/student.routes.js");

const {connectDb}=require("./connectDB.js");
app.get("/",(req,res)=>{
    res.send("Home Page");
});


app.use("/user",userRoutes);
app.use("/products",productRoutes);
app.use("/students",studentRoutes);



connectDb().then (()=>{
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`);
    });
})
