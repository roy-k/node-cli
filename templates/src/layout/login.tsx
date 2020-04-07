
import React from "react";

import "./login.less";

import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { fetch_login } from "fetch/modules/base";
import { data } from "assets/js/util";
import pageTitle from "assets/images/logo-pc.png";

class NormalLoginForm extends React.Component<any, any> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        fetch_login({
          ...values,
          type: "manager",
        }).then(
          res => {
            message.success("登录成功");
            data("loginInfo", res && res.userInfo);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
          error => {}
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("loginName", {
            rules: [{ required: true, message: "请输入账号" }],
            normalize: (value: string) => {
              if (!value) return "";
              return value.trim();
            },
          })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="账号" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("pwd", {
            rules: [{ required: true, message: "请输入密码" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item className="tac">
          <Button
            style={{ width: "360px" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

export interface LoginProps {}
function Login(props: LoginProps) {
  return (
    <div className="login-page">
      <div className="system no-select">
        <h1>
          <img src={pageTitle} className="logo" alt="logo" />
        </h1>
        <div className="system-info">
          {/* 采用移动互联网技术，为政府、机构、个人提供基于移动端的、高效、便捷的疫情数据上报和采集方案，有效地提升和加快疫情数据汇聚效率和防控响应速度 */}
        </div>
      </div>
      <div className="login-box">
        <div className="title no-select">桐乡防疫综合服务平台</div>
        <div className="form-box">
          <WrappedNormalLoginForm />
        </div>
      </div>
      <div className="copyright">
        &copy;2020 桐乡新冠肺炎疫情防控办 | 平安国际智慧城 ICP许可证号 粤ICP备06118290号-2
        {/* &copy;2018-2020 平安国际智慧城市科技股份有限公司. Design. All rights reserved. ICP许可证号
                粤ICP备06118290号-2 */}
      </div>
    </div>
  );
}

export default Login;