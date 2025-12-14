import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
//1. Вместо React.useEffect мы можем импортировать useEffect из react
//2. Мы можем использовать toolkit query чтобы фетчить пользователей и хранить их в отдельном slice.
    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
//3. Вместо React.useState мы можем импортировать useState из react
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//4. Лучше не сокращать имена переменных
//5. Лишний консоль лог.     
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
//6. Нет такого event как 'CHANGE_TODO'
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
{/*7. Нужно передавать ещё key. */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
 