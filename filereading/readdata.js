//Call the library filesystem(fs)
var fs = require('fs')

//access file system with function readFile and also define file-format utf-8
//as it is an async function we need callback as the 3rd parameter 
fs.readFile('./data.json','utf-8',(err,data)=>{
    var data=JSON.parse(data) //converting the data to json and then overriding it
    console.log(data.name) //it is just a string
})

//direct way to readfile
var data=require('./data.json')
console.log(data.name)  //here data is an object as we are able to access property
