const db = require('../database/connection');
const { auth_client, auth_client_logged } = require('./AuthController');

module.exports = {
    async get_clients(req,res){
        var sql = "SELECT * from client";
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
    async get_sellers(req,res){
        var sql = "SELECT * from seller";
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
    async create_user(req,res){
        var sql = "INSERT INTO seller (name, email, password) VALUES (?,?,?)";
        var params = [req.body.name, req.body.email,req.body.password];

        if(req.body.whatsapp){
            sql = "INSERT INTO client ( email, password) VALUES (?,?)";
            params = [req.body.email, req.body.password];
        }
        
        await db.run(sql,params,(err,result)=>{
            if(err){
                res.status(500).json({"error":err});
            }else{
                res.json({
                    "message":"success",
                });
            }
            
        });
    },
    async update_user(req,res){ 
        const auth_user = auth_client_logged(req.body.email,req.body.atual)
        console.log(auth_user); 
        if(auth_user) {
            var sql = "UPDATE seller SET password = ? WHERE (email = ?)";
            var params = [req.body.password, req.body.email];
            console.log("entrei aqui");

            if(req.body.whatsapp){
                sql = "UPDATE client SET name = ?, password = ?, whatsapp = ? WHERE (email = ?)";
                params = [req.body.name, req.body.password, req.body.whatsapp,req.body.email];
            }
            await db.run(sql,params,(err,result)=>{
                console.log(result);
                if(err){
                    res.status(500).json({"error":err.message});
                }else{
                    res.json({
                        "message":"success",
                    });
                }
            });
        } else {
            res.status(500).json({"error":"Email ou senha Incorreta"});
        }   
    }
}