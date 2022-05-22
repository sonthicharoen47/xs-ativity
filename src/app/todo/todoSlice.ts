import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ITodo {
  id: number
  name: string
}

export interface ITodoHistory {
  activity: 'create' | 'update' | 'delete'
  name: string
}

export interface ITodoInitState {
  count: number
  todolist: ITodo[]
  history: ITodoHistory[]
}

const initialState: ITodoInitState = {
  count: 0,
  todolist: [],
  history: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (action.payload) {
        console.log(`payload`)
        console.log(action.payload)

        let data = { id: state.count, name: action.payload }
        state.todolist.push(data)

        state.count += 1

        let dataHistory: ITodoHistory = {
          activity: 'create',
          name: action.payload,
        }
        state.history.push(dataHistory)
      }
    },
    updateTodo: (state, action) => {
      if (action.payload && action.payload.id >= 0 && action.payload.name) {
        console.log(`update action`)
        console.log(action.payload)

        let data = state.todolist.find(
          (item) => item.id === Number(action.payload.id)
        )

        if (data) {
          let dataHistory: ITodoHistory = {
            activity: 'update',
            name: `${data.name} to ${action.payload.name}`,
          }
          state.history.push(dataHistory)
        }

        state.todolist.map((item) => {
          if (item.id === Number(action.payload.id)) {
            item.name = action.payload.name
          }
        })
      }
    },
    deleteTodo: (state, action) => {
      if (action.payload >= 0) {
        let data = state.todolist.find(
          (item) => item.id === Number(action.payload)
        )

        if (data) {
          let dataHistory: ITodoHistory = {
            activity: 'delete',
            name: data.name,
          }
          state.history.push(dataHistory)
        }

        state.todolist = state.todolist.filter(
          (item) => item.id !== action.payload
        )
      }
    },
  },
})

export const todoList = (state: RootState) => state.todo.todolist

export const activityList = (state: RootState) => state.todo.history

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer
