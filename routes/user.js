const { Router } = require("express");
const User = require("../models/user.model");
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error('Login error:', error.message);
        res.render('signin', { error: error.message });
    }
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", { error: "Email already exists. Please use a different email." });
        }

        // Create a new user
        await User.create({
            fullName,
            email,
            password,
        });

        // Redirect to home page or any other desired location after successful signup
        res.redirect("/");
    } catch (error) {
        console.error('Signup error:', error.message);

        // Handle other errors (not related to duplicate key)
        res.render('signup', { error: "An error occurred during signup. Please try again." });
    }
});


router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect("/");
});

module.exports = router;
