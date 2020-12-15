const homeController=require('../app/http/controllers/homeController'); // .. use to come out of current folder  and ./ is current folder
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');

function initRoutes(app){
    app.get('/',homeController().index)
        
    // app.get('/',(req,res)=>{
    //     res.render('home');
    // })
    
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)
    
    app.post('/register',(req,res)=>{
        // conplete logic => should be move to controllers
    })
    
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)

}

module.exports=initRoutes;