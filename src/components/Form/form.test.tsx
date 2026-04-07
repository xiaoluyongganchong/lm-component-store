import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './form'
import Item from './formItem'
import Input from '../Input/input'

describe('Form component', () => {
  it('should render from structure and children on page', () => {
    const { container } = render(
      <Form name="basic-form">
        <Item name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </Item>
      </Form>
    )

    expect(screen.getByText('用户名')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('请输入用户名')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('form.lm-form')).toBeInTheDocument()
  })

  it('should inject initialValue into field by name', async () => {
    render(
      <Form name="value-form" initialValue={{ username: 'lm' }}>
        <Item name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </Item>
      </Form>
    )

    const input = screen.getByPlaceholderText('请输入用户名') as HTMLInputElement

    await waitFor(() => {
      expect(input.value).toBe('lm')
    })
  })

  it('should call onFinish with collected values when validation passes', async () => {
    const onFinish = jest.fn()
    const onFinishFailed = jest.fn()

    render(
      <Form name="submit-ok" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Item
          name="username"
          label="用户名"
          rules={{ required: true, message: '必填' }}
        >
          <Input placeholder="请输入用户名" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.type(screen.getByPlaceholderText('请输入用户名'), 'alice')
    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1)
      expect(onFinish.mock.calls[0][0]).toEqual({ username: 'alice' })
      expect(onFinishFailed).not.toHaveBeenCalled()
    })
  })

  it('should call onFinishFailed and not onFinish when validation fails', async () => {
    const onFinish = jest.fn()
    const onFinishFailed = jest.fn()

    render(
      <Form name="submit-fail" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Item
          name="username"
          label="用户名"
          rules={{ required: true, message: '请输入用户名' }}
        >
          <Input placeholder="请输入用户名" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinishFailed).toHaveBeenCalledTimes(1)
      expect(onFinish).not.toHaveBeenCalled()
    })

    const [values, errors] = onFinishFailed.mock.calls[0]
    expect(values).toMatchObject({ username: '' })
    expect(errors.username).toBeDefined()
    expect(errors.username.length).toBeGreaterThan(0)
  })

  it('should show field error after blur when rules fail', async () => {
    render(
      <Form name="blur-form">
        <Item
          name="email"
          label="邮箱"
          rules={{ type: 'email', message: '邮箱格式不正确' }}
          validateTrigger="onBlur"
        >
          <Input placeholder="邮箱" />
        </Item>
      </Form>
    )

    const input = screen.getByPlaceholderText('邮箱')
    await userEvent.type(input, 'not-an-email')
    await userEvent.tab()

    await waitFor(() => {
      expect(screen.getByText('邮箱格式不正确')).toBeInTheDocument()
    })

    // eslint-disable-next-line testing-library/no-node-access
    const control = input.closest('.lm-form-item-control')
    expect(control).toHaveClass('lm-form-item-has-error')
  })

  it('should support checkbox via valuePropName, trigger and getValueFormEvent', async () => {
    const onFinish = jest.fn()

    render(
      <Form name="check-form" onFinish={onFinish}>
        <Item
          name="agree"
          label="同意协议"
          valuePropName="checked"
          trigger="onChange"
          getValueFormEvent={(e) => e.target.checked}
          rules={[
            {
              asyncValidator: (_rule, value) =>
                value === true
                  ? Promise.resolve()
                  : Promise.reject(new Error('请勾选协议'))
            }
          ]}
        >
          <input type="checkbox" aria-label="同意协议" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.click(screen.getByRole('checkbox', { name: '同意协议' }))
    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ agree: true })
    })
  })

  it('should pass form state to function children', () => {
    render(
      <Form name="render-props">
        {(form) => (
          <>
            <span data-testid="is-valid">{String(form.isValid)}</span>
            <span data-testid="is-submitting">{String(form.isSubmitting)}</span>
          </>
        )}
      </Form>
    )

    expect(screen.getByTestId('is-valid')).toHaveTextContent('true')
    expect(screen.getByTestId('is-submitting')).toHaveTextContent('false')
  })

  it('should validate with rule function that reads other field via getFieldValue', async () => {
    const onFinish = jest.fn()

    render(
      <Form name="confirm-pwd" onFinish={onFinish}>
        <Item name="password" label="密码" rules={{ required: true, message: '请输入密码' }}>
          <Input placeholder="密码" />
        </Item>
        <Item
          name="confirm"
          label="确认密码"
          rules={[
            ({ getFieldValue }) => ({
              asyncValidator: (_rule, value) =>
                value && value === getFieldValue('password')
                  ? Promise.resolve()
                  : Promise.reject(new Error('两次密码不一致'))
            })
          ]}
        >
          <Input placeholder="确认密码" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.type(screen.getByPlaceholderText('密码'), 'secret123')
    await userEvent.type(screen.getByPlaceholderText('确认密码'), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        password: 'secret123',
        confirm: 'secret123'
      })
    })
  })

  it('should not inject store props when Item has no name', async () => {
    const onChange = jest.fn()
    render(
      <Form name="no-name-item">
        <Item label="无 name">
          <Input placeholder="自由输入" onChange={onChange} />
        </Item>
      </Form>
    )

    const input = screen.getByPlaceholderText('自由输入')
    expect(input).not.toHaveAttribute('value', '')
    await userEvent.type(input, 'x')
    expect(onChange).toHaveBeenCalled()
  })

  it('should show field error in UI after submit validation fails', async () => {
    render(
      <Form name="submit-ui-error">
        <Item
          name="username"
          label="用户名"
          rules={{ required: true, message: '请输入用户名' }}
        >
          <Input placeholder="请输入用户名" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(screen.getByText('请输入用户名')).toBeInTheDocument()
    })
  })

  it('should run validateField on change when validateTrigger is onChange', async () => {
    render(
      <Form name="on-change-validate">
        <Item
          name="code"
          label="验证码"
          rules={{ min: 3, message: '至少3个字符' }}
          validateTrigger="onChange"
        >
          <Input placeholder="验证码" />
        </Item>
      </Form>
    )

    const input = screen.getByPlaceholderText('验证码')
    await userEvent.type(input, 'ab')

    await waitFor(() => {
      expect(screen.getByText('至少3个字符')).toBeInTheDocument()
    })

    await userEvent.type(input, 'c')

    await waitFor(() => {
      expect(screen.queryByText('至少3个字符')).not.toBeInTheDocument()
    })
  })

  it('should aggregate multiple fields in onFinish when all valid', async () => {
    const onFinish = jest.fn()

    render(
      <Form name="multi-field" onFinish={onFinish}>
        <Item name="first" label="名" rules={{ required: true, message: '必填' }}>
          <Input placeholder="名" />
        </Item>
        <Item name="last" label="姓" rules={{ required: true, message: '必填' }}>
          <Input placeholder="姓" />
        </Item>
        <button type="submit">提交</button>
      </Form>
    )

    await userEvent.type(screen.getByPlaceholderText('名'), '三')
    await userEvent.type(screen.getByPlaceholderText('姓'), '张')
    await userEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ first: '三', last: '张' })
    })
  })
})
