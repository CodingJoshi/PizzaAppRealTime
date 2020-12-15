function cartController(){
    // factory function 
    return {
        // CRUD ==> create read update delete
        index: (req,res)=>{
            res.render('customers/cart');
        }
    }
}

module.exports=cartController;