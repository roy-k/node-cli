
import React, { lazy, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "moment/locale/zh-cn";
import Header from "./header";
import { Aside } from "./aside";
import { Content } from "./content";
import { Footer } from "./footer";
import { data } from "assets/js/util";
import Login from "./login";
import style from "./layout.module.less";
import { LoginInfo } from "fetch/modules/base";

// todo 登录页
const initUser: LoginInfo = data("loginInfo"); // || "1"

export function Layout() {
  const [user, setUser] = useState(initUser);
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        {user ? (
          <div className={style.layout}>
            <Header user={user} />
            <div className={style.layoutContainer}>
              <Aside />
              <Content />
            </div>
            {/* <Footer /> */}
          </div>
        ) : (
          <Login />
        )}
      </ConfigProvider>
    </Router>
  );
}