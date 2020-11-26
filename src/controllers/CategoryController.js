const db = require('../database/connection');
const auth = require('./AuthController');

module.exports = {
    async index(req,res){
        var sql = "SELECT * from category";
        var params = [];
        await db.all(sql,params,(err,rows)=>{
            if(err){
                res.status(400).json({"error":err.message})
                return;
            }else{
                res.json({
                    "message":"success",
                    "data":rows
                });
            }
        });
    },
    async create(req,res){
        if(!auth.auth_seller(req.body.email)){
            res.status(500).json({"error":"fail auth"});  
        }
        var sql = "INSERT INTO category (name) VALUES (?)";
        params = [req.body.name];

        await db.run(sql,params,(err)=>{
            if(err){
                res.status(500).json({"error":err.message});
            }else{
                res.json({
                    "message":"success",
                    "data":params
                });
            }
            
        });
    },
}
    