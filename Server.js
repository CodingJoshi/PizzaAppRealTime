require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT||3000;
const path=require('path')
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts');

const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash');
const MongoDbStore=require('connect-mongo')(session);
const passport=require('passport');

//Database connection
const url='mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('database Connected');
}).catch(err =>{
    console.log('Connection Failed.. ')
});


// passport Config 
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())

//Session store
let mongoStore = new MongoDbStore({
                    mongooseConnection: connection,
                    connection:'sessions'
                })

//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge: 1000*60*60*24} //24hr
}))

app.use(flash())



// assests 
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next();
})


// set ejs.Template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


require('./routes/web')(app)

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);

})