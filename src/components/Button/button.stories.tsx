import Button, { ButtonSize, ButtonType } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    btnType: {
      control: { type: 'select' },
      options: [ButtonType.Primary, ButtonType.Default, ButtonType.Danger, ButtonType.Link],
    },
    size: {
      control: { type: 'radio' },
      options: [ButtonSize.large, ButtonSize.small],
    },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    children: '按钮',
    btnType: ButtonType.Default,
    disabled: false,
  },
};

export default meta;

type Story = {
  args?: {
    children?: string;
    btnType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    href?: string;
  };
};

export const Default: Story = {};

export const Primary: Story = {
  args: {
    btnType: ButtonType.Primary,
    children: '主要按钮',
  },
};

export const Danger: Story = {
  args: {
    btnType: ButtonType.Danger,
    children: '危险按钮',
  },
};

export const Link: Story = {
  args: {
    btnType: ButtonType.Link,
    href: 'https://storybook.js.org/',
    children: '跳转链接',
  },
};

export const SmallDisabled: Story = {
  args: {
    size: ButtonSize.small,
    disabled: true,
    children: '小号禁用',
  },
};
