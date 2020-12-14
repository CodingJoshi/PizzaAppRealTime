const express=require('express');
const app=express();
const PORT=process.env.PORT||3000;
const path=require('path')
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts');

// assests 
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home');
})

// set ejs.Template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);

})