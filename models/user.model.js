const { Schema, model } = require('mongoose');
const { randomBytes, createHmac } = require('crypto'); // Correct import
const { createTokenForUser } = require('../services/auth');


const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: "/image/user_default.png",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, { timestamps: true });

// Password encryption function
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

// Match password and generate token
userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('User not found!');
        }

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedHash = createHmac('sha256', salt)
            .update(password)
            .digest('hex');

        if (hashedPassword !== userProvidedHash) {
            throw new Error('Incorrect password. Please try again.');
        }

        const token = createTokenForUser(user);
        return token;
    } catch (error) {
        console.error('Authentication error:', error.message);
        throw new Error('Authentication failed. Please try again.');
    }
};

const User = model("user", userSchema);

module.exports = User;