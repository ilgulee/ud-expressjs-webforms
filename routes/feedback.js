var express = require('express');
var router = express.Router();

/*  feedback page. */
router.get('/', (req, res) => {
  var currentUser=req.session.user;
  if(!currentUser){
    res.render('login',{title: 'login error',message:'Please login first'});
  }else{
    if(currentUser!=null){
      res.render('feedback',{
        username:currentUser.username,
        firstname:currentUser.firstname,
        lastname:currentUser.lastname,
        comments:currentUser.comments,
        major:currentUser.major,
        hobby:currentUser.hobby,
        photo:currentUser.photo,
        title:"feedback",
        message:"You have to input all items."});
      
      currentUser=null;
      console.log('feedback get method user: '+currentUser);
    }
  }
 
});

router.post('/', (req, res) => {

    var currentUser=req.session.user;
    var majorString=String(req.body.major).trim();
    var hobbyString=String(req.body.hobby).trim();
    var commentsString=String(req.body.comments).trim();
    if((majorString.length!==0)
      &&(hobbyString.length!==0)
      &&(commentsString.length!==0)){
      currentUser.major=req.body.major;
      currentUser.hobby=req.body.hobby;
      currentUser.comments=req.body.comments;
      req.session.user.major=currentUser.major;
      req.session.user.hobby=currentUser.hobby;
      req.session.user.comments=currentUser.comments;
      currentUser=null;
      res.redirect('/thankyou');
    }else{
      res.render('feedback',
      {title:currentUser.title,
        message:"You have to input all items.",
        photo:currentUser.photo,
        username:currentUser.username,
        firstname:currentUser.firstname,
        lastname:currentUser.lastname});
      currentUser=null;
    }
 
});

  module.exports = router;