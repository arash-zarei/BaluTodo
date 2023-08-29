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

  if (req.method === "PATCH") {
    const user = await User.findOne({ email: session.user.email });
    const valueTodo = req.body;
    const todo = user.todos.find(
      (todo) => todo._id.toString() === valueTodo._id
    );
    todo.title = valueTodo.title;
    todo.status = valueTodo.status;
    todo.descriptions = valueTodo.descriptions;
    user.save();

    res.status(200).json({ status: "success", message: "Upadated Todo" });
  }
};

export default handler;
