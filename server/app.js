var express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser =require('body-parser'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');


var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/marlabs');

var db = mongoose.connection;

db.on('error',function () {
  console.log('Error connecting to database');
});
db.on('open',function () {
  console.log('connection established to database');
});

//schema

var UserSchema = mongoose.Schema({
  "username": String,
  "password": String,

});

var fbUser = mongoose.model('fbUsers',UserSchema);





app.post('/sendUser',function (req,res) {
  var details = req.body;
  var newFbUser = new fbUser({
    "username":details.username,
    "password":details.password
  });
  newFbUser.save(function (err) {
    if(!err){
      console.log("New FB user Added succesfully");
    }else{
      console.log("New FB user not Added ");
    }
  });
  res.send({"flag":true});
});


app.post('/logInCheck',function (req,res) {
  // console.log(req.body);

  var logObj = req.body;

  fbUser.find(logObj,function (err,docs) {

    if(!err && docs.length>0){
      //console.log(docs[0].userType);
      var obj = {username:docs[0].username};
      console.log("log in succesful");

      var token = jwt.sign({'username':req.body.username},'marlabs-secret-key',{
        expiresIn: '2h'
      });

      res.send({"flag":true,"token":token});
    }
    else{
      console.log("log in failed");
      res.send({flag:false});
    }
  })
});


app.use(function (req,res,next) {
  var token = req.headers.authorization;
  console.log(" before app.use");
  console.log(token);
  console.log(" after app.use");
  if(token){
    console.log("if in token");
    jwt.verify(token,'marlabs-secret-key',function (err,decoded) {
      if(err){
        console.log("error in token");
        // console.log(err);
      }
      else {
        console.log("else");
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    })
  }else{

  }

});

var PostSchema = mongoose.Schema({
  "title": String,
  "description": String,
  "userCreated":String,
  "likes":[String],
  "comments":[{ }]
});

var Post = mongoose.model('posts',PostSchema);


app.post('/createPost',function (req,res) {
  var details = req.body;
  var newPost = new Post({
    "title": details.title,
    "description": details.description,
    "userCreated":details.userCreated
  });
  newPost.save(function (err) {
    if(!err){
      console.log("Newpost Added succesfully");
    }else{
      console.log("New post  not Added ");
    }
  });
  res.send({"flag":true});
});


app.get('/getPost',function (req,res) {
  // console.log(req.body);

  Post.find(function (err,docs) {

    if(!err && docs.length>0){
      //console.log(docs[0].userType);
      console.log(docs);
      console.log("post retrieved succesfully");
      res.send(docs);
    }
    else{
      console.log("post retrieved not succesful");
      res.send({flag:false});
    }
  });
});

app.post('/likepost',function (req,res) {
  // console.log(req.body);
  var post_id = req.body.post_id;
  var user = req.body.user;
  console.log("-----------")
  console.log(req.body.post_id);
  console.log(req.body.user);
  console.log("-------------");

  Post.find({"_id": post_id}, function (err, docs) {
    if (err) {
      console.log("error in retrieving likes");
      res.send(" not liked ");
    } else {
      //console.log(docs);
      docs[0].likes.push(user);
      docs[0].save(function (err,docs) {
        if(err){
          //console.log("error in liking");
          res.send(" not liked ");
        }else{
          //console.log("liked");
          res.send(" liked successfully");
        }
      })
    }


  });

});




app.post('/unlike',function (req,res) {
 //var cpost = req.body[0].post;

  Post.find({"_id": req.body.post_id}, function (err, docs) {
    if (err) {
      //console.log("error in retrieving likes");
      res.send("unliked not successful");
    } else {
      //console.log(docs);
      //docs[0].likes.push(req.body.user);
      docs[0].likes.splice(docs[0].likes.indexOf(req.body.user),1);
      docs[0].save(function (err,docs) {
        if(err){
         // console.log("error in liking");
          res.send("unliked not successful");
        }else{
          //console.log("unliked  successful");
          res.send("unliked successful");
        }
      })
    }


  });

});



app.post('/comment',function (req,res) {
  // console.log(req.body);
  console.log("-----------")
  console.log(req.body.post_id);
  console.log(req.body.comment);
  console.log("-------------");

  var post_id = req.body.post_id;
  var comment = req.body.comment;

  Post.find({"_id": post_id}, function (err, docs) {
    if (err) {
      res.send("error in commenting");
    } else {
      //console.log(docs);
      //docs[0].likes.push(req.body.user);
      var newComment = {
        "userCommented": comment.userCommented,
        "comment":comment.comment
      }
      docs[0].comments.push(newComment);
      docs[0].save(function (err,docs) {
        if(err){
          res.send("error in commenting");
        }else{
          res.send("Comment successful");
        }
      })
    }


  });

});

app.post('/getPostById',function (req,res) {
  console.log("********");
  console.log(req.body.post_id);
  Post.find({"_id": req.body.post_id}, function (err, docs) {
    if (err) {
      console.log("error in retrieving single post");
    } else {
      console.log(docs);
      res.send(docs);
      //docs[0].likes.push(req.body.user);
    }


  });
});


app.listen(2000,function () {
  console.log('server running @localhost:2000');
});


