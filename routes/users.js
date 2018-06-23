const express =require('express');
const router = express.Router();
//The model called User is required here.
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const config = require('../config/database').default;
const passport =require('passport');

//Register
router.post('/register',(req, res, next) =>{
    // Create a object called newUser
    const newUser = new User({

        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    //Insert a user to the DB
    User.saveUser(newUser, (err,user)=> {
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(user){
            res.json({state:true,msg:"data inserted"});
        }

    });
});
//Login
router.post("/login",function (req,res){
    //Retrieve email and password from DB
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    //check whether the user is in the DB using the email
    User.findByEmail(email, (err,user)=> {
        if(err) throw err;

        if (!user){
            res.json({state:false,msg:"No user found"});
            return false;

        }
    // check whether the password is matched 
    User.passwordCheck(password,user.password,function (err,match) {
            if (err) throw  err;

            if (match){
                 //token                                          
                                                            //expiration time
                const token = jwt.sign(user, config.secret,{expiresIn:86400*3});
                //respond in json format
                res.json(
                    {
                        state:true,
                        token:"JWT " + token,
                        //user data of the logged user
                        user:{
                            id:user._id,
                            name:user.name,
                            username:user.username,
                            email:user.email

                        }
                    }
                    )
            }else {
                res.json({state:false,msg:"password does not match"});
            }

        });

    });


});
//Profile
//authenticate the user profile using jwt token
router.post('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
    res.json({user:req.user});
}
);


module.exports = router;