const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "jnsdfsdmkfmksldfmdsklvmskvmsfvjisofj90ir2984587634785345y34h3rh2ufufi90if3fFMHYFTDHRDOFIYTE46DTRRESFSZDJFGVHJKNMBHDNFJG");
      console.log("decode is ");
      console.log(jwt.decode);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

module.exports = verifyToken;