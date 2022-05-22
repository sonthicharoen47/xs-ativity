import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteTodo, ITodo, updateTodo } from '../app/todo/todoSlice'

const TodoElement = ({ id, name }: ITodo) => {
  const [editStatus, setEditStatus] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(name)

  const dispatch = useAppDispatch()

  const onDestoryTodo = (id: number) => {
    dispatch(deleteTodo(id))
  }
  const onSubmitEdit = (id: number, value: string) => {
    dispatch(updateTodo({ id, name: value }))
    setEditStatus(!editStatus)
  }
  return (
    <div>
      {editStatus ? (
        <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
      ) : (
        <>
          <span>{name}</span>
          <button onClick={() => setEditStatus(!editStatus)}>Edit</button>
        </>
      )}

      {editStatus ? (
        <button onClick={() => onSubmitEdit(id, editTodo)}>Save</button>
      ) : (
        <button onClick={() => onDestoryTodo(id)}>delete</button>
      )}
    </div>
  )
}

export default TodoElement
