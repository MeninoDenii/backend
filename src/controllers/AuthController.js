const db = require('../database/connection');

const auth_client_logged = (email,senha)=>{
    var sql = "SELECT id FROM client WHERE (email = ?) AND (password = ?)";
    const params = [email, senha]
    console.log(params);
    db.get(sql,params,(err,rows)=>{
        if(rows !== undefined){
            return true;
        }else{
            return false;
        }
    });
}

const auth_client = (email)=>{
    console.log(email)
    var sql = "SELECT id FROM client WHERE (email = ?)";
    db.get(sql,email,(err,result)=>{
        if(!result){
            return false;
        }else{
            return true;
        }
    });
}
const auth_seller = (email)=>{
    console.log(email)
    var sql = "SELECT id FROM seller WHERE (email = ?)";
    db.get(sql,email,(err,result)=>{
        if(!result){
            return false;
        }else{
            return true;
        }
    });
}
module.exports = {
    auth_client,
    auth_seller,
    auth_client_logged
}
