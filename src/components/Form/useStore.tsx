import { useReducer, useState } from "react"
import Schema, { RuleItem, ValidateError } from "async-validator"

export type CustomRuleFunc = (helpers: { getFieldValue: (key: string) => any }) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc

export interface FieldDetail {
  name: string
  value: string
  rules: CustomRule[]
  isValid: boolean
  errors: ValidateError[]
}

export interface FieldState {
  [key: string]: FieldDetail
}

export interface ValidateErrorType extends Error {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

export interface FormState {
  isValid: boolean
  isSubmitting: boolean
  errors:Record<string,ValidateError[]>
}

export interface FiledsAction {
  type: 'addFile' | 'updateValue' | 'updateValidateResult'
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
    case 'updateValidateResult':
      const {isValid,errors } = action.value
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors }
        
      }
    default:
      return state
  }
}

function useStore(initialValue?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({ isValid: true,isSubmitting:false,errors:{} })
  const [fields, dispatch] = useReducer(filedReducer, {})

  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
  }

  const setFieldsValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: 'updateValue', name, value })
    }
  }

  const setValues = (values: Record<string, any>) => {
    Object.keys(values).forEach((name) => {
      if (fields[name]) {
        dispatch({ type: 'updateValue', name, value: values[name] })
      }
    })
  }

  const resetFields = () => {
    if (initialValue) {
      Object.entries(initialValue).forEach(([name, value]) => {
        if (fields[name]) {
          dispatch({type:'updateValue',value,name})
        }
      })
    }
  }
  const transformRules = (rules:CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule({ getFieldValue })
        return calledRule
      } else {
        return rule
      }
    })
  }

  const buildValueMap = () => {
    const valueMap: Record<string, any> = {}
    Object.keys(fields).forEach((key) => {
      valueMap[key] = fields[key].value
    })
    return valueMap
  }

  const buildDescriptor = () => {
    const descriptor: Record<string, RuleItem[]> = {}
    Object.keys(fields).forEach((key) => {
      descriptor[key] = transformRules(fields[key].rules)
    })
    return descriptor
  }

  const validateField = async (name: string) => {
    const currentField = fields[name]
    if (!currentField) {
      return
    }
    const { value, rules } = currentField
    const afterRules = transformRules(rules)
    const discriptor = {
      [name]:afterRules
    }
    const valueMap = {
      [name]:value
    }
    const validator = new Schema(discriptor)
    let isValid = true
    let errors: ValidateError[] = []
    try {
      await validator.validate(valueMap)
    } catch(e) {
      isValid = false
      const err = e as any
      console.log('e', err.errors)
      console.log('fields', err.fields)
      errors = err.errors || []
    } finally {
      console.log(isValid)
      dispatch({type:'updateValidateResult',name,value:{isValid,errors}})
    }
  }

  const validateForm = async () => {
    const valueMap = buildValueMap()
    const discriptor = buildDescriptor()
    const validator = new Schema(discriptor)
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}

  setForm(prev => ({ ...prev, isSubmitting: true }))
    try {
      await validator.validate(valueMap)
    }
    catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields
      Object.keys(fields).forEach((name) => {
        const value = fields[name]
        //errors 中有对应key
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } })
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } })
        }
      })
    }
    finally {
      setForm({ ...form, isSubmitting: false, isValid, errors })
      return {
        isValid,
        errors,
        values:valueMap
      }
    }
  }
  return {
    form,
    setForm,
    fields,
    dispatch,
    validateField,
    getFieldValue,
    validateForm,
    setFieldsValue,
    setValues,
    resetFields
  }
}

export default useStore