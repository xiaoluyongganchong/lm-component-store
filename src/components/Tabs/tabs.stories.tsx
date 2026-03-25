import Tabs from './tabs';
import TabItem from './tabsItem';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['line', 'card'],
    },
    defaultIndex: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'line',
    defaultIndex: '0',
  },
};

export default meta;

export const LineTabs = {
  render: (args: { type?: 'line' | 'card'; defaultIndex?: string }) => (
    <Tabs type={args.type} defaultIndex={args.defaultIndex}>
      <TabItem label="标签一">这里是标签一的内容</TabItem>
      <TabItem label="标签二">这里是标签二的内容</TabItem>
      <TabItem label="禁用标签" disabled>
        这个内容不会被选中
      </TabItem>
      <TabItem label="标签三">这里是标签三的内容</TabItem>
    </Tabs>
  ),
};

export const CardTabs = {
  args: {
    type: 'card',
  },
  render: (args: { type?: 'line' | 'card'; defaultIndex?: string }) => (
    <Tabs type={args.type} defaultIndex={args.defaultIndex}>
      <TabItem label="概览">这里是概览内容</TabItem>
      <TabItem label="配置">这里是配置内容</TabItem>
      <TabItem label="日志">这里是日志内容</TabItem>
    </Tabs>
  ),
};
