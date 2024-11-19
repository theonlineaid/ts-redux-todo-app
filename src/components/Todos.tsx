import { useState } from 'react';
import { singleTodoDel, todoAdded, todoToggled } from '../app/features/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks/useRedux';

const Todos = () => {
    const [todoText, setTodoText] = useState('');
    const todos = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();

    const handleAddTodo = () => {
        if (todoText.trim() === '') return;
        dispatch(
            todoAdded({
                id: Date.now() as any,
                text: todoText.trim(),
            })
        );
        setTodoText('');
    };

    const handleToggleTodo = (id: string) => {
        dispatch(todoToggled(id));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(singleTodoDel(id))
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1>Todo List</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="Enter a new todo"
                    style={{ padding: '8px', width: 'calc(100% - 20px)' }}
                />
                <button onClick={handleAddTodo} style={{ marginLeft: '10px', padding: '8px' }}>
                    Add
                </button>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            padding: '10px',
                            marginBottom: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: todo.completed ? 'green' : 'gray',
                            
                        }}
                    >
                        <span
                            onClick={() => handleToggleTodo(todo.id)}
                            style={{ cursor: 'pointer', flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', }}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
