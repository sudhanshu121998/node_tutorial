var fs=require('fs')

var data={
    name:'Sudhanshu Ranjan Dubey'
}

const md=` # This is a new file`;  

fs.writeFile('data.json',JSON.stringify(data),(err)=>{
    console.log('Writing Finished',err)
})

fs.writeFile('./notes.md',md.trim(),(err)=>{
    console.log('Writing Finished',err)
})