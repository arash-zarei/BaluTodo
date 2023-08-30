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
  const id = req.query.todoId;

  if (req.method === "DELETE") {
    const newTodos = user.todos.filter((todo) => todo._id.toString() !== id);
    user.todos = newTodos;
    user.save();

    res.status(200).json({ status: "success", message: "Deleted Todo" });
  }
};

export default handler;
