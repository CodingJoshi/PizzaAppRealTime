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
                Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
                    req.flash('sucess',"order Placed Sucessfully");
                    delete req.session.cart;
    
                    //Emit 
                    const eventEmitter=req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced',placedOrder)
                    return res.redirect('/admin/orders');
                })
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
        },
        async show(req,res){
            // console.log(req.params.Id);
            const  order=await Order.findById(req.params.Id);
            console.log(order);
            // Authorize user
            if(req.user._id.toString()==order.customerId.toString()){
                return res.render('customers/singleOrder',{order});
            }
            res.redirect('/');
        }
    }
}
module.exports=ordersController;