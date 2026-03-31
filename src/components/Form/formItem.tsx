import React, { ReactNode, useContext, useEffect } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
export type SomeRequire<T,K extends keyof T> = Required<Pick<T,K>> & Omit<T,K>

export interface FormItemProps {
  name?: string
  label?: string
  children?: ReactNode
  className?: string
  valuePropName?: string
  trigger?: string
  getValueFormEvent?: (event: any) => any
}

const Item = ({
  name,
  label,
  children,
  className,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFormEvent = (e) => e.target.value 
}: FormItemProps) => {
  const { dispatch, fields,initialValue } = useContext(FormContext)
  const rowClass = classNames('lm-row', className, {
    'lm-row-no-label': !label
  })
  useEffect(() => {
    if (!name) {
      return
    }
    dispatch({
      type: 'addFile',
      name,
      value: { label, name, value: valuePropName === 'checked' ? false : '' }
    })
  }, [dispatch, label, name, valuePropName])

  const fieldState = name ? fields[name] : undefined
  const value = fieldState?.value ?? ''
  const onValueUpdate = (e: any) => {
    if (!name) {
      return
    }
    const nextValue = getValueFormEvent ? getValueFormEvent(e) : e?.target?.value
    dispatch({ type: 'updateValue', name, value: nextValue })
  }

  const controlProps: Record<string, any> = {}
  controlProps[valuePropName!] = value
  controlProps[trigger!] = onValueUpdate
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
          <label title={label}>
            {label}
          </label>
        </div>
      }
      <div className="lm-form-item">{ returnChildNode }</div>
    </div>
  )
}

export default Item