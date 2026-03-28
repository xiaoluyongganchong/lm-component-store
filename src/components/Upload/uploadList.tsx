import React from 'react';
import type { UplaodFile } from './upload';
import Icon from '../Icon/icon';

export interface UploadListProps {
  fileList: UplaodFile[];
  onRemove: (file: UplaodFile) => void;
}

export const UploadList: React.FC<UploadListProps> = ({ fileList, onRemove }) => {
  return (
    <ul className="lm-upload-list">
      {fileList.map((item: UplaodFile) => (
        <li className="lm-upload-list-item" key={item.uid}>
          <span className={`file-name file-name-${item.status ?? 'ready'}`}>
            {item.name}
          </span>
          <span className='file-status'>
            {item.status === 'uploading' && <Icon icon="spinner" spin theme='primary'></Icon>}
            {item.status === 'success' && <Icon icon="check-circle"  theme='success'></Icon>}
            {item.status === 'error' && <Icon icon="times-circle" theme='danger'></Icon>}
            
          </span>
          <button type="button" onClick={() => onRemove(item)}>
            remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
