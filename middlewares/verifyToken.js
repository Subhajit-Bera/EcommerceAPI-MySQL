const jwt =require("jsonwebtoken");

// decoded here is the actual user which was used to sign this token.
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded; //sending the user
    }
  });
};
 
module.exports=verifyToken;
