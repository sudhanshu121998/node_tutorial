import {addNewContact,
        getContacts,
        getContactsWithId,
        updateContacts,
        deleteContact
    } from '../controllers/controller'

//create a arrow function route with takes app as a parameter
const route=(app)=>{
    //create the endpoint or route
    app.route('/contact')
    //Gets all contact
        .get((req,res,next)=>{
            //Middleware
            console.log(`Request from:${req.originalUrl}`)
            console.log(`Request from:${req.method}`)
            next();
        },getContacts)
        
        //adding new contact
        //passing function from controllers which will save the new contact in db
        .post(addNewContact); //closing of route
    
    //Creating outer route or endpoint
    app.route('/contact/:contactID')
        //get specific contact
        .get(getContactsWithId)
        //Updating specific contact
        .put(updateContacts)
        //deleting specific contact
        .delete(deleteContact)

}

export default route