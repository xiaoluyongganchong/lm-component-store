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
  { disabled, size, icon, prepend, append, className, value, ...restProps }
    : InputProps) => {
  const classes = classNames('lm-input-wrapper', className, {
    [`input-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  });

  const normalizedValue = value == null ? '' : value;
  const inputProps =
    value !== undefined
      ? { ...restProps, value: normalizedValue }
      : restProps;

  return (
    <div className={classes}>
      {prepend && <span className="input-group-prepend">{prepend}</span>}
      <input className="lm-input-inner" disabled={disabled} {...inputProps} />
      {append && <span className="input-group-append">{append}</span>}
      {icon && <Icon icon={icon} className="icon-wrapper" aria-hidden />}
    </div>
  );
};

export default Input;