import classNames from 'classnames';
import React, { createContext, ReactElement, ReactNode, useState } from 'react';

import { TabItemProps } from './tabsItem'
import './_style.scss';

type TabsType = 'line' | 'card';
type SelectCallback = (selectedIndex: string) => void;

export interface TabsProps {
  defaultIndex?: string;
  className?: string;
  type?: TabsType;
  onSelect?: SelectCallback;
  children?: ReactNode;
  style?: React.CSSProperties;
}

interface ITabsContext {
  index: string;
  onSelect?: SelectCallback;
  type?: TabsType;
}

export const TabsContext = createContext<ITabsContext>({
  index: '0',
  type:"line"
})

const Tabs = ({
  defaultIndex = '0',
  className,
  type = 'line',
  onSelect,
  children,
  style
}: TabsProps) => {
  const [currentActive, setActive] = useState(defaultIndex)
  
 const classes = classNames(
    'lm-tabs',
    className,
    type === 'line' ? 'lm-line-tabs' : 'lm-card-tabs'
  )
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: ITabsContext = {
  index: currentActive || '0',
  onSelect: handleClick,
  type
};
  const renderChildren = () =>
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    const childElement = child as ReactElement<TabItemProps>;
    return React.cloneElement(childElement, { index: index.toString() });
  });
  const renderContent = () => {
  const items = React.Children.toArray(children) as ReactElement<TabItemProps>[];
  const activeItem = items.find((_, idx) => idx.toString() === currentActive);
  return <div className="lm-tabs-content">{activeItem?.props.children}</div>;
};
  return (
  <div className={classes}>
    <ul className="lm-tabs-nav">
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </ul>
    {renderContent()}
  </div>
);
}

export default Tabs