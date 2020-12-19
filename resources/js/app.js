import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
import { initAdmin } from './admin'
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter');
function updateCart(pizza){
    //Ajax call ->> axios
    axios.post('/update-cart',pizza).then(res=>{
        // console.log(res);
        new Noty({
            text:'Item Added To Cart',
            type:'success',
            timeout:1000,
            progressBar:false
        }).show()
        cartCounter.innerText=res.data.totalQty
    }).catch(err=>{
        new Noty({
            text:'Something Went Wrong',
            type:'error',
            timeout:1000,
            progressBar:false
        }).show()
    })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log(e)
        // console.log(btn.dataset);
        // console.log(pizza);
        let pizza=JSON.parse(btn.dataset.pizza);
        // console.log(pizza);
        updateCart(pizza);
    })

})
const alertMsg=document.querySelector('#sucess-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000);
}



//change order status
let statuses=document.querySelectorAll('.status_line');
let hiddenInput=document.querySelector('#hiddenInput') ;
let order=hiddenInput? hiddenInput.value :null;
    order=JSON.parse(order)
let time=document.createElement('small');
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current');
    })
    let stepCompleted=true;
    statuses.forEach((status)=>{
        let dataProp=status.dataset.status;
        if(stepCompleted){
            status.classList.add('step-completed');
        }
        if(dataProp==order.status){
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
            stepCompleted=false;
            time.innerText=moment(order.updatedAt).format('hh:mm A , DD/MM/YYYY')
            status.appendChild(time);
        }
    })
    

}

updateStatus(order);

// Socket Client Side
let socket=io()
initAdmin(socket)
// Join 
if(order){
    socket.emit('join',`order_${order._id}`);
}
let adminAreaPath=window.location.pathname;

if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder={ ...order };
    updatedOrder.updatedAt=moment().format();
    updatedOrder.status=data.status;
    updateStatus(updatedOrder)
    // console.log(updatedOrder);
    new Noty({
        text:'Order Updated',
        type:'success',
        timeout:1000,
        progressBar:false
    }).show()
})