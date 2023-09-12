const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    //check if token matches token string entered intitially
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: new Error("invalid request!") });
  }
};
