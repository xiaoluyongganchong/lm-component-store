import React from 'react';
import Progress, { ProgressProps } from './progress';
import type { ThemeProps } from '../Icon/icon';

const themeOptions: ThemeProps[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
];

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: themeOptions,
    },
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    strokeHeight: { control: { type: 'number' } },
    showText: { control: 'boolean' },
  },
  args: {
    percent: 30,
    strokeHeight: 15,
    showText: true,
    theme: 'primary' as ThemeProps,
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = { args?: ProgressProps };

export const Default: Story = {};

export const Half: Story = {
  args: {
    percent: 50,
  },
};

export const SuccessTheme: Story = {
  args: {
    percent: 72,
    theme: 'success',
  },
};

export const WithoutText: Story = {
  args: {
    percent: 45,
    showText: false,
  },
};

export const ThickBar: Story = {
  args: {
    percent: 60,
    strokeHeight: 22,
  },
};
