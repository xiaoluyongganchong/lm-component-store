import Icon from "./icon";
import {ThemeProps} from './icon'

const meta = {
  title: 'Components/Icon',
  Component: Icon,
  tags: ['autodocs'],
  args: {
    icon: '图标名',
    theme: '主题色'
  }
}

export default meta;

type Story = {
  args?: {
    title?: string;
    theme?: ThemeProps;
  }
}

export const Default: Story = {};

export const Coffee: Story = {
  args: {
    title: '咖啡',
    theme:'danger'
  }
}