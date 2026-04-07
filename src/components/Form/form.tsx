import React, { ReactNode, createContext } from "react";
import { ValidateError } from "async-validator"
import useStore, { FormState } from "./useStore";

export type RenderProps = (form: FormState) => ReactNode

export interface FormProps {
  name?: string
  initialValue?: Record<string, any>
  children?: ReactNode | RenderProps
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (values:Record<string, any>,errors:Record<string, ValidateError[]>) => void
}

export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps,'initialValue'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

const Form = ({
  name,
  initialValue,
  children,
  onFinish,
  onFinishFailed
}: FormProps) => {
  const { fields, form, dispatch, validateField, validateForm } = useStore(initialValue)
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValue,
    validateField
  }
  const submitForm = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, values } = await validateForm()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values,errors)
    }
  }
  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    childrenNode = children
  }
  return (
    <>
      <form name={name} className="lm-form" onSubmit={submitForm}>
        <FormContext.Provider value={ passedContext }>
          {childrenNode}
        </FormContext.Provider>

      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

export default Form