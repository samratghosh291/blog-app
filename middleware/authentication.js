const { validateToken } = require('../services/auth');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            console.error('Token validation error:', error.message);
            req.user = null; // Set req.user to null if there is an error
            next(error); // Pass the error to the next middleware or error handler
        }
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
