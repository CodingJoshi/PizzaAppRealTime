const Order=require('../../../models/Order');
const moment=require('moment');
function ordersController(){
    return {
        store(req,res){
            // console.log(req.body);
            const {phoneNo , address}=req.body;
            if(!phoneNo || !address){
                req.flash('error',"All Fields required");
                console.log('All fields required');
                return res.redirect('/cart');
            }
            const order =new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phoneNo,
                address: address,
            })
            // console.log(order);
            order.save((err,result)=>{
                if(err) {
                    console.log(err);
                    req.flash('error',"Something Went Wrong");
                    return res.redirect('/cart');
                }
                req.flash('sucess',"order Placed Sucessfully");
                delete req.session.cart;
                return res.redirect('/customer/orders');
            })
            
        },
        async index(req,res){
            //fetch order of current logged in user from data base
            const orders=await Order.find(
                { customerId:req.user._id },
                null,
                { sort : {'createdAt':-1 } 
            })
            // console.log(orders);
            res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
            return res.render('customers/orders',{order:orders,"moment":moment})
        }
    }
}
module.exports=ordersController;