import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Can Not Connect To Data Base" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid data",
    });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User exists already!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });

  res
    .status(201)
    .json({ status: "success", message: "Created user!", data: newUser });
};

export default handler;
