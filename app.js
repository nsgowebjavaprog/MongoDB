const express = require('express');
const app = express();
const userModel = require("./models/user");
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});


// save a password in normal way [as it is]
/*
app.post('/create', async (req, res) => {
    let { username, email, password, age } = req.body;

    let createdUser = await userModel.create({
        username,
        email,
        password,
        age
    })
    res.send(createdUser);
});
*/
// password save as 
// 3423232 [same]


app.post('/create', (req, res) => {
     let { username, email, password, age } = req.body;
          bcrypt.genSalt(10, (err, salt) => {

             bcrypt.hash(password, salt, async (err, hash) => {

            let createdUser = await userModel.create({ username, email, password: hash, age })
            
            let token = jwt.sign({email}, "nsnsnsnsns");
            res.cookie("token", token);
            res.send(createdUser);
        });
    });
});
// password save as     
//  "password": "$2b$10$q/S17puYFpEPSrc3Uravku4vDp6fIXwubQ8Hc8xLVRGuhjFSV7Txi",


app.get("/login", function(req, res) {
    res.render('login');
});


app.post("/login", async function(req, res){
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.send("Email error...");

    bcrypt.compare(req.body.password, user.password, function (err, result){
        if(result){
            let token = jwt.sign({email: user.email}, "nsnsnsnsns");
            res.cookie("token", token);
            res.send("login succ....");
        }
        else res.send("password error..")
    })
});


app.get("/logout", function(req, res) {
    res.cookie("token", "");
    res.redirect("/");
});


app.listen(3001, () => {
  console.log('Server started on port 3001');
});