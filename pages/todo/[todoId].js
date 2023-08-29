import User from "@/models/User";
import TodoPage from "@/templates/TodoPage";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const TodoDetails = ({ data }) => {
    const router = useRouter()
    const { todoId } = router.query
    const todo = data.find(todo => todo._id === todoId)

    return <TodoPage todo={todo} />;
};

export default TodoDetails;

export async function getServerSideProps(context) {
  const id = context.query;
  const req = context.req;
  const session = await getSession({ req });

  const user = await User.findOne({ email: session.user.email });
  

  return {
    props: {data: JSON.parse(JSON.stringify(user.todos))},
  };
}
