import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

library.add(fas);

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  /** 图标名，例如 coffee、user */
  icon: IconProp;
  /** 主题色 */
  theme?: ThemeProps;
  /** 额外自定义 class */
  className?: string;
}

const Icon = ({ icon, theme, className, ...restProps }: IconProps) => {
  const classes = classNames('lm-icon', className, {
    [`icon-${theme}`]: theme
  });

  return <FontAwesomeIcon icon={icon} className={classes} {...restProps} />;
};

export default Icon;
