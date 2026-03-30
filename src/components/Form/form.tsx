import React, { ReactNode } from "react";

export interface FormProps {
  name?: string
  children?:ReactNode
}

const Form = ({
  name,
  children
}: FormProps) => {
  return (
    <form name={name} className="lm-form">
      {children}
    </form>
  )
}

export default Form