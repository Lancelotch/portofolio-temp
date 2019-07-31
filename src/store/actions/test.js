const Redux = require("redux");
const createStore = Redux.createStore;

const initialState = {
  name: "mamhank"
};

// Reducer
const rootReducer = (store = initialState, action) => {
  if (action.type === "CHANGE_NAME") {
    return {
      ...store,
      name: action.newName
    };
  }
  return store;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Dispatching Action
store.dispatch({ type: "CHANGE_NAME", newName: "Mhank" });
console.log(store.getState());
