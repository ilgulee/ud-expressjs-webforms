var express = require('express');
var router = express.Router();
var users=[
  {
    "username":"tom@gmail.com",
    "password":"pswd",
    "firstname":"Tom",
    "lastname":"Tsiliopolous",
    "comments":"",
    "major":"",
    "hobby":"",
    "photo":"../images/tom.jpeg"
  }
]

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login',message:'Welcome customer.' });
});

router.post('/', (req, res) => {
  if(!req.body.username || !req.body.password){
    res.render('login',{title: 'login error',message:'You must input email and password'});
  }else{
    users.filter(function(user){
      if(user.username===req.body.username && user.password===req.body.password){
        req.session.user=user;
        res.redirect('/feedback');
      }else{
        res.render('login',{title: 'login error',message:'Invalid Credentials'});
      }
    })
  }  
});
module.exports = router;
