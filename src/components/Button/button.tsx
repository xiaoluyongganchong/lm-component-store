import classNames from 'classnames';
import React from 'react';

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  large = 'lg',
  small = 'sm'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    btnType?: Exclude<ButtonType, ButtonType.Link>;
  };
type AnchorButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
    btnType: ButtonType.Link;
  };
export type ButtonProps = NativeButtonProps | AnchorButtonProps;

const Button = ({
  btnType = ButtonType.Default,
  disabled = false,
  size,
  className,
  children,
  href,
  ...restProps
}: ButtonProps) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link) {
    return (
      <a
        className={classes}
        href={href}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;