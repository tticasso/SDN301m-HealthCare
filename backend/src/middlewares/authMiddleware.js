const jwt= require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if(token){
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).json("Tài khoản không được cấp phép")
            }
            req.user = user
            next();
        })
    }
    else{
        res.status(401).json("Tài khoản không được xác thực")
    }
}

module.exports = authMiddleware;