const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "poker",
    database : "prabhat"
});


mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB Connected");
    }
    else{
        console.log(err);
    }
})

module.exports = mysqlConnection;