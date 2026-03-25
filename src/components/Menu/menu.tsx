import classNames from 'classnames';
import React, { createContext, ReactElement, useState } from 'react';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
  children?: React.ReactNode;
}

export interface TMenuContext {
  mode: MenuMode;
  index: string;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<TMenuContext>({
  index: '0',
  mode: 'horizontal'
});

const Menu = ({
  className,
  mode = 'horizontal',
  style,
  children,
  defaultIndex = '0',
  onSelect,
  defaultOpenSubMenus = []
}: MenuProps) => {
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames(
    'viking-menu',
    mode === 'vertical' ? 'menu-vertical' : 'menu-horizontal',
    className
  );

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: TMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as ReactElement<MenuItemProps>;
      return React.cloneElement(childElement, { index: index.toString() });
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;