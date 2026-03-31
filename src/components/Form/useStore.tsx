import { useReducer, useState } from "react"

export interface FieldDetail {
  name: string
  value: string
  rules: any[]
  isValid: boolean
  errors: any[]
}

export interface FieldState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean
}

export interface FiledsAction {
  type: 'addFile' | 'updateValue'
  name: string
  value: any
}

function filedReducer(state:FieldState,action:FiledsAction):FieldState {
  switch (action.type) {
    case 'addFile':
      return {
        ...state,
        [action.name]:{...action.value}
      }
    case 'updateValue':
      return {
        ...state,
        //只有value的值改变
        [action.name]: { ...state[action.name], value: action.value }
      }
    default:
      return state
  }
}

function useStore() {
  const [form, setForm] = useState<FormState>({ isValid: true })
  const [fields, dispatch] = useReducer(filedReducer, {})

  return {
    form,
    setForm,
    fields,
    dispatch
  }
}

export default useStore