import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Icon from '../Icon/icon';

type SelectValue = string | number

export interface SelectOption {
  //给用户看的显示文本（或节点）
  label: React.ReactNode
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: SelectValue | SelectValue[]
  defaultValue?: SelectValue | SelectValue[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (
    value: SelectValue | SelectValue[],
    option: SelectOption | SelectOption[]
  ) => void;
  onVisibleChange?: (open: boolean) => void;
}

export const Select = ({
  options,
  multiple = false,
  disabled = false,
  placeholder = '请选择',
  onChange,
  onVisibleChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<SelectValue | undefined>(undefined)
  const [selectedValues, setSelectedValues] = useState<SelectValue[]>([])
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const selectedOption = options.find((item) => item.value === selectedValue)
  const displayValue = selectedOption && typeof selectedOption.label === 'string' ? selectedOption.label : ''

  const classes = classNames('lm-select', {
    'is-disabled': disabled,
    'is-open': open
  })

  const handleClick = () => {
    if (disabled) return
    setOpen((prev) => {
      const next = !prev
      onVisibleChange?.(next)
      return next
    })
  }

  const handleSelect = (item: SelectOption) => {
    if (item.disabled) return
    if (!multiple) {
      setSelectedValue(item.value)
      setOpen(false)
      onVisibleChange?.(false)
      onChange?.(item.value, item)
      return
    }

    const exists = selectedValues.includes(item.value)
    const nextValues = exists
      ? selectedValues.filter((v) => v !== item.value)
      : [...selectedValues, item.value]

    setSelectedValues(nextValues)
    const nextOptions = options.filter((opt) => nextValues.includes(opt.value))
    onChange?.(nextValues, nextOptions)
  }

  const handleRemoveTag = (removeValue: SelectValue, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!multiple || disabled) return
    const nextValues = selectedValues.filter((v) => v !== removeValue)
    setSelectedValues(nextValues)
    const nextOptions = options.filter((opt) => nextValues.includes(opt.value))
    onChange?.(nextValues, nextOptions)
  }

  const findEnabledFrom = (startIndex: number, direction: 1 | -1) => {
    let idx = startIndex
    while (idx >= 0 && idx < options.length) {
      if (!options[idx]?.disabled) return idx
      idx += direction
    }
    return -1
  }

  const getFirstEnabledIndex = () => findEnabledFrom(0, 1)

  const moveHighlight = (nextIndex:number) => {
    if (options.length === 0) return
    setHighlightIndex((prev) => {
      const direction: 1 | -1 = nextIndex >= prev ? 1 : -1
      const clamped = Math.max(0, Math.min(nextIndex, options.length - 1))
      const safeIndex = findEnabledFrom(clamped, direction)
      return safeIndex >= 0 ? safeIndex : prev
    })
  }

  useEffect(() => {
    if (!open) return
    if (highlightIndex >= 0) return

    if (!multiple && typeof selectedValue !== 'undefined') {
      const selectedIdx = options.findIndex((opt) => opt.value === selectedValue && !opt.disabled)
      if (selectedIdx >= 0) {
        setHighlightIndex(selectedIdx)
        return
      }
    }

    const firstEnabled = findEnabledFrom(0, 1)
    if (firstEnabled >= 0) setHighlightIndex(firstEnabled)
  }, [open, multiple, selectedValue, options, highlightIndex])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (disabled) return
    const key = e.key
    const code = e.keyCode
    const isArrowDown = key === 'ArrowDown' || code === 40
    const isArrowUp = key === 'ArrowUp' || code === 38
    const isEnter = key === 'Enter' || code === 13
    const isEscape = key === 'Escape' || key === 'Esc' || code === 27

    if (isArrowDown) {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          onVisibleChange?.(true)
          moveHighlight(0)
        } else {
          moveHighlight(highlightIndex + 1)
        }
        return
    }

    if (isArrowUp) {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          onVisibleChange?.(true)
          moveHighlight(options.length - 1)
        } else {
          moveHighlight(highlightIndex - 1)
        }
        return
    }

    if (isEnter) {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          onVisibleChange?.(true)
          moveHighlight(0)
          return
        }
        if (highlightIndex >= 0) {
          const item = options[highlightIndex]
          if (!item?.disabled) handleSelect(item)
        } else {
          const firstEnabled = getFirstEnabledIndex()
          if (firstEnabled >= 0) handleSelect(options[firstEnabled])
        }
        return
    }

    if (isEscape) {
        if (open) {
          setOpen(false)
          onVisibleChange?.(false)
        }
        return
    }
  }
  return (
    <div className={classes}>
      {!multiple ? (
        <input
          className="lm-select-input"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="lm-select-tags" onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0}>
          {selectedValues.length === 0 ? (
            <span className="lm-select-placeholder">{placeholder}</span>
          ) : (
            options
              .filter((opt) => selectedValues.includes(opt.value))
              .map((opt) => (
                <span className="lm-select-tag" key={opt.value}>
                  {opt.label}
                  <button
                    type="button"
                    className="lm-select-tag-remove"
                    aria-label={`remove-${String(opt.value)}`}
                    onClick={(e) => handleRemoveTag(opt.value, e)}
                  >
                    x
                  </button>
                </span>
              ))
          )}
        </div>
      )}
      <span className="lm-select-arrow" aria-hidden>v</span>

      {open && (
        <ul className="lm-select-dropdown">
          {options.map((item,index) => {
            const active = multiple
              ? selectedValues.includes(item.value)
              : selectedValue === item.value
            const highlighted = index === highlightIndex
            return (
              <li
                key={item.value}
                className={classNames('lm-select-item', {
                  'is-active': active,
                  'is-highlighted': highlighted,
                  'is-disabled': item.disabled
                  
                })}
                
                onClick={() => {
                  if (item.disabled) return
                  handleSelect(item)
                }}
              >
                {item.label}
                {highlighted && !active && <span className="lm-select-highlight-indicator">{'>'}</span>}
                {active && <Icon className="lm-select-check-icon" icon="check" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Select
