const session = require("express-session");

function cartController(){
    // factory function 
    return {
        // CRUD ==> create read update delete
        index(req,res){
            res.render('customers/cart')
        },
        update(req,res){
            // let cart={
            //     items:{
            //         pizzaId: {item: pizzaObject,qty:0},
            //     },
            //     totalQty:0,
            //     totalPrice:0
            // }
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalPrice:0,
                    totalQty:0
                }
            }
            let cart=req.session.cart;
            // Check if item doesn't exist in cart
            // console.log(req.body);
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty:0
                }
            }
            // console.log(cart.items);
            cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
            cart.totalQty=cart.totalQty+1;
            cart.totalPrice=cart.totalPrice + parseInt(req.body.price);

            return res.json({
                totalQty: req.session.cart.totalQty
            })
        }
    }
}

module.exports=cartController;