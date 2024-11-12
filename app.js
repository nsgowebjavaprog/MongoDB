const express = require('express');
const app = express();

const userModel = require('./usermodule');

app.get('/', (req, res) =>{
    res.send("Hey");
})

//Create
app.get('/create', async (req, res) =>{
    let createduser =  await userModel.create({
        name:"Nagaraj",
        email:"nsloni258@gmail.com",
        username:"nsloni"
    })
    res.send(createduser);
})

//Updates
app.get('/update', async (req, res) =>{
 
    // userModel.findOneUpdate(findone, update, {new:true})
    let updateduser = await userModel.findOneAndUpdate({username:"Nagaraj"}, {name: "Nagaraj Loni"}, {new: true})
    res.send(updateduser);
})

app.listen(3000);