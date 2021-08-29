const jwt= require("jsonwebtoken")

function auth(req,res,next){
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('access denied')

    try {
        const verified=jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(verified)
        req.user=verified
        next()
    } catch (error) {
        res.status(401).send('Invalid Token')
    }
}

module.exports=auth


