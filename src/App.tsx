import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { activityList, addTodo, todoList } from '../src/app/todo/todoSlice'
import TodoElement from './components/TodoElement'

function App() {
  const [todo, setTodo] = useState<string>('')

  const dispatch = useAppDispatch()
  const historylist = useAppSelector(activityList)
  const list = useAppSelector(todoList)

  const onAddTodo = (value: string) => {
    dispatch(addTodo(value))
    setTodo('')
  }

  return (
    <div className='App'>
      <div>
        <label>Todo Form</label>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        {todo.length > 0 && <span>Typing...</span>}
        <button disabled={todo.length <= 0} onClick={() => onAddTodo(todo)}>
          Add
        </button>
        <div>TodoList</div>
        {list &&
          list.length > 0 &&
          list.map((item) => (
            <TodoElement id={item.id} name={item.name} key={item.id} />
          ))}
        <div>Activity</div>
        {historylist.length > 0 &&
          historylist.map((item, index) => (
            <div
              key={`activity-${index}`}
            >{`${item.activity} ${item.name}`}</div>
          ))}
      </div>
    </div>
  )
}

export default App
