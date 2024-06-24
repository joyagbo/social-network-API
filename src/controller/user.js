const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = User({
            name,
            email,
            password
        })

        await newUser.save()

        res.status(201).json({ message: " User created successfully", newUser })

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required" })
        };
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "email is incorrect" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect" })
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        const { name } = user;
        res.status(200).json({ message: "User login successfully", token, user: { name } })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
}

module.exports = { register, login };