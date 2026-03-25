import React, {
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import type { MenuItemProps } from './menuItem';
import MenuItem from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/tansition';

export interface SubMenuProps {
  /** 由 Menu 注入，一般不必手写 */
  index?: string;
  /** 下拉菜单选项的文字 */
  title: string;
  /** 下拉菜单选项的扩展类名 */
  className?: string;
  children?: ReactNode;
}

function isMenuItemElement(
  child: ReactElement<MenuItemProps>
): child is ReactElement<MenuItemProps> {
  return child.type === MenuItem;
}

export const SubMenu: FC<SubMenuProps> = ({
  index = '0',
  title,
  children,
  className
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus ?? [];
  const isOpenedByDefault =
    context.mode === 'vertical' && openedSubMenus.includes(index);
  const [isOpen, setIsOpen] = useState(isOpenedByDefault);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRenderRef = useRef(true);

  // 当菜单项被点击后（context.index 变化），把当前子菜单收起来
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    setIsOpen(false);
  }, [context.index]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': isOpen
  });

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((open) => !open);
  };

  /** 横向：悬停防抖，避免划入划出时闪动 */
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    e.preventDefault();
    timerRef.current = setTimeout(() => {
      setIsOpen(toggle);
      timerRef.current = null;
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleTitleClick
        }
      : {};

  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          }
        }
      : {};

  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      if (!React.isValidElement(child)) {
        console.error('SubMenu children must be valid React elements');
        return null;
      }
      const el = child as ReactElement<MenuItemProps>;
      if (isMenuItemElement(el)) {
        return React.cloneElement(el, {
          index: `${index}-${i}`
        });
      }
      console.error('SubMenu only accepts MenuItem as children');
      return null;
    });
  };

  return (
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents} role="presentation">
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      <Transition
        in={isOpen}
        timeout={200}
        animation="zoom-in-top"
        wrapper
        unmountOnExit
      >
        <ul className={classNames('viking-submenu', { 'menu-opened': isOpen })}>
          {renderChildren()}
        </ul>
      </Transition>
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
