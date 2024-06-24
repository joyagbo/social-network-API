const jwt = require("jsonwebtoken");
const User = require("../model/userModel");


const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized Access" })
    };


    const token = req.headers.authorization.split(' ')[1];



    //check if token exist
    if (!token) {
        return res.status(401).json({ message: "You don't have access to this page" })
    }

    try {
        //verify token
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)


        const user = await User.findById(decodedtoken.userId)

        if (!user) {
            return res.status(400).json({ message: "User does not found" })
        }
        req.user = user;

        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
};
module.exports = auth;