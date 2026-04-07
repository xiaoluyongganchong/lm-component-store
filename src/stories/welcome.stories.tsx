
const WelcomePage = () => {
  return (
    <div style={{ padding: '40px 48px', lineHeight: 1.8 }}>
      <h1 style={{ color: '#c41d3a', marginBottom: 24 }}>组件完美开发工具应有的特点</h1>
      <ul style={{ fontSize: 36, margin: 0, paddingLeft: 36 }}>
        <li style={{ marginBottom: 24 }}>分开展示各个组件不同属性下的状态</li>
        <li style={{ marginBottom: 24 }}>能追踪组件的行为并且具有属性调试功能</li>
        <li style={{ marginBottom: 24 }}>可以为组件自动生成文档和属性列表</li>
      </ul>
    </div>
  );
};

const meta = {
  title: '00-欢迎页/Welcome',
  component: WelcomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '组件库欢迎页与开发说明。'
      }
    }
  }
};

export default meta;
export const Default = {};
