import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
import type { CustomRule } from "./useStore";

export type SomeRequire<T,K extends keyof T> = Required<Pick<T,K>> & Omit<T,K>

export interface FormItemProps {
  name?: string
  label?: string
  children?: ReactNode
  className?: string
  valuePropName?: string
  trigger?: string
  getValueFormEvent?: (event: any) => any
  rules?: CustomRule | CustomRule[]
  isValid?: boolean
  validateTrigger?:string
}
 
const Item = ({
  name,
  label,
  children,
  className,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFormEvent = (e) => e.target.value,
  rules,
  isValid,
  validateTrigger = 'onBlur'
}: FormItemProps) => {
  const { dispatch, fields, validateField, initialValue } = useContext(FormContext)
  const rowClass = classNames('lm-row', className, {
    'lm-row-no-label': !label
  })
  const normalizedRules = useMemo(
    () => (rules ? (Array.isArray(rules) ? rules : [rules]) : undefined),
    [rules]
  )
  const fieldState = name ? fields[name] : undefined
  useEffect(() => {
    if (!name) {
      return
    }
    if (fieldState) {
      return
    }
    dispatch({
      type: 'addFile',
      name,
      value: {
        label,
        name,
        rules: normalizedRules,
        isValid: true,
        value: initialValue && name in initialValue
          ? initialValue[name]
          : valuePropName === 'checked'
            ? false
            : ''
      }
    })
  }, [dispatch, fieldState, initialValue, label, name, normalizedRules, valuePropName])

  const value = fieldState?.value ?? ''
  const errors = fieldState?.errors ?? []
  const isRequired = normalizedRules?.some((rule) => typeof rule !== 'function' && !!rule.required)
  const hasError = errors.length > 0
  const labelClass = classNames({
    'lm-form-item-required': isRequired
  })
  const itemClass = classNames('lm-form-item-control', {
    'lm-form-item-has-error':hasError
  })
  const onValueUpdate = (e: any) => {
    if (!name) {
      return
    }
    const nextValue = getValueFormEvent ? getValueFormEvent(e) : e?.target?.value
    dispatch({ type: 'updateValue', name, value: nextValue })
  }
  const onValueValidate = async() => {
    if (!name) {
      return
    }
    await validateField(name)
  }

  const controlProps: Record<string, any> = {}
  controlProps[valuePropName!] = value
  controlProps[trigger!] = onValueUpdate
  if (normalizedRules) {
    controlProps[validateTrigger] = onValueValidate
  }

  //获取children数组第一个元素
  const childList = React.Children.toArray(children)
  const child = childList[0]
  //判断children 类型
  // 1. 没有子组件
  if (childList.length === 0) {
    console.error('No child element')
  }
  //2. 子组件大于1Only one child
  if (childList.length > 1) {
    console.warn('Only one child')
  }
  //3. 是否是reactElement组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child element is not a valid React element')
  }

  // cloneElement 前先确保是合法 ReactElement
  const returnChildNode = React.isValidElement(child)
    ? React.cloneElement(child, {
        ...(child.props as Record<string, any>),
        ...(name ? controlProps : {})
      })
    : child
  return (
    <div className={rowClass}>
      {label && 
        <div className="lm-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      }
      <div className="lm-form-item">
        <div className={itemClass}>
          { returnChildNode }
        </div>
        {hasError &&
          <div className="lm-form-item-explain">
            <span>{ errors[0]?.message }</span>
        </div>}
      </div>
    </div>
  )
}

export default Item