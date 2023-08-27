import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }


  const user = await User.findOne({ email: session.user.email });
  console.log(user);
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }

  if (req.method === "POST") {
    const { title, status, descriptions } = req.body;

    if (!title || !status || descriptions) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invaild data!" });
    }

    user.todos.push({ title, status, descriptions });
    user.save();

    res.status(201).json({ status: "success", message: "Todo created!" });
  }
};

export default handler;
