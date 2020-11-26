const db = require('../database/connection');
const auth = require('./AuthController');

const create = async (req,res)=>{
    if(!auth.auth_seller(req.body.email)){
        res.status(500).json({"error":"fail auth"});  
    }
    var insert = 'INSERT INTO product (id_category,name,price,quantity,image_adress) VALUES (?,?,?,?,?)';
    params = [req.body.id_category,req.body.name,req.body.price,req.body.quantity,req.body.image_adress];

    await db.run(insert,params,(err)=>{
        if(err){
            res.status(500).json(err.message);
        }else{
            res.json({
                "message":"success",
            });
        }
    });
}
module.exports = {
    async get_products(req,res){
        var sql = "SELECT * from product";
        var params = []

        await db.all(sql,params,(err,rows)=>{
            if(err){
                res.status(500).json({"message":err.message})
            }else{
                res.json({
                    "message":"success",
                    "data":rows
                });
            }
        });
    },
    create
}