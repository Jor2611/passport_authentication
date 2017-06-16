const express = require('express');
const router = express.Router();
const User = require("../model/userModel");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// SignUp
router.get('/signup', (req, res)=>{
	res.render('signup');
});

//SignIn
router.get('/signin', (req, res)=>{
	res.render('signin');
});

//SignUp Post
router.post('/signup',function(req, res){
	const name = req.body.fn;
	const username = req.body.un;
	const password=req.body.Pass;
	const confirmPass=req.body.Confirm;
	const birthDate=req.body._date;
	const gender=req.body.Gender;

	let newUser= new User({
		username:username,
		password:password,
		name:name,
		birth_date:birthDate,
		gender:gender
	});

	User.findOne({username:username},(err,doc)=>{
        if(err)return console.error(err.stack);
        if(doc!==null){
            res.render('signup',{"error_msg":"This UserName already exists,please try again!"});
        }else{ 
        	User.createUser(newUser,(err,doc)=>{
				if(err) return console.error(err.stack);
				console.log(doc);
				req.flash('success_msg',"Congratulations now You can SignIn");
				res.redirect('/users/signin');
        });}
    });
	
});
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) return console.error(err.stack);
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) return console.error(err.stack);
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/signin',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/signin',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/signout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Thank you for visiting!!');

	res.redirect('/users/signin');
});

module.exports = router;