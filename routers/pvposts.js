const router=require('express').Router()
const promise=require('promise')
const Tokenval=require("./tokenValidator")

router.get('/posts',Tokenval,(req,res)=>{
    res.json({title:"Knight",description:"Templar"})
})

module.exports=router