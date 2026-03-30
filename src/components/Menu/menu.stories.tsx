import { AlertType } from "../Alert/alert";
import Menu from "./menu";

const meta = {
 title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [AlertType.Default, AlertType.Success, AlertType.Danger, AlertType.Warning],
    },
   onselect:{ action: 'select'}
  },
  args: {
    title: '提示标题',
    children: '这是一条提示内容',
    type: AlertType.Default,
    closable: true,
  },
}

export default meta;

type Story = {
  args?: {
    title?: string;
    children?: string;
    type?: AlertType;
    closable?: boolean;
    onClose?: () => void;
  };
};

export const Default: Story = {};

export const Success: Story = {
  args: {
    type: AlertType.Success,
    title: '成功',
    children: '操作已完成',
  },
};