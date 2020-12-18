const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/User');
const brcypt=require('bcrypt');
function init(passport){
    passport.use(new LocalStrategy(
        {usernameField:'email'},
        async (email, password, done)=>{
            //check email exist or not
            await User.findOne({ email: email }, function (err, user) {
                if (err) { 
                    console.log('something went wrong while finding the user');
                    return done(err); 
                }
                if (!user) {
                    console.log("This email doesn't Register");
                    return done(null, false,{message:"This email isn't Register"}); 
                }
                if(user){
                    return brcypt.compare(password, user.password, function(err, result) {
                        if(err){
                            console.log('error while comparing password bcrpt');
                            return done(err);
                        }
                        if(result){
                            console.log("user matched");
                            return done(null,user,{message:"Logged in sucessfully"});
                        }
                        return done(null,false,{message:"Wrong username or password"});
                    });
                }
                return done(null, user);
            });
    
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });

}



module.exports=init;