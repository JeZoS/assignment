const express = require("express");
const Router = express.Router();
const auth = require("./authmiddle");
const mysqlConnection = require("./connection");

Router.get("/",(req , res)=>{
    mysqlConnection.query("SELECT * from post",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})
Router.post("/",auth,(req,res)=>{
    mysqlConnection.query("INSERT INTO `prabhat`.`post` (`idemail`, `name`, `realpost`) VALUES ('"+req.user.id+"', '"+req.body.name+"', '"+req.body.post+"')",(err)=>{
        if(!err){
            res.status(200).json({"ok":"ok"});
        }
        else{
            res.status(400).json({err:err})
            console.log(err);
        }
    })
})

module.exports = Router;