const fs=require("fs")
//Import the file
const data= require('./data.json')

//go through each object using forEach loop,n is the counter object

data.nameList.forEach(n =>{
    //use appendFile function and also the path name to the new file
    //`\n` gives a new line 
    fs.appendFile("./name.md",`${n.name}\n`,err=>{
        if(err)
        {
            throw err
        }
    })
})
