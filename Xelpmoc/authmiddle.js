const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
    const token = req.body.token;
    
    if(!token){
        return res.status(401).json({message:"NO token,not authorized"})
    }

    try{
        const decoded = jwt.verify(token,"secret");
        req.user = decoded.user;
        next();
    }   
    catch(err){
        res.status(401).json({message :"invalid token"});
    } 
}