const express = require("express");
const { register, login } = require("../controller/user");
const router = express.Router();

router.post("/Sign-up", register);
router.post("/sign-in", login);

module.exports = router;