import moongose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new moongose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    index: { unique: true },
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  const users = this;
  if (!users.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    users.password = await bcryptjs.hash(users.password, salt);
    next();
  } catch (error) {
    throw new Error("Fallo el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function (clientPassword) {
  return await bcryptjs.compare(clientPassword, this.password);
};

export const User = moongose.model("Users", userSchema);
