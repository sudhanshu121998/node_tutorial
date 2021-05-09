import express from 'express';
import route from './src/routes/routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app=express();
const PORT=4000;

//mongoose connection:Makes connection between mongodb and api
//going to wait for results while creating connection
mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://sudhanshu:Sudhanshu123@contactcrm.hnr9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//calling route function from routes.js
route(app);

//Serving static files such as images,pdf,movies,etc
app.use(express.static('images'))


app.get('/',(req,res)=>{
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT,()=>{
   console.log(`Node and express server running on port ${PORT}`)  
});