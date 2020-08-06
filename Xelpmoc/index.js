const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser")
const postRoute = require("./Post");
const userRoute = require("./users");
const authRoute = require("./auth");
const mysqlConnection = require("./connection");
const cors = require("cors");

var app = express();
app.use(bodyparser.json());
app.use(cors());


app.use("/post",postRoute);
app.use("/user",userRoute);
app.use("/auth",authRoute);



app.listen(8000,()=>{
    console.log("server on port 8000");
});