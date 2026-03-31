import React, { ReactNode, createContext } from "react";
import useStore from "./useStore";

export interface FormProps {
  name?: string
  initialValue?: Record<string, any>
  children?:ReactNode
}

export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'>
  & Pick<FormProps,'initialValue'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

const Form = ({
  name,
  initialValue,
  children
}: FormProps) => {
  const { fields, form,dispatch } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValue
  }
  return (
    <>
      <form name={name} className="lm-form">
        <FormContext.Provider value={ passedContext }>
          {children}
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