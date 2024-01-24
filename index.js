const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog.model");

const app = express();
const PORT = process.env.PORT || 8000; // Update the port

mongoose.connect(process.env.MONGODB_URI,)
    .then(() => {
        console.log("MongoDB connected!!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token")); // Use the middleware here
app.use(express.static(path.resolve("./public")));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});
