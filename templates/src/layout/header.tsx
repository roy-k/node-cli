
import React from "react";

import style from "./layout.module.less";

import { Icon, Popover } from "antd";
import { LoginInfo, fetch_logout } from "fetch/modules/base";
import { data } from "assets/js/util";
import { roleEnum } from "enums/base";
import { roleType } from "./router.config";

export interface HeaderProps {
  user: LoginInfo;
}
function Header({ user }: HeaderProps) {
  function logout() {
    data("loginInfo", null);
    fetch_logout().then(
      res => {
        window.location.reload();
      },
      error => {
        window.location.reload();
      }
    );
  }

  return (
    <header className={style.header}>
      <h1 className={`${style.title} no-select`}>桐乡防疫综合服务平台</h1>
      <Popover
        content={
          <a onClick={logout} className="logout">
            退出
          </a>
        }
      >
        <div className={`${style.userInfo} wh`}>
          <Icon type="user" className="mr5" />
          <span className="mr10">{user.loginName}</span>
          <span className="">{roleEnum.getLabel(roleType)}</span>
        </div>
      </Popover>
    </header>
  );
}

export default Header;