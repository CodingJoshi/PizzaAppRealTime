import axios from 'axios'
import Noty from 'noty'
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

initAdmin()