import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

type FormElement = React.FormEvent<HTMLFormElement>;

interface iTodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<iTodo[]>([]);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const changehandler = (e) => {
    setValue(e.target.value);
  };
  const addTodo = (text: string): void => {
    const newTodos: iTodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  const completeTodo = (index: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  const removeTodo = (index: number):void => {
    const newTodos: iTodo[] = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }
  return (
    <Fragment>
      <h1> Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" required value={value} onChange={changehandler} />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: iTodo, index: number) => (
          <Fragment key={index}>
            <div style={{textDecoration: todo.complete ? 'line-through' : ''}} key={index}>
              {todo.text}
            </div>
            <button type="button" onClick={():void => completeTodo(index)}>
              {todo.complete ? "Incomplete" : "Complete"}
            </button>
            <button type="button" onClick={():void => removeTodo(index)}>
              Remove
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
