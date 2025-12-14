// React и logo импортируются, но не используются 
import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import MainApp from "../MainApp";
import { useSelector } from "react-redux";

// 1. Неоднородное форматирование кода лучше использовать prettier или eslint
// 2. Комментарии к коду избыточные и неоднородные
// 3. Имеется закомментированный код. Лучше код удалять и для восстановления использовать git.
// 4. В useSelector указан кастомный тип store, лучше хранить типы в отдельных файлах, для переиспользования.
// 5. Мы используем useSelector на уровне App component, и передаём в MainApp, но MainApp подключён к редаксу и может доставать данные сам. Это антипаттерн propsdrilling
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
