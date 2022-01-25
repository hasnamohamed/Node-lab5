const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
   if (!token){
       return res.status(401).send('access rejected')
   }
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result
        next();
    } catch (error) {
        res.status(401).json({ message: "un-authorized" })
    }
}
