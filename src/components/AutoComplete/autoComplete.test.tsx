import React, { useState } from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'

config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

type TestItem = {
  value: string
  number: number
}

const testArray: TestItem[] = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]

const renderOption = (item: TestItem) => <>name: {item.value}</>

type ControlledAutoCompleteProps = Omit<
  AutoCompleteProps<TestItem>,
  'inputValue' | 'onInputChange'
>

const ControlledAutoComplete = (props: ControlledAutoCompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <AutoComplete<TestItem>
      {...props}
      inputValue={inputValue}
      onInputChange={setInputValue}
    />
  )
}

const onSelect = jest.fn()

const testProps: ControlledAutoCompleteProps = {
  fetchSuggestion: (query: string) =>
    testArray.filter((item) => item.value.includes(query)),
  onSelect,
  placeholder: 'auto-complete',
  getOptionLabel: (item) => item.value,
}

const testPropsWithCustomRender: ControlledAutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption,
}

let wrapper: RenderResult
let inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    onSelect.mockClear()
    wrapper = render(<ControlledAutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })

    expect(wrapper.container.querySelectorAll('.suggestions-item').length).toEqual(2)

    fireEvent.click(wrapper.getByText('ab'))
    expect(onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })

  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })

    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(wrapper.getByText('ab')).toHaveClass('item-hightlighted')

    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(wrapper.getByText('abc')).toHaveClass('item-hightlighted')

    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(wrapper.getByText('ab')).toHaveClass('item-hightlighted')

    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('renderOption should generate the right template', async () => {
    const customWrapper = render(<ControlledAutoComplete {...testPropsWithCustomRender} />)
    const customInputNode = customWrapper.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(customInputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(customWrapper.queryByText('name: ab')).toBeInTheDocument()
    })
  })

  it('async fetchSuggestion should work fine', async () => {
    const fetchSuggestion = jest.fn((query: string) =>
      Promise.resolve(testArray.filter((item) => item.value.includes(query)))
    )
    const asyncProps: ControlledAutoCompleteProps = {
      ...testProps,
      fetchSuggestion,
      placeholder: 'auto-complete-3',
    }
    const asyncWrapper = render(<ControlledAutoComplete {...asyncProps} />)
    const asyncInputNode = asyncWrapper.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(asyncInputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(fetchSuggestion).toHaveBeenCalled()
      expect(asyncWrapper.queryByText('ab')).toBeInTheDocument()
    })
  })
})

export {}