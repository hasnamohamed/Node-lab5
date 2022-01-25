
module.exports = (req, res, next) => {
    if(!req.user.isAdmin){
        res.status(403).json({ message: "Not An Admin" })
    }
    next();
}