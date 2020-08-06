const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require("./connection");

router.post('/',(req,res)=> {
    try{
        mysqlConnection.query("SELECT * FROM user WHERE email LIKE '%"+req.body.email+"%'",(err,row,fields)=>{
            if(!err){
                if(row.length==0){
                    mysqlConnection.query("INSERT INTO `prabhat`.`user` (`email`, `name`, `password`) VALUES ('"+req.body.email+"', '"+req.body.name+"', MD5('"+req.body.password+"'))",(err)=>{
                        if(!err){
                            const payload={
                                user:{
                                    id:req.body.email
                                }
                            }
                            jwt.sign(
                                payload,"secret",
                                {expiresIn:360000},
                                (err,token) => {
                                    if(err) throw err;
                                    res.json({ token });
                                }
                            )
                        }
                        else{
                            res.status(400).json({err:err})
                            console.log(err);
                        }
                    })
                }
                else{
                    res.status(200).json({"err":"user already exist"});
                }
            }
            else{
                console.log(err);
            }
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Service error');
    }    
});

module.exports = router;