//importing the request library
var request=require('request')

//Testing for all the functionality
describe('get messages',()=>{
    //1st testpack
    it('should return 200 Ok',(done)=>{
        //install library called request to make http requests
        request.get('http://localhost:3000/messages',(err,res)=>{
            //expected result
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('should return a list,thats not empty',(done)=>{
        request.get('http://localhost:3000/messages',(err,res)=>{
            //expected result
            //res.body is a string by default convert to json first
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})