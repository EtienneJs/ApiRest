import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultE } from "../middleware/validationResult.js";
const router = express.Router();

router.post(
  "/login",
  [body("email", "Formato Email Erroneo").trim().isEmail().normalizeEmail()],
  validationResultE,
  login
);
router.post(
  "/register",
  [
    body("email", "Formato Email Erroneo").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 6 de caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password Erroneo").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }),
  ],
  validationResultE,
  register
);

export default router;
