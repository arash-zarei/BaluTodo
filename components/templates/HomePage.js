import Tasks from "@/modules/Tasks";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    console.log(data);
    if (data.status === "success") setTodos(data.data.todos);
  };

  return (
    <div className="w-full px-2 mb-3">
      <h1 className="text-2xl text-center mt-4">Todos</h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <p className="w-full py-1 text-center rounded-t-md bg-orange-500">
            Todo
          </p>
          <Tasks
            fetchTodos={fetchTodos}
            data={todos.todo}
            color="bg-orange-500"
            next="inProgress"
          />
        </div>
        <div>
          <p className="w-full py-1 text-center rounded-t-md bg-blue-500">
            In Progress
          </p>
          <Tasks
            fetchTodos={fetchTodos}
            data={todos.inProgress}
            color="bg-blue-500"
            next="review"
            back="todo"
          />
        </div>
        <div>
          <p className="w-full py-1 text-center rounded-t-md bg-yellow-400">
            Review
          </p>
          <Tasks
            fetchTodos={fetchTodos}
            data={todos.review}
            color="bg-yellow-400"
            next="done"
            back="inProgress"
          />
        </div>
        <div>
          <p className="w-full py-1 text-center rounded-t-md bg-green-500">
            Done
          </p>
          <Tasks
            fetchTodos={fetchTodos}
            data={todos.done}
            color="bg-green-500"
            back="review"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
