const  express = require('express');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController')

const routes = express.Router();

routes.get('/', function(req, res) { res.json({hello : 'Welcome to dellen'});});

//Client
routes.get('/users',UserController.get_clients)
routes.post('/users',UserController.create_user)
routes.put('/users',UserController.update_user)

//Seller
routes.get('/sellers',UserController.get_sellers)

//Category
routes.get('/category',CategoryController.index)
routes.post('/category',CategoryController.create)

//Product
routes.get('/products',ProductController.get_products)
routes.post('/products',ProductController.create)
module.exports = routes;
