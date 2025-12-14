import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';


type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};
//1. Использование классовых компонентов, версия реакта в проекте позволяет использовать функциональные компоненты.
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
//2. Лучше не записывать ничего в window. Темболее, что кроме этого компонента это значение нигде не используется. 
//3. Удаление allTodosIsDone из window позволяет нам удалить файл global.d.ts
        window.allTodosIsDone = true;
//4. Вместо map можно использовать reduce.
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
{/*5. Вместо использования инлайновых стилей их можно вынести в отдельный класс*/}
{/*6. Для onChange лучше написать отдельную функцию */}
                        <Form.Check
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
// 7. Нет такого обработчика 'REMOVE_TODOS'
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
