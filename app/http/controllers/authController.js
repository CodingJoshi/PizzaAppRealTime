const User=require('../../models/User')
const bcrypt=require('bcrypt');
function authController(){
    // factory function 
    return {
        // CRUD ==> create read update delete
        login: (req,res)=>{
            res.render('auth/login');
        },
        register: (req,res)=>{
            res.render('auth/register');
        },
        postRegister:(req,res)=>{
            const {name,email,password}=req.body;
            if(!name|| !email || !password){
                req.flash('error',"All Fields Required");
                req.flash('name',name);
                req.flash('email',email);
                res.redirect('/register');
                return;
            }

            // check if user exist
            return User.exists({email:email},async (err,result)=>{
                if(err){
                    req.flash('error',"Something Went Wrong");
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                    
                }
                if(result){
                    req.flash('error',"User Already Exists");
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                }
                else{
                    hashPassword=bcrypt.hashSync(password,10);
                    // hashPassword=password;
                    const user=new User({
                        name,
                        email,
                        password:hashPassword
                    });
                    user.save((err,result)=>{
                        if(err){
                            console.log("Something Went Wrong while saving");
                            res.redirect('/');
                            return;
                        }
                        if(result){
                            res.redirect('/');
                            return;
                        }
                    })
                }
            })
        }
    }
}

module.exports=authController;