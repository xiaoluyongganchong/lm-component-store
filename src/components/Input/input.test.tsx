import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './input';

describe('Input component', () => {
  it('should render input with placeholder', () => {
    render(<Input placeholder="请输入用户名" />);
    expect(screen.getByPlaceholderText('请输入用户名')).toBeInTheDocument();
  });

  it('should render icon when icon prop provided', () => {
    const { container } = render(<Input icon="search" />);
    expect(container.querySelector('.icon-wrapper')).toBeInTheDocument();
  });

  it('should render prepend and append content', () => {
    render(<Input prepend="https://" append=".com" />);
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  it('should apply disabled state to input element', () => {
    render(<Input disabled placeholder="disabled input" />);
    expect(screen.getByPlaceholderText('disabled input')).toBeDisabled();
  });
});
