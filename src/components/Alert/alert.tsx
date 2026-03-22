import classNames from 'classnames';
import React, { useState } from 'react';


export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  type?: AlertType;
}

export type AlertProps = BaseAlertProps;

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
  if (!visible) return null; //点击关闭后元素消失
  
  return (
    <div className={classes}>
      <div className="viking-alert-content">
        {title && <span className="viking-alert-title">{title}</span>}  {/*有标题就显示标题*/}
        {children && <span className="viking-alert-desc">{children}</span>} {/*有内容就显示内容*/}
      </div>
      {closable && (
        <button type="button" className="viking-alert-close" onClick={handleClose}> {/*是否关闭按钮*/}
          X
        </button>
      )}
    </div>
  );
};

export default Alert;