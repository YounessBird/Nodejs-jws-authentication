const router=require('express').Router()
const User=require('../models/dbmodel')
const {RegisterValidation,loginValidation}=require('../dataValidator')
const bcrypt=require('bcryptjs') // to encrypt passwords
const jwt=require('jsonwebtoken')

//register user
router.post('/register', async (req,res)=>{
    //Check for validation
   const {error}= RegisterValidation(req.body)
   if(error)
   return res.status(400).send(error.details[0].message)
// checking if user email already exist in database
   if( await User.findOne({email:req.body.email}))
   return res.status(400).json({msg:'error this email is already registered'})

   //Hash passwords
const salt= await bcrypt.genSalt(10)
const hashPassword=await bcrypt.hash(req.body.password,salt)
   // register user
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
 try {
     await user.save()
    res.json({user:user.id})
 } catch (err) {
        res.json({msg:err})
}    
})

router.post("/login",async (req,res)=>{
    // Validate Data
    const {error}=loginValidation(req.body)
    if(error) return res.status(400).send(error.detail[0].message)
    // check if email and passoword exist
    const user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email or password are inccorect') 
    // PASSWORD IS CORRECT
    const validPass= await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.send('invalid password')
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token)
    res.send(token)

})



module.exports=router