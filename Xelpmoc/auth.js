const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require("./connection");
const crypto = require("crypto");


router.post('/', (req,res)=> {
    try{
        mysqlConnection.query("SELECT * FROM user WHERE email LIKE '%"+req.body.email+"%'",(err,row,fields)=>{
            if(!err){
                if(row.length==0){
                    return res.status(400).json({msg:"invalid creds"})
                }
                else{
                    const pass=crypto.createHash('md5').update(req.body.password).digest('hex');
                    if(pass!=row[0].password){
                        return res.status(400).json({error:"invalid creds"})
                    }
                    else{
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
                                return res.json({ token });
                            }
                        )
                    }
                }
            }
            else{
                res.status(400).json({error:"none"})
            }
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Service error');
    }    
});

module.exports = router;