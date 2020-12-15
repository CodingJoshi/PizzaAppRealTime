function authController(){
    // factory function 
    return {
        // CRUD ==> create read update delete
        login: (req,res)=>{
            res.render('auth/login');
        },
        register: (req,res)=>{
            res.render('auth/register');
        }
    }
}

module.exports=authController;