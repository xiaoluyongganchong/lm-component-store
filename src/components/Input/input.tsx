import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, { ReactElement } from 'react';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input = (
  { disabled, size, icon, prepend, append, className, ...restProps }
    : InputProps) => {
  const classes = classNames('lm-input-wrapper', className, {
    [`input-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  });


  const controlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in restProps && typeof restProps.value !== 'undefined') {
    delete restProps.defaultValue
    restProps.value = controlledValue(restProps.value)
  }

  return (
    <div className={classes}>
      {prepend && <span className="input-group-prepend">{prepend}</span>}
      <input className="lm-input-inner" disabled={disabled} {...restProps} />
      {append && <span className="input-group-append">{append}</span>}
      {icon && <Icon icon={icon} className="icon-wrapper" aria-hidden />}
    </div>
  );
};

export default Input;