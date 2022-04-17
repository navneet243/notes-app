const Users = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user)
        return res.status(400).json({ msg: "The email is already registered" });

      const passHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username: username,
        email: email,
        password: passHash,
      });
      await newUser.save();
      // res.json(newUser)
      res.json({ msg: "signup successfull , login now" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      //create token if isMatch
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token });
      // res.status(200).json({msg: "Login successful"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  verifiedToken: (req,res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = userController;
