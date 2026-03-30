import React from 'react';
import type { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
  /** 进度百分比 0–100 */
  percent: number;
  /** 进度条高度（px） */
  strokeHeight?: number;
  /** 是否在条内显示百分比文字 */
  showText?: boolean;
  /** 根节点内联样式 */
  styles?: React.CSSProperties;
  /** 进度条配色主题 */
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = ({
  percent,
  strokeHeight = 15,
  showText = true,
  styles,
  theme = 'primary',
}) => {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="lm-progress-bar" style={styles}>
      <div className="lm-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`lm-progress-bar-inner color-${theme}`}
          style={{ width: `${safePercent}%` }}
        >
          {showText && <span className="inner-text">{`${Math.round(safePercent)}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
