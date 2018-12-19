import gql from "graphql-tag";

export const defaults = {
  todos: [
    { id: "hello", text: "Init", completed: false, __typename: "TodoItem" }
  ],
  visibilityFilter: "SHOW_ALL",
  localState: [{ label: "init", value: 1, __typename: "LocalStateObjItem" }]
};

let nextTodoId = 0;

export const resolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
          localState @client {
            label
            value
          }
        }
      `;
      const previous = cache.readQuery({ query });
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: "TodoItem"
      };
      const data = {
        todos: previous.todos.concat([newTodo]),
        localState: previous.localState.concat([
          { label: "another", value: 3, __typename: "LocalStateObjItem" }
        ])
      };
      cache.writeData({ data });
      return newTodo;
    },
    toggleTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`;
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    }
  }
};
