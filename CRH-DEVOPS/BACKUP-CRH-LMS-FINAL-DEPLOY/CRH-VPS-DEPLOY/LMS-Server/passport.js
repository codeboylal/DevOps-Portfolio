const passport = require('passport');
const { config } = require('dotenv');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Load environment variables
config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    // Handle user authentication here
    return done(null, profile);
}));

module.exports = passport; // Make sure you export the passport instance
