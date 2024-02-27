const jwt =require("jsonwebtoken");
require('dotenv').config();
const generateToken = (id,email) => {
    return jwt.sign({ id,email }, process.env.JWT_KEY, { expiresIn: "1d" });
};

// jwt.sign({ id: user[0].id, email: user[0].email }, 'your_secret_key', { expiresIn: '1h' });
  
module.exports= generateToken;