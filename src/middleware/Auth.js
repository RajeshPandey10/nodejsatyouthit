import User from "../models/user.model.js";

export const isAuth = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        return next();
        

      } catch (error) {
        console.error("Not authorized, token failed", error.message);
         return res.status(401).json({
          message: "Not authorized, token failed",
          success: false,
        });
    }
      
    }
     return res.status(401).json({
          message: "Not authorized, token failed",
          success: false,
        });
  }


