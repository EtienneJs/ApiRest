import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("connect DB Ok");
} catch (error) {
  console.log(error);
}
