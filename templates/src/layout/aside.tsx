
import { withRouter, Link } from "react-router-dom";

import style from "./layout.module.less";

import { menuConfig } from "./router.config";

import { Menu, Icon } from "antd";
import { Icon as MyIcon } from "components/icon";
import { useState } from "react";

const { SubMenu } = Menu;
const openKeys = menuConfig.map(({ route }) => route);

export const Aside = withRouter(({ match }) => {
  const { path } = match;

  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([document.location.hash.slice(2)])

  return (
    <aside
      className={`${style.aside} no-select`}
      style={{ flex: `0 0 ${collapsed ? "54px" : "150px"}` }}
    >
      <Menu
        inlineCollapsed={collapsed}
        mode="inline"
        openKeys={openKeys}
        // style={{ width: '100%' }}
        selectedKeys={selectedKeys}
      >
        {menuConfig.map(({ label, route, icon, children, leaf }) => {
          if (leaf) {
            return (
              <Menu.Item key={route} onClick={({ key }) => setSelectedKeys([key])}>
                <Link to={`${path}${route}`}>
                  <Icon type={icon} />
                  <span>{label}</span>
                </Link>
              </Menu.Item>
            );
          }

          return (
            <SubMenu
              key={route}
              title={
                <span>
                  <Icon type={icon} />
                  <span>{label}</span>
                </span>
              }
            >
              {children
                ? children.map(child => {
                    // todo leaf
                    const { label, route: childRoute } = child;
                    return (
                      <Menu.Item key={childRoute}>
                        <Link to={`${path}${route}/${childRoute}`}>
                          {label}
                        </Link>
                      </Menu.Item>
                    );
                  })
                : null}
            </SubMenu>
          );
        })}
      </Menu>
    </aside>
  );
});