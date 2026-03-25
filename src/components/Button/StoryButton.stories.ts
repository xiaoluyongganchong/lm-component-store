import { StoryButton } from './StoryButton';

const meta = {
  title: 'Example/Button',
  component: StoryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    btnType: {
      control: { type: 'select' },
      options: ['primary', 'danger', 'default', 'link'],
    },
  },
};

export default meta;

type Story = {
  args?: {
    primary?: boolean;
    size?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
    label?: string;
    btnType?: 'primary' | 'danger' | 'default' | 'link';
    onClick?: () => void;
  };
};

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const Danger: Story = {
  args: {
    btnType: 'danger',
    backgroundColor: '#d32f2f',
    label: 'Button',
  },
};
