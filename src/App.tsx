import { ChangeEvent, useState } from "react";

interface todo {
  id: number;
  title: string;
  completed: boolean;
}

/** Initial Data */
const user: string = "Farhan Halai";

function App() {
  const localTodoList = localStorage.getItem("todoList");
  const initialTodoList: Array<todo> =
    localTodoList !== null ? JSON.parse(localTodoList) : [];

  const [todoList, setTodoList] = useState(initialTodoList);
  const [editTodoIndex, setEditTodoIndex] = useState(-1);
  const [editTodoValue, setEditTodoValue] = useState("");

  function updateCache(newTodoList: Array<todo>) {
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }

  function completeTodo(todoId: number) {
    const newTodoList = todoList.map((todo) =>
      todo.id === todoId && !todo.completed
        ? { ...todo, completed: true }
        : todo,
    );
    setTodoList(newTodoList);
    updateCache(newTodoList);
  }

  function addTodo() {
    const newTodoTitle = prompt("Add your todo item here : ");

    if (newTodoTitle != null) {
      const newTodoList = [
        ...todoList,
        {
          id: todoList.length + 1,
          title: newTodoTitle,
          completed: false,
        },
      ];
      setTodoList(newTodoList);
      updateCache(newTodoList);
    }
  }

  function handleEditTodoClick({ id, title }: todo) {
    setEditTodoIndex(id);
    setEditTodoValue(title);
  }

  function deleteTodo(todoId: number) {
    const newTodoList = todoList.filter((todo: todo) => todo.id !== todoId);
    setTodoList(todoList.filter((todo: todo) => todo.id !== todoId));
    updateCache(newTodoList);
  }

  function handleTodoChange(e: ChangeEvent<HTMLInputElement>) {
    setEditTodoValue(e.target.value);
  }

  function updateTodo(todoId: number) {
    if (editTodoValue.trim() === "") {
      setEditTodoIndex(-1);
      return;
    }
    const newTodoList = todoList.map((todo: todo) =>
      todo.id === todoId && !todo.completed
        ? { ...todo, title: editTodoValue }
        : todo,
    );
    setEditTodoIndex(-1);
    setTodoList(newTodoList);
    updateCache(newTodoList);
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
