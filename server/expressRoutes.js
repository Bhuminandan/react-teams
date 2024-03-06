const express = require("express");
const router = express.Router();
const User = require("./db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");



router.post('/register', async (request, response) => {
    try {
        const { email, password } = request.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.json({ status: 'error', error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        response.json({ status: 'ok', data: 'User created successfully' });
    } catch (error) {
        console.error(error);
        response.json({ status: 'error', error: 'Internal server error' });
    }
});


router.post('/login', async (request, response) => {

    const { email, password } = request.body;

    if (!email || !password) {
        return response.json({ status: 'error', error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return response.json({ status: 'error', error: 'Email or password is incorrect' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return response.json({ status: 'error', error: 'Email or password is incorrect' });
    }

    const token = jwt.sign(
        { 
            email: user.email,
            id: user._id,
         }, 
         "RANDOM-TOKEN",
         { expiresIn: "24h" }
    );

    response.cookie('token', token, { httpOnly: true });

    response.status(200).json({ status: 'ok', message: 'Login successful', data: token });

});

// free endpoint
router.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
  // authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

router.get("/isAuthenticated", auth, (req, res) => {
    res.json({ authenticated: true, user: req.user });
});


router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


module.exports = router