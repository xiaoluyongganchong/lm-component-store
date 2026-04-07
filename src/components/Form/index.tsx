import { FC } from 'react';
import Form, { FormProps } from './form';
import Item, { FormItemProps } from './formItem';

export type IFormComponent = FC<FormProps> & {
  Item: FC<FormItemProps>;
};

const TransForm = Form as IFormComponent;
TransForm.Item = Item;

export default TransForm;
