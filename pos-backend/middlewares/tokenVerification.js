const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      const error = createHttpError(401, 'Please provide token!');
      return next(error);
    }

    //if token is valid, payload stored in decodeToken,
    //what we store as a payload in jwt, that is our userid
    //here we are using _id as payload, so we can find user in our DB
    // in this case, we store user id as _id
    // so we can use it to find user in our DB
    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      const error = createHttpError(401, 'User not exist!');
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    const err = createHttpError(401, 'Invalid Token!');
    next(err);
  }
};

module.exports = { isVerifiedUser };

//information about payload in JWT:

// When we create a JWT, it's made of 3 parts:

// php-template
// Copy code
// <Header>.<Payload>.<Signature>
// Header → Tells what algorithm is used.

// Payload → Stores data we want to send securely (like user ID).

//     Signature → Makes sure token wasn't tampered with.
//     jwt.sign({ _id: user._id }, secretKey);
// This creates a token with a payload like:

// json
// Copy code
// {
//   "_id": "64a3f2ab3c1234567890abcd"  // ← this is what you’re storing as payload
// }
