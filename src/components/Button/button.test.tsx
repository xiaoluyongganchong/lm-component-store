import React from 'react';
import { render, screen } from '@testing-library/react';
import Button, { ButtonType } from './button';

describe('Button component', () => {
  it('should render default button', () => {
    render(<Button>Button</Button>);
    const element = screen.getByText('Button');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn');
    expect(element).toHaveClass('btn-default');
  });

  it('should render link button when btnType is link', () => {
    render(
      <Button btnType={ButtonType.Link} href="https://example.com">
        Link
      </Button>
    );
    const element = screen.getByText('Link');
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn-link');
  });

  it('should render the correct component base on different props', () => {
    render(<Button btnType={ButtonType.Primary}>Primary</Button>);
    const element = screen.getByText('Primary');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn');
    expect(element).toHaveClass('btn-primary');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType={ButtonType.Link} href="https://example.com">
        Go Link
      </Button>
    );
    const element = screen.getByText('Go Link');
    expect(element.tagName).toEqual('A');
    expect(element).toHaveAttribute('href', 'https://example.com');
  });

  it('should render disabled button when disabled set to true', () => {
    render(<Button disabled>Disabled</Button>);
    const element = screen.getByText('Disabled');
    expect(element).toBeDisabled();
  });
});
