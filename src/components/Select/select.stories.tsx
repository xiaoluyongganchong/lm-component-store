import React, { useState } from "react";
import Select, { SelectProps } from './select'

const options = [
  { label: 'nihao', value: 'nihao' },
  { label: 'nihao2', value: 'nihao2' },
  { label: 'nihao3', value: 'nihao3' },
]

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    onChange: (value: any, option: any) => {
  console.log('onChange =>', value, option)
}
  }
};

export default meta;

type Story = { args?: SelectProps }


export const Basic: Story = {
  args: {
    placeholder: '请选择',
    options,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: '不可操作',
    disabled: true,
    options,
  },
}

export const WithLongList: Story = {
  args: {
    placeholder: '长列表',
    options: [
      ...options,
      { label: 'item4', value: 'item4' },
      { label: 'item5', value: 'item5' },
      { label: 'item6', value: 'item6' },
    ],
  },
}

export const Multiple: Story = {
  args: {
    placeholder: '多选',
    multiple:true,
    options: [
      ...options,
      { label: 'item4', value: 'item4' },
      { label: 'item5', value: 'item5' },
      { label: 'item6', value: 'item6' },
    ],
  },
}