import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Alert, { AlertType } from './alert';

describe('Alert Component', () => {
  //能看到基础渲染内容
  it('should render default alert with children', () => {
    render(<Alert>Alert</Alert>);
    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });
  //能看到标题
   it('should render title when title is provided', () => {
    render(<Alert title="提示标题">提示内容</Alert>);
    expect(screen.getByText('提示标题')).toBeInTheDocument();
    expect(screen.getByText('提示内容')).toBeInTheDocument();
   });
  //能看到主题类名
  it('should apply type class name', () => {
    //container:dom容器
    const { container } = render(<Alert type={AlertType.Danger}>danger</Alert>);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('viking-alert-danger');
  });
  //可关闭按钮开关
  it('should hide close button when closable is false', () => {
    render(<Alert closable={false}>not closable</Alert>); //按钮不可关闭
    expect(screen.queryByText('X')).not.toBeInTheDocument(); //所以关闭按钮不会显示出来
  });
  //点击关闭后元素消失
  it('should call onClose and remove alert after clicking close button', () => {
    const onClose = jest.fn();
    render(<Alert onClose={onClose}>close</Alert>);

    fireEvent.click(screen.getByText('X'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('close')).not.toBeInTheDocument();
  });
});