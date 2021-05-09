import mongoose from 'mongoose'
import {contactSchema} from '../models/models'

//contact constructor with mongoose then execute the model function and pass the Contact as object
//to create new item in db and leveraging contactSchema as model for contact
const Contact=mongoose.model('Contact',contactSchema);

//Function to addNewContact in database
export const addNewContact=(req,res)=>{
    let newContact= new Contact(req.body);
    //saving new contact in db
    newContact.save((err,contact)=>{
        if(err){
            res.send(err)
        }
        //sends object
        res.json(contact)
    });
}

//Function to view all the db contacts
export const getContacts=(req,res)=>{
    //finding all the data in db
    Contact.find({},(err,contact)=>{
        if(err){
            res.send(err)
        }
        //sends object or array of object 
        res.json(contact)
    });
}

//Function to getContact with particular id
export const getContactsWithId=(req,res)=>{
    //finding all the data in db
    Contact.findById(req.params.contactID,(err,contact)=>{
        if(err){
            res.send(err)
        }
        //sends object or array of object 
        res.json(contact)
    });
}

//Updating Specific Contact
export const updateContacts=(req,res)=>{
    //finding all the data in db
    Contact.findOneAndUpdate({ _id:req.params.contactID },req.body,{new:true,useFindAndModify:false},(err,contact)=>{
        if(err){
            res.send(err)
        }
        //sends object or array of object 
        res.json(contact)
    });
}

//Delete specific contact
export const deleteContact=(req,res)=>{
    //finding all the data in db
    Contact.remove({ _id:req.params.contactID },(err,contact)=>{
        if(err){
            res.send(err)
        }
        //sends object or array of object 
        res.json({message:'successfully deleted contact'})
    });
}