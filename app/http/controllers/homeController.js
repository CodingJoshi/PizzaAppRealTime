const Menu=require('../../models/menu')
function homeController(){
    // factory function 
    return {
        // CRUD ==> create read update delete
        async index (req,res){

            const pizzas=await Menu.find()
            // console.log(pizzas);
            return res.render('home',{pizzas:pizzas});


            // Menu.find().then(function(pizza) {
            //     console.log(pizza);
            //     return res.render('home',{pizzas:pizza});
            // })
        }
    }
}

module.exports=homeController;

// s%3A-r8jqxT89A78TZTvuwpkqKWO5JxFq6dM.fGyQH18T%2BOI8NuXqX7BsR7QM0WXTvzzA8ByG0iopHIs