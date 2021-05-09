var express = require('express') //importing express framework
var app=express() //reference from instance of express
var bodyParser=require('body-parser')


//implementing socket.io 
//creating regular http server which will share with express and socket.io
var http= require('http').Server(app)
var io= require('socket.io')(http)

//database connection
var mongoose=require('mongoose')


//preparing for usage of HTML file
//express.static is used to serve static file and in that we are passing complete directory
app.use(express.static(__dirname)) //used to serve the html(static content) file(here index.html)
app.use(bodyParser.json()) //here bodyParser know that we expect json to be coming in with HTTP request
app.use(bodyParser.urlencoded({extended:false})) // as values from browser are urlencoded,hence added boyparser to support that


//Database url
var dbUrl='mongodb+srv://sudhanshu:sudhanshu123@chatclient.mevme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//database model or schema 
var Message= mongoose.model('Message',{
    name:String,
    message:String
})

//Creating placeholder messagelist as an array,creating 2 message objects
/*var messages=[
    {name:'Bugga',message:'Hi'},
    {name:'Buggu',message:'Hello'}
]
*/
//Add routes for end point to get messages, using app.get to specify that only get request will be handled
app.get('/messages',(req,res)=>{
    //Send msg from mongo db
    Message.find({},(err,messages)=>{
        res.send(messages)
    })
    
})

//Add routes for end point to post(to get new messages),using app.post 
app.post('/messages',(req,res)=>{
    //create object of database model
    var message=new Message(req.body)

    //Save it to mongodb
    message.save((err)=>{
        if(err)
            sendStatus(500)
        //Example of nested callback (for finding badwords)
        /*
        Message.findOne({message:'badword},(err,censored)=>{
            if(censored){
                console.log('censored words found',censored)
                Message.remove({_id:censored.id},(err)=>{
                    console.log(removed censored message)
                })
            }
        })
        */

        //install body-parser to parse the body npm install -s body-parser
       // messages.push(req.body) adding new messages to messages array
        io.emit('message',req.body) //notifies client for new msg
        res.sendStatus(200)
    })

    
})

//setting up callback it will let us know whenever new user connects
io.on('connection',(socket)=>{
    console.log('user connected')
})

//setting up connection with db using mongoose
mongoose.connect(dbUrl,{useNewUrlParser: true},(err)=>{
    console.log('mongo db connection',err)
})


//starting express server 
//including http server to connect socket.io and express
var server=http.listen(3000,()=>{
    console.log('server is listening',server.address().port) //used server.address().port so that any changes in port will be reflect directly
}) 