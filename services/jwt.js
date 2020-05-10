const jwt = require("jsonwebtoken");

const generateToken = email => {
  const jwtToken = jwt.sign({ sub: "user", email }, process.env.jwtToken, {
    expiresIn: "3h"
  });
  return jwtToken;
};

const verifyToken = token => {
  try {
    const payLoad = jwt.verify(token, process.env.jwtToken);
    return payLoad;
  } catch (err) {
    console.log("Jwt not verified");
    return false;
  }
};
module.exports = { generateToken, verifyToken };
