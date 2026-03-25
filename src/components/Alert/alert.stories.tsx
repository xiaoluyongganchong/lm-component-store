import Alert, { AlertType } from './alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [AlertType.Default, AlertType.Success, AlertType.Danger, AlertType.Warning],
    },
    closable: {
      control: { type: 'boolean' },
    },
    onClose: { action: 'closed' },
  },
  args: {
    title: '提示标题',
    children: '这是一条提示内容',
    type: AlertType.Default,
    closable: true,
  },
};

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

export const Danger: Story = {
  args: {
    type: AlertType.Danger,
    title: '错误',
    children: '请求失败，请稍后重试',
  },
};

export const NoCloseButton: Story = {
  args: {
    closable: false,
    title: '不可关闭',
    children: '该提示没有关闭按钮',
  },
};
