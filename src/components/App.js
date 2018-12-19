import React from "react";
import Footer from "./Footer";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoPanel from "./TodoPanel";

const App = () => (
  <div>
    <TodoForm />
    <TodoList />
    <Footer />
    <TodoPanel />
  </div>
);
export default App;
