const express = require('express');
const router = express.Router();

// Get Homepage
router.get('/',ifAuthenticated,(req, res)=>{
	res.render('welcome');
});

function ifAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/signup');
	}
}

module.exports = router;