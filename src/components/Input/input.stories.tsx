import { JSX } from 'react/jsx-runtime';
import Input, { InputProps } from './input';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
    },
    disabled: { control: { type: 'boolean' } },
    icon: { control: { type: 'text' } },
  },
  args: {
    placeholder: '请输入内容',
    disabled: false,
  },
};

export default meta;

type Story = {
  args?: {
    placeholder?: string;
    disabled?: boolean;
    size?: 'lg' | 'sm';
    icon?: string;
    prepend?: string;
    append?: string;
    defaultValue?: string;
    value?: string;
  };
  render?: (args: JSX.IntrinsicAttributes & InputProps) => JSX.Element;
};

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: 'search',
    placeholder: '带图标输入框',
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    prepend: 'https://',
    append: '.com',
    placeholder: '请输入域名',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: '小尺寸输入框',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '不可编辑内容',
  },
};

export const Controlled: Story = {
  args: {
    value: '初始值',
    placeholder:'输入框'
  },
  render: (args: JSX.IntrinsicAttributes & InputProps) => {
    const [val, setVal] = useState(args.value ?? '')
    return (
      <Input
        {...args}
        value={val}
        onChange={ (e) => setVal(e.target.value)}
      />
    )
  }
}