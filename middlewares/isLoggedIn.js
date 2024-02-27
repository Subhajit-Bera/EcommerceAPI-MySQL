const getTokenFromHeader=require("./getTokenFromHeader");
const verifyToken=require("./verifyToken");

exports.isLoggedIn = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
  
    //verify the token
    const decodedUser = verifyToken(token);
  
    //If verifyToken return false
    if (!decodedUser) {
      throw new Error("Invalid/Expired token, please login again");
    } else {
      //If verifyToken return the user
      //save the user into req obj
      //We are adding userAuthId (custom) field to the req object and assign the decodedUser id to **
      req.userAuthId = decodedUser?.id;
    //   console.log(req.userAuthId);
      next();
    }
  };
