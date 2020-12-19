const Order=require('../../../models/Order')
function orderController(){
    return {
        index: (req,res)=>{ 
            Order.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}}).populate('customerId','-password').exec((err,orders)=>{
                // console.log(orders);
                if(req.xhr){
                    return res.json(orders)
                }
                return res.render('admin/order');
            })
        }
    }
}

module.exports=orderController;