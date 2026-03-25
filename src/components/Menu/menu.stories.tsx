import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

// Menu 主 stories：用于集中演示组合组件在不同布局和状态下的行为
const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    defaultIndex: {
      control: { type: 'text' },
    },
    defaultOpenSubMenus: {
      control: { type: 'object' },
    },
  },
  args: {
    mode: 'horizontal',
    defaultIndex: '0',
    defaultOpenSubMenus: ['2'],
  },
};

export default meta;

// 默认场景：横向菜单，包含普通项 + 子菜单
export const DefaultMenu = {
  render: (args: {
    mode?: 'horizontal' | 'vertical';
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
  }) => (
    <Menu
      mode={args.mode}
      defaultIndex={args.defaultIndex}
      defaultOpenSubMenus={args.defaultOpenSubMenus}
    >
      <MenuItem>首页</MenuItem>
      <MenuItem>商品列表</MenuItem>
      <SubMenu title="更多">
        <MenuItem>下拉选项一</MenuItem>
        <MenuItem>下拉选项二</MenuItem>
      </SubMenu>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
};

// 垂直场景：常用于侧边导航，演示 vertical 模式样式
export const VerticalMenu = {
  args: {
    mode: 'vertical',
    defaultOpenSubMenus: ['2'],
  },
  render: (args: {
    mode?: 'horizontal' | 'vertical';
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
  }) => (
    <div style={{ width: 280 }}>
      <Menu
        mode={args.mode}
        defaultIndex={args.defaultIndex}
        defaultOpenSubMenus={args.defaultOpenSubMenus}
      >
        <MenuItem>首页</MenuItem>
        <MenuItem>商品列表</MenuItem>
        <SubMenu title="更多">
          <MenuItem>下拉选项一</MenuItem>
          <MenuItem>下拉选项二</MenuItem>
        </SubMenu>
        <MenuItem>联系我们</MenuItem>
      </Menu>
    </div>
  ),
};

// 禁用场景：演示 MenuItem 的 disabled 状态与交互限制
export const DisabledItem = {
  render: (args: {
    mode?: 'horizontal' | 'vertical';
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
  }) => (
    <Menu
      mode={args.mode}
      defaultIndex={args.defaultIndex}
      defaultOpenSubMenus={args.defaultOpenSubMenus}
    >
      <MenuItem>首页</MenuItem>
      <MenuItem disabled>禁用菜单项</MenuItem>
      <SubMenu title="更多">
        <MenuItem>下拉选项一</MenuItem>
        <MenuItem>下拉选项二</MenuItem>
      </SubMenu>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
};

// 默认展开场景：演示 defaultOpenSubMenus 在 vertical 下的效果
export const DefaultOpenSubMenu = {
  args: {
    mode: 'vertical',
    defaultOpenSubMenus: ['2'],
  },
  render: (args: {
    mode?: 'horizontal' | 'vertical';
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
  }) => (
    <div style={{ width: 280 }}>
      <Menu
        mode={args.mode}
        defaultIndex={args.defaultIndex}
        defaultOpenSubMenus={args.defaultOpenSubMenus}
      >
        <MenuItem>首页</MenuItem>
        <MenuItem>商品列表</MenuItem>
        <SubMenu title="默认展开子菜单">
          <MenuItem>下拉选项一</MenuItem>
          <MenuItem>下拉选项二</MenuItem>
          <MenuItem>下拉选项三</MenuItem>
        </SubMenu>
        <MenuItem>联系我们</MenuItem>
      </Menu>
    </div>
  ),
};
