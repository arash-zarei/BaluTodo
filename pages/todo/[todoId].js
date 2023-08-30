import User from "@/models/User";
import TodoPage from "@/templates/TodoPage";
import { getSession } from "next-auth/react";

const TodoDetails = ({ data }) => {
  return <TodoPage todo={data} />;
};

export default TodoDetails;

export async function getServerSideProps(context) {
  const req = context.req;
  const id = context.query.todoId;
  const session = await getSession({ req });

  const user = await User.findOne({ email: session.user.email });
  const todo = user.todos.find((todo) => todo._id.toString() === id);

  return {
    props: { data: JSON.parse(JSON.stringify(todo)) },
  };
}
