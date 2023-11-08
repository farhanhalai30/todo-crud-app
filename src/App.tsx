import { ChangeEvent, useState } from "react";

interface todo {
  id: number;
  title: string;
  completed: boolean;
}

/** Initial Data */
const user: string = "Farhan Halai";
const initialTodoList: Array<todo> = [
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
  const [editTodoIndex, setEditTodoIndex] = useState(-1);
  const [editTodoValue, setEditTodoValue] = useState("");

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

    if (newTodoTitle != null)
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          title: newTodoTitle,
          completed: false,
        },
      ]);
  }

  function handleEditTodoClick({ id, title }: todo) {
    setEditTodoIndex(id);
    setEditTodoValue(title);
  }

  function deleteTodo(todoId: number) {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  }

  function handleTodoChange(e: ChangeEvent<HTMLInputElement>) {
    setEditTodoValue(e.target.value);
  }

  function updateTodo(todoId: number) {
    if (editTodoValue.trim() === "") {
      setEditTodoIndex(-1);
      return;
    }
    const newTodoList = todoList.map((todo) =>
      todo.id === todoId && !todo.completed
        ? { ...todo, title: editTodoValue }
        : todo,
    );
    setEditTodoIndex(-1);
    setTodoList(newTodoList);
  }

  return (
    <div>
      <h3>Welcome back, {user}</h3>

      <button onClick={addTodo}>New todo</button>
      <h4>Your todos:</h4>
      {todoList.length === 0 && <span>No todos found</span>}
      <ol>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {!todo.completed && editTodoIndex === todo.id ? (
              <input
                type="text"
                value={editTodoValue}
                onChange={handleTodoChange}
                onBlur={() => updateTodo(todo.id)}
              />
            ) : (
              <span
                onClick={() => completeTodo(todo.id)}
                style={todo.completed ? { textDecoration: "line-through" } : {}}
              >
                {todo.title}
              </span>
            )}
            <span
              onClick={() => handleEditTodoClick(todo)}
              style={{ marginLeft: "10px" }}
            >
              E
            </span>
            <span
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              D
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
