const express = require("express");
require("dotenv").config()
const app = express();
const connectDB = require("./src/config/dbConnect");
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 2000;
connectDB()

// to handle url encoded
app.use(express.urlencoded({ extended: false }));

//build middleware
app.use(express.json());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use("/api/v1", require("./src/route/userRoute"));
app.use("/api/v1", require("./src/route/postRoute"))


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})