const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./models/user');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testapp1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// file-1: Root route
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", {users});
});

app.get('/edit/:userid', async (req, res) => {
    let users = await userModel.findOne({_id: req.params.userid});
    res.render("edit", {users});
});

app.get('/update/:userid', async (req, res) => {
    let {image, name, email} = req.body;
    let users = await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email},{new:true});
    res.redirect("/read");
});

app.post('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createUser = await userModel.create({
        name,
        email,
        image
    });
    res.redirect("/read"); 
});

// Start the server
const port = 3002;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});