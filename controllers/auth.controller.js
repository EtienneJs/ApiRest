import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { generateRefreshToken } from "../middleware/requireTokenAuth.js";
import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "No existe este usuario" });
    const respond = await user.comparePassword(password);
    if (!respond) return res.status(403).json({ error: "Datos incorrectos" });
    //generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    // res.cookie("token", token, {
    //   httpOnly: true,
    // });
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // res.json({ ok: "Register" });
    const users = new User({ email, password });
    await users.save();
    //json webtoken
    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  // const {uid} = req.uid
  try {
    const user = await User.findById(req.uid);
    res.json({ email: user.email, uid: user._id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    // console.log("id", uid);
    const { token, expiresIn } = generateToken(uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
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
export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
