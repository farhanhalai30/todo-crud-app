import { useState } from "react";

const user = "Farhan Halai";
const initialTodoList = [
  {
    id: 1,
    title: "Apply for job",
    completed: false,
  },
  {
    id: 2,
    title: "Read one page of book",
    completed: false,
  },
  {
    id: 3,
    title: "Walk for one hour",
    completed: false,
  },
  {
    id: 4,
    title: "Read figma design concepts",
    completed: false,
  },
];

function App() {
  const [todoList, setTodoList] = useState(initialTodoList);

  function completeTodo(todoId: number) {
    const newTodoList = todoList.map((todo) =>
      todo.id === todoId && !todo.completed
        ? { ...todo, completed: true }
        : todo,
    );
    setTodoList(newTodoList);
  }

  function addTodo() {
    const newTodoTitle = prompt("Add your todo item here : ");
    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        title: newTodoTitle,
        completed: false,
      },
    ]);
  }

  function deleteTodo(todoId) {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  }

  return (
    <div>
      <h3>Welcome back, {user}</h3>

      <button onClick={addTodo}>New todo</button>
      <h4>Your todos:</h4>
      {todoList.length === 0 && <span>No todos found</span>}
      <ol>
        {todoList.map((todo) => (
          <li key={todo.id} onClick={() => completeTodo(todo.id)}>
            <span
              style={todo.completed ? { textDecoration: "line-through" } : {}}
            >
              {todo.title}
            </span>
            <span
              onClick={(event) => {
                event.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              X
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
