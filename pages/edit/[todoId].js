import User from "@/models/User";
import AddTodoPage from "@/templates/AddTodoPage";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const EditTodo = ({ data }) => {
  const router = useRouter();
  const { todoId } = router.query;
  const todo = data.find((todo) => todo._id === todoId);
  return <AddTodoPage data={todo} />;
};

export default EditTodo;

export async function getServerSideProps(context) {
  const req = context.req;
  const session = await getSession({ req });

  const user = await User.findOne({ email: session.user.email });

  return {
    props: { data: JSON.parse(JSON.stringify(user.todos)) },
  };
}
