import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames'

import { TabsContext } from './tabs'

export interface TabItemProps {
  index?: string;
  label: ReactNode;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

const TabItem = ({
  index,
  label,
  disabled,
  className,
  style
}: TabItemProps) => {
  const context = useContext(TabsContext)
  const classes = classNames('lm-tab-item', className, {
      'is-disabled': disabled,
      'is-active': context.index === index
  })
    const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  }
   return (
    <li className={classes} style={style} onClick={handleClick}>
      {label}
    </li>
  )
}

TabItem.displayName = 'TabItem';

export default TabItem;