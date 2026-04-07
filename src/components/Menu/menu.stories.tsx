import Menu, { type MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    onSelect: { action: "select" },
  },
  args: {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: [],
  }
};

export default meta;

export const Default = {
  render: (args: MenuProps) => (
    <Menu {...args}>
      <MenuItem>active</MenuItem>
      <MenuItem>disabled</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem>menu 4</MenuItem>
    </Menu>
  ),
};

export const Success = {
  args: {
    mode: "vertical",
    defaultOpenSubMenus: ["2"],
  },
  render: (args: MenuProps) => (
    <Menu {...args}>
      <MenuItem>active</MenuItem>
      <MenuItem>item 2</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem>menu 4</MenuItem>
    </Menu>
  ),
};
