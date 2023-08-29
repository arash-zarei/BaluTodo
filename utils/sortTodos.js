const sortTodos = (todos) => {
  const sortedTodos = {};
  todos.map((todo) => {
    if (!sortedTodos[todo.status]) sortedTodos[todo.status] = [];

    sortedTodos[todo.status].push(todo);
  });

  return sortedTodos;
};

export { sortTodos };
