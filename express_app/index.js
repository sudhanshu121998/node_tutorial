import express from 'express';
import data from './data/data.json';

const app=express();
const PORT=3000;

//GET Api
app.get('/',(req,res)=>{
    //get data first and then display if connected with db
    res.json(data);

})
//Routing:Parameters
//Need to pull specific user or data from dataset
//using /items/:id we are calling specific item


//Routes can have multiple route handler(code inside curly braces is termed as route handler)
app.get('/items/:id',(req,res,next)=>{
    console.log(req.params.id); //it is taking id as string 
    let user=Number(req.params.id) //so here we are converting that string to int or number
    console.log(user)
    console.log(data[user])//pulling specific user from the data
    res.send(data[user])//send user info to client or browser
    next(); //this will invoke the next route handler after executing all the above code
    
    //can do multiple next calls,but only once we can respond to client(res.send(output))
},(req,res,next)=>{
    console.log('Did you got the right data');
    next();
},(req,res)=>{
    console.log("Thanks for your response")
}

);

//using .route for chaining  of routes which are made on same path
app.route(('/item')
    .get((req,res)=>{
        //forcing route to throw an error using throw new Error();
        //throw new Error()
        res.send('Get request')
    })
    .put((req,res)=>{
        res.send(`Put request on PORT:${PORT}`)
    })
);
//Write error handling middleware at last,after any app.use and routes
//When code throw some error express searches for custom error handling function if not found uses the default one

/*Error Handling Function
app.use((err,req,res,next)=>{
    console.error(err.stack)
    //we can send anything we want i.e. HTML,an Object
    res.status(500).send(`Red Alert!${err.stack}`)
})*/

app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`);
});