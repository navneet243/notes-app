const { registerUser, loginUser, verifiedToken } = require("../Controllers/userController");
const router = require("express").Router();
const auth = require("../Middleware/auth");

//Register User
router.post("/register", registerUser);

//Login User
router.post("/login", loginUser);

//verify token
router.get("/verify", verifiedToken);


module.exports = router;
