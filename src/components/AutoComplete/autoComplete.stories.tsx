import React, { useState } from 'react';
import AutoComplete from './autoComplete';

type Option = {
  id: string;
  label: string;
};

const pool: Option[] = [
  { id: '1', label: 'brefhd' },
  { id: '2', label: 'hdfuis' },
  { id: '3', label: 'ihsza' },
  { id: '4', label: 'ahsuidfg' },
  { id: '5', label: 'hduihsi' },
  { id: '6', label: 'hasdof' },
  { id: '7', label: 'AD' },
  { id: '8', label: 'Mgafh' },
];

const AutoCompleteAny = AutoComplete as unknown as React.ComponentType<any>;

const meta = {
  title: 'Components/AutoComplete',
  component: AutoCompleteAny,
  tags: ['autodocs'],
  args: {
    placeholder: '请输入内容',
    debounceDelay: 200,
    fetchSuggestion: (str: string) =>
      new Promise<Option[]>((resolve) => {
        // 用 setTimeout 模拟网络请求，便于验证 loading 图标
        setTimeout(() => {
          resolve(
            pool.filter((item) => item.label.toLowerCase().includes(str.toLowerCase()))
          );
        }, 500);
      }),
    getOptionLabel: (item: Option) => item.label,
    getOptionKey: (item: Option) => item.id,
    renderOption: (item: Option) => <span>{item.label}</span>,
  },
};

export default meta;

export const Default = {
  render: (args: any) => {
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState<Option | undefined>(undefined);

    return (
      <AutoCompleteAny
        {...args}
        inputValue={inputValue}
        onInputChange={setInputValue}
        value={selected}
        onSelect={(item: Option) => setSelected(item)}
      />
    );
  },
};