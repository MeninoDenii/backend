const db = require('./connection');

var client = `CREATE TABLE client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text, 
    email text UNIQUE, 
    password text,
    whatsapp text,
    CONSTRAINT email_unique UNIQUE (email)
    )`;

var seller = `CREATE TABLE seller (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text, 
    email text UNIQUE, 
    password text,
    CONSTRAINT email_unique UNIQUE (email)
    )`;

var category = `CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text UNIQUE,
    CONSTRAINT name_unique UNIQUE (name)
    )`;

var product = `CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_category INTEGER,
    name TEXT,
    price REAL,
    quantity INTEGER,
    image_adress TEXT,
    CONSTRAINT name_unique UNIQUE (name)
    FOREIGN KEY (id_category) REFERENCES category (id)
    )`;

var sale = `CREATE TABLE sale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    status TEXT,
    value REAL
    )`;

var line_item  = `CREATE TABLE line_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_sale INTEGER,
    id_product INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (id_sale) REFERENCES sale (id),
    FOREIGN KEY (id_product) REFERENCES product (id)
    )`;

db.run(sale,(err)=>{
    if(err){console.log('table sale already created.')}
});
db.run(line_item,(err)=>{
    if(err){console.log('table line_item already created.')}
});

db.run(client,(err) => {
    if(err){
        //Table already created
        console.log('table client already created.')
    }else{
        //seeds 
        console.log('create seeds of client...')
        var insert = 'INSERT INTO client (name, email, password, whatsapp) VALUES (?,?,?,?)'
        db.run(insert,['client','client@test.com','client321','99-0000-0000'])
    }
    }
);
db.run(seller,(err) => {
    if(err){
        //Table already created
        console.log('table seller already created.')
    }else{
        //seeds 
        console.log('create seeds of seller...')
        var insert = 'INSERT INTO seller (name, email, password) VALUES (?,?,?)'
        db.run(insert,['vendendor','vendendor@test.com','vendendor321'])
    }
    }
);
//Create table category
db.run(category,(err) => {
    if(err){
        //Table already created
        console.log('table category already created.')
    }else{
        //seeds 
        console.log('create seeds of category...')
        var insert = 'INSERT INTO category (name) VALUES (?)'
        db.run(insert,['Sapatos'])
        db.run(insert,['Camisas'])
    }
    }
);
//Create table category
db.run(product,(err) => {
    if(err){
        //Table already created
        console.log('table product already created.')
    }else{
        //seeds 
        console.log('create seeds of product...')
        var insert = 'INSERT INTO product (id_category,name,price,quantity,image_adress) VALUES (?,?,?,?,?)'
        var image_adress = 'https://images.lojanike.com.br/500x500/produto/259100_2218363_20200616134949.jpg'
        db.run(insert,['1','Tênis Nike',200,20,image_adress])
    }
    }
);
