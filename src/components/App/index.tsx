// React and logo are imported but not used
import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import MainApp from "../MainApp";
import { useSelector } from "react-redux";

// 1. Inconsistent code formatting — it’s better to use Prettier or ESLint
// 2. Code comments are excessive and inconsistent
// 3. There is commented-out code. It’s better to remove unused code and rely on Git to restore it if needed
// 4. A custom store type is specified in useSelector; it’s better to keep types in separate files for reuse
// 5. useSelector is used at the App component level and the data is passed to MainApp, but MainApp is already connected to Redux and can access the data itself. This is a props drilling antipattern
function App() {
  const todos = useSelector(
    (state: { list: { todos: any[] } }) => state.list.todos
  );
  return (
    // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
      {/* MAIN APP: */}
      <MainApp todos={todos} />

      <footer className="App-footer">
        <a
          href="https://example.org"
          target="_blank"
          className={"App-footer-link"}
        >
          All right reserved
        </a>
      </footer>
    </div>
  );
}

export default App;
