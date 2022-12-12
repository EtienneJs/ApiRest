import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("No Bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    const TokenVerificationError = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "Jwt formato no valido",
    };
    console.log(error);
    return res
      .status(401)
      .json({ error: TokenVerificationError[error.message] });
  }
};
export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
export const requireTokenRespaldo = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("No Bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    const TokenVerificationError = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "Jwt formato no valido",
    };
    console.log(error);
    return res
      .status(401)
      .json({ error: TokenVerificationError[error.message] });
  }
};
