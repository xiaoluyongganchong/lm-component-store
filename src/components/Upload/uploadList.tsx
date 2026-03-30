import React from 'react';
import type { UplaodFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';

export interface UploadListProps {
  fileList: UplaodFile[];
  onRemove: (file: UplaodFile) => void;
}

export const UploadList: React.FC<UploadListProps> = ({ fileList, onRemove }) => {
  return (
    <ul className="lm-upload-list">
      {fileList.map((item: UplaodFile) => (
        <li className="lm-upload-list-item" key={item.uid}>
          <div className="lm-upload-list-row">
            <div className="lm-upload-list-info">
              <Icon icon="file-alt" theme="secondary" />
              <span className={`file-name file-name-${item.status ?? 'ready'}`}>{item.name}</span>
            </div>
            <div className="lm-upload-list-meta">
              <span className="file-status">
                {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary" />}
                {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
              </span>
              <button
                type="button"
                className="lm-upload-list-remove"
                aria-label="移除"
                onClick={() => onRemove(item)}
              >
                <Icon icon="times" theme="secondary" />
              </button>
            </div>
          </div>
          {item.status === 'uploading' && <Progress percent={item.percent ?? 0} />}
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
