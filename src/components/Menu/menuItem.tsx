import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from './menu';


export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem = ({
  index,
  disabled,
  className,
  style,
  children
}: MenuItemProps) => {
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;