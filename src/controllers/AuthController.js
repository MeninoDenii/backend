const db = require('../database/connection');

const auth_client_logged = (email,password)=>{
    var sql = "SELECT id FROM seller WHERE email = "+"'"+email+"'"+" AND password = "+"'"+password+"'";
    var sql2 = "SELECT id FROM seller WHERE (email = ?) AND (password = ?) ";
    params = [email,password]
    db.get(sql2,params,(err,rows)=>{
        console.log(rows)
        if(!rows){
            return false
        }
        else{
            return true;
        }
    })
    

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
