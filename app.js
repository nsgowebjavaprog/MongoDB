const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");


app.get("/", function(req, res){
    res.send("Hello... NS LONi");
})

app.get("/create",async function(req, res){
    let user = await userModel.create({
        username: "Nagaraj Loni",
        age:20,
        email:"nsloni@gmail.com"
    });
    res.send(user);
})

app.get("/post/create", async function (req, res){
    let post = await postModel.create({
        postdata: "Hello hi everyone..",
        user: "673988e71ab43097beda33e7"
    });
    let user = await userModel.findOne({_id: "673988e71ab43097beda33e7"});

        user.posts.push(post._id);
        await user.save();
        res.send({ post, user });
})

app.listen(3000);

// OUTPUT

/*
{
  "post": {
    "postdata": "Hello hi everyone..",
    "user": "673988e71ab43097beda33e7",
    "_id": "67398cad182b96d3c36d376a",
    "date": "2024-11-17T06:26:53.560Z",
    "__v": 0
  },
  "user": {
    "_id": "673988e71ab43097beda33e7",
    "username": "Nagaraj Loni",
    "email": "nsloni@gmail.com",
    "age": 20,
    "posts": [
      "67398cad182b96d3c36d376a"
    ],
    "__v": 1
  }
}

*/