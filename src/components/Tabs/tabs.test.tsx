import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './tabs';
import TabItem from './tabsItem';

const onSelect = jest.fn();

const generateTabs = (props?: Partial<React.ComponentProps<typeof Tabs>>) => {
  return render(
    <Tabs defaultIndex="0" onSelect={onSelect} {...props}>
      <TabItem label="tab1">content1</TabItem>
      <TabItem label="tab2">content2</TabItem>
      <TabItem label="disabled" disabled>
        content3
      </TabItem>
    </Tabs>
  );
};

describe('Tabs component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default tabs and first content', () => {
    const { container } = generateTabs();
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('lm-tabs');
    expect(root).toHaveClass('lm-line-tabs');
    expect(screen.getByText('tab1')).toHaveClass('is-active');
    expect(screen.getByText('content1')).toBeInTheDocument();
  });

  it('switches active tab and content on click', () => {
    generateTabs();
    fireEvent.click(screen.getByText('tab2'));
    expect(screen.getByText('tab2')).toHaveClass('is-active');
    expect(screen.queryByText('content1')).not.toBeInTheDocument();
    expect(screen.getByText('content2')).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('does not trigger select when tab is disabled', () => {
    generateTabs();
    fireEvent.click(screen.getByText('disabled'));
    expect(screen.getByText('disabled')).toHaveClass('is-disabled');
    expect(screen.getByText('content1')).toBeInTheDocument();
    expect(onSelect).not.toHaveBeenCalledWith('2');
  });

  it('applies card mode class', () => {
    const { container } = generateTabs({ type: 'card' });
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('lm-card-tabs');
  });

  it('supports ReactNode label', () => {
    render(
      <Tabs defaultIndex="0">
        <TabItem label={<span data-testid="custom-label">自定义标题</span>}>
          custom-content
        </TabItem>
      </Tabs>
    );
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByText('custom-content')).toBeInTheDocument();
  });
});
