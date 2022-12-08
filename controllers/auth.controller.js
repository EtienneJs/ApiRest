import { validationResult } from "express-validator";
export const login = (req, res) => {
  const { gmail, password } = req.body;
  res.json({ ok: "Login" });
};

export const register = (req, res) => {
  const { gmail, password } = req.body;
  res.json({ ok: "Register" });
};
