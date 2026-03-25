import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon'


export type AutoCompleteOptionKey = string | number;

export interface AutoCompleteProps<T>
  extends Omit<InputProps, 'value' | 'onChange' | 'onSelect'> {
  /** 根据输入文本拉取/过滤候选项 */
  fetchSuggestion: (str: string) => T[] | Promise<T[]>;
  /** 当前被选中的候选项（受控） */
  value?: T;
  /** 选中候选项后回传 */
  onSelect: (item: T) => void;

  /** 外部受控：输入框显示文本 */
  inputValue: string;
  /** 外部受控：输入框文本变化回调 */
  onInputChange: (val: string) => void;

  /** 从候选项 T 获取用于展示/写回输入框的 label */
  getOptionLabel: (item: T) => ReactNode | string;

  /** 下拉列表项自定义渲染（可选） */
  renderOption?: (item: T) => ReactNode;
  /** 候选项的稳定 key（可选，建议对象候选提供） */
  getOptionKey?: (item: T) => AutoCompleteOptionKey;
}

const labelToString = (label: ReactNode | string) => {
  return typeof label === 'string' ? label : '';
};

const AutoComplete = <T,>(props: AutoCompleteProps<T>) => {
  const {
    fetchSuggestion,
    onSelect,
    value,
    inputValue,
    onInputChange,
    getOptionLabel,
    renderOption,
    getOptionKey,
    ...inputProps
  } = props;

  const [suggestions, setSuggestions] = useState<T[]>([]);
  const suppressNextFetchRef = useRef(false);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const q = inputValue.trim();
    if (!q) {
      setSuggestions([]);
      return;
    }

    if (suppressNextFetchRef.current) {
      suppressNextFetchRef.current = false;
      return;
    }

    const result = fetchSuggestion(q);
    if (result instanceof Promise) {
      setLoading(true)
      result.then((data) => setSuggestions(data));
      setLoading(false)
    } else {
      setSuggestions(result);
    }
  }, [fetchSuggestion, inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setSuggestions([]);

    // 选中后把 label 写回 inputValue，但避免紧接着触发一次 fetch
    suppressNextFetchRef.current = true;
    onInputChange(labelToString(getOptionLabel(item)));
  };

  return (
    <div className="lm-suto-complete">
      <Input {...inputProps} value={inputValue} onChange={handleChange} />
      {loading && <ul><Icon icon='spinner' spin></Icon></ul>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => {
            const label = labelToString(getOptionLabel(item));
            const key = getOptionKey ? getOptionKey(item) : label || index;
            return (
              <li key={key} onClick={() => handleSelect(item)}>
                {renderOption ? renderOption(item) : label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;