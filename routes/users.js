const router = require('express').Router(); 
const User = require('../models/User');
const bcrypt = require('bcryptjs');


//register

router.post('/register', async(req,res)=>{
    try{
        //generate new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save();
        res.status(200).json(user._id);

        //save user and send response

    }catch(err){
        console.log(err);
        res.status(500).json(err); 
    }
})

//login

router.post('/login', async(req,res)=>{
    try{
        //find user
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).json('Wrong username or password!');
        }else{
            //validate password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(400).json('Wrong username or password!');
            }else{
                //send user
                res.status(200).json({_id:user._id, username: user.username});
            }
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err); 
    }
})

module.exports = router;