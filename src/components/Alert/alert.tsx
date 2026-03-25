import classNames from 'classnames';
import React, { useState } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/tansition';


/**
 * Alert 组件支持的状态类型
 */
export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  /** 自定义类名 */
  className?: string;
  /** 可选标题 */
  title?: string;
  /** 内容区域 */
  children?: React.ReactNode;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击关闭按钮后的回调 */
  onClose?: () => void;
  /** 提示类型，决定样式主题 */
  type?: AlertType;
}

export type AlertProps = BaseAlertProps;

/**
 * 轻量提示组件，支持标题、内容、主题类型与关闭动画
 */
const Alert = ({
  className,
  title,
  children,
  closable = true,
  onClose,
  type = AlertType.Default
}: AlertProps) => {
  const classes = classNames('viking-alert', className, {
    [`viking-alert-${type}`]: type
  });
  //组件自己管理是否显示
  const [visible, setVisible] = useState(true); //一开始是显示的
  const handleClose = () => {
    onClose?.();
    setVisible(false);
  };

  return (
    <Transition in={visible} timeout={200} animation="zoom-in-top" unmountOnExit wrapper>
      <div className={classes}>
        <div className="viking-alert-content">
          {title && <span className="viking-alert-title">{title}</span>}  {/*有标题就显示标题*/}
          {children && <span className="viking-alert-desc">{children}</span>} {/*有内容就显示内容*/}
        </div>
        {closable && (
          <button
            type="button"
            className="viking-alert-close"
            onClick={handleClose}
            aria-label="关闭提示"
          >
            <Icon icon="times" />
          </button>
        )}
      </div>
    </Transition>
  );
};

export default Alert;