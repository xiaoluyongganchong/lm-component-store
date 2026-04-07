import React, { useRef } from 'react'
import Form from './form'
import Item from './formItem'
import Input from '../Input/input'
import Button, { ButtonType } from '../Button/button'
import type { CustomRule } from './useStore'

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    )
  ]
}

export default meta

const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value){
      return new Promise((resolve,reject) => {
        if (value !== getFieldValue('password')) {
          reject('两次密码输入不一致')
        }
        setTimeout(() => {
          resolve()
        },1000)
      })
    }
  })
]

type Story = {
  render?: () => React.ReactElement
}


export const Basic: Story = {
  render: () => (
    <Form name="basic-form" initialValue={{ username: "lm", agrement: true }}>
      { ({isSubmitting,isValid}) => (
        <>
          <Item label="用户名">
            <Input placeholder="请输入用户名" />
          </Item>
          <Item label="邮箱">
            <Input placeholder="请输入邮箱" />
          </Item>
          <Item>
            <Button btnType={ButtonType.Primary}>提交 {isSubmitting ? '验证中' : '验证完毕'} { isValid ? '通过' : '没通过'}</Button>
          </Item>
        </>
      )}
    </Form>
  )
}

export const WithDefaultValues: Story = {
  render: () => (
    <Form name="default-value-form">
      <Item label="姓名">
        <Input defaultValue="小明" />
      </Item>
      <Item label="手机号">
        <Input defaultValue="13800138000" />
      </Item>
      <Item>
        <Button btnType={ButtonType.Primary}>保存</Button>
      </Item>
    </Form>
  )
}

export const SubmitDemo: Story = {
  render: () => (
    <Form name="submit-demo">
      <Item label="用户名" name='username' rules={{type:'email',required:true}}>
        <Input placeholder="请输入用户名" />
      </Item>
      <Item label="密码" name='password' rules={{type:'string',required:true,min:3,max:8}}>
        <Input type="password" placeholder="请输入密码" />
      </Item>
      <Item label="确认密码" name='confirm' rules={confirmRules}>
        <Input type="password" placeholder="请输入密码" />
      </Item>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Item
          name='checkbox'
          valuePropName='checked'
          getValueFormEvent={(e) => e.target.checked}
          rules={{type:"enum",enum:[true],message:"请同意协议"}}
        >
          <input type="checkbox" />
        </Item>
       <span>注册即代表你同意<a href="/agreement">用户协议</a></span>
      </div>
      <div className="lm-form-submit-area">
        <Button btnType={ButtonType.Primary} onClick={() => console.log('form submit')}>
          登录
        </Button>
      </div>
    </Form>
  )
}
