import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

// creando un estado inicial para los todos
const initialState = [];

// Función para inicializar el estado de los todos desde localStorage
const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

// manejador de eventos para agregar un nuevo todo

export const useTodos = () => {
  const [todos, dispatchTodo] = useReducer( todoReducer, initialState, init);
  //console.log("Todos:", todos);

  //se ejecuta cada vez que el estado de los todos cambia
  // y guarda el estado en localStorage para persistencia
  useEffect(() => {
    //console.log("Estado de los todos ha cambiado:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    //console.log("Todo agregado:", todo);
    const action = {
      type: "Add-Todo",
      payload: todo,
    };

    dispatchTodo(action);
  };

  const handleDeleteTodo = (todoId) => {
    dispatchTodo({
      type: "Remove-Todo",
      payload: todoId,
    });
  };

  const handleToggleTodo = (todoId) => {
    dispatchTodo({
      type: "Toggle-Todo",
      payload: todoId,
    });
  };

  const pendingTodosCount = todos.filter(todo => !todo.done).length;
  const totalTodosCount = todos.length;

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    pendingTodosCount,
    totalTodosCount
  };


};
