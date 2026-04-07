import { FC } from 'react';
import Upload, { UploadProps } from './upload';
import Dragger, { draggerProps } from './dragger';

export type IUploadComponent = FC<UploadProps> & {
  Dragger: FC<draggerProps>;
};

const TransUpload = Upload as IUploadComponent;
TransUpload.Dragger = Dragger;

export default TransUpload;
