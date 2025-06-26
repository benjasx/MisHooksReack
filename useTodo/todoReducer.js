export const todoReducer = (initialState = [], action = {}) => {

  switch (action.type) {
    case "Add-Todo":
      //Agrega un nuevo todo a la lista
      return [...initialState, action.payload];
    case "Remove-Todo":
      //Elimina un todo de la lista por su id
      return initialState.filter((todo) => todo.id !== action.payload);
    case "Toggle-Todo":
      return initialState.map((todo) => {
        if (todo.id !== action.payload) return todo;
        return {
          ...todo,
          done: !todo.done, // Cambia el estado de 'done' del todo
        };
      })
    default:
      return initialState;
  }
};

