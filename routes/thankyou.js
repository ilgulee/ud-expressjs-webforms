var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var currentUser=req.session.user;
    if(!currentUser){
       res.render('login',{title: 'login error',message:'Please login first'});
       
    }else{
        console.log('thankyou post method user session:'+req.session.user);
        res.render('thankyou',{title:"Thank You!",photo:currentUser.photo});
        currentUser=null;
    }
});



router.post('/', (req, res,next) => {
    req.session.user=null;
    req.body.user=null;
    console.log(req.session.user);
    console.log(req.body.user);
    res.redirect('/login');
});



module.exports = router;