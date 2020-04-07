
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  Ref,
  MutableRefObject,
  useEffect
} from "react";

import { Form, Input, Radio, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import MySelect from "components/form/select/Select";
import { roleEnum,  } from "enums/base";
import {
  rule_notEmpty,
  rule_notUndefined,
  rule_isNumber,
  rule_onlyCharAndNumber,
  rule_lengthRange
} from "components/form";
import { CommonObject } from "types/common";
import { EnumsField } from "enums/factory";
import { streetEnum } from "enums/infoCollect";
import { roleType } from "layout/router.config";
import { LoginInfo } from "fetch/modules/base";
import { data } from "assets/js/util";

const userInfo: LoginInfo = data("loginInfo");

type Fields = {
  loginName: string;
  userName: string;
  roleType: number;
  tel: string;
};

// * 管理员 可以新增 任何
// * 街道管理员 可以新增 企业管理员
function filterFormRole(fields: EnumsField) {
  // 管理员不能增加企业
  if (roleType === 1) return fields.value !== 6;
  // 街道只能增加企业
  if (roleType === 7) return fields.value === 6;
  return false;
}

interface WrappedFormProps extends FormComponentProps {
  fields?: CommonObject;
}
function FormEl(props: WrappedFormProps, ref: Ref<any>) {
  const { form, fields } = props;

  useImperativeHandle(ref, () => ({
    getData: () => {
      return new Promise((res, rej) => {
        form.validateFields((error, data) => {
          console.log("form", error, data);

          if (error) {
            rej({
              error,
              data: null
            });
          } else {
            res({
              data,
              error
            });
          }
        });
      });
    }
  }));

  // useEffect(() => {
  //   console.log("userForm useEffect fields=", fields);
  // }, [fields]);

  return (
    <>
      <Form.Item label="角色" required>
        {form.getFieldDecorator("roleType", {
          rules: [rule_notUndefined],
          initialValue:
            (fields && fields.roleType) ||
            (userInfo.roleType === 7 ? 6 : 10) ||
            ""
        })(
          <Radio.Group>
            {roleEnum.filterData(filterFormRole).map(({ label, value }) => (
              <Radio key={label} value={value} style={{ width: "30%" }}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </Form.Item>
      {[10, 11].includes(form.getFieldValue("roleType")) ? (
        <Form.Item label="登录名(手机号)" required>
          {form.getFieldDecorator("loginName", {
            rules: [rule_notEmpty, rule_isNumber],
            initialValue: fields && fields.loginName,
            normalize: value => {
              if (!value) return "";
              return value.trim();
            }
          })(<Input />)}
        </Form.Item>
      ) : (
        <Form.Item label="登录名" required>
          {form.getFieldDecorator("loginName", {
            rules: [rule_notEmpty],
            initialValue: fields && fields.loginName,
            normalize: value => {
              if (!value) return "";
              return value.trim();
            }
          })(<Input />)}
        </Form.Item>
      )}

      {/* 小区管理员特有 */}
      {Object.is(form.getFieldValue("roleType"), 14) && (
        <>
          <Form.Item label="小区名称" required>
            {form.getFieldDecorator("location", {
              rules: [rule_notEmpty],
              initialValue: fields && fields.location
            })(<Input />)}
          </Form.Item>
        </>
      )}

      <Form.Item label="联系人" required>
        {form.getFieldDecorator("userName", {
          rules: [rule_notEmpty],
          initialValue: fields && fields.userName
        })(<Input />)}
      </Form.Item>
      <Form.Item label="联系方式" required>
        {form.getFieldDecorator("tel", {
          rules: [rule_notEmpty],
          initialValue: fields && fields.tel,
          normalize: value => {
            if (!value) return "";
            return value.trim();
          }
        })(<Input />)}
      </Form.Item>
      {form.getFieldValue("roleType") === 6 ? (
        <>
          <Form.Item label="企业名称" required>
            {form.getFieldDecorator("companyName", {
              rules: [rule_notEmpty],
              initialValue: fields && fields.companyName
            })(<Input />)}
          </Form.Item>
          <Form.Item label="社会信用代码" required>
            {form.getFieldDecorator("socialCreditCode", {
              rules: [rule_notEmpty],
              initialValue: fields && fields.socialCreditCode
            })(<Input />)}
          </Form.Item>
          <Form.Item label="街道" required>
            {form.getFieldDecorator("street", {
              rules: [rule_notEmpty],
              initialValue: userInfo.street || ""
            })(
              <Select disabled={roleType === 7}>
                {streetEnum.enumsData.map(({ label, value }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </>
      ) : null}
      {form.getFieldValue("roleType") === 7 ||
      form.getFieldValue("roleType") === 8 ? (
        <>
          <Form.Item label="街道" required>
            {form.getFieldDecorator("street", {
              rules: [rule_notEmpty],
              initialValue: fields && fields.street
            })(
              <Select>
                {streetEnum.enumsData.map(({ label, value }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </>
      ) : null}
      {[10, 11].includes(form.getFieldValue("roleType")) && (
        <>
          <Form.Item label="所在地" required>
            {form.getFieldDecorator("location", {
              rules: [rule_notEmpty],
              initialValue: fields && fields.location
            })(<Input />)}
          </Form.Item>
        </>
      )}
    </>
  );
}

const WrappedFormEl = Form.create<WrappedFormProps>({})(forwardRef(FormEl));

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

interface Props {
  fields?: CommonObject;
}

function UserForm({ fields }: Props, ref: Ref<any>) {
  const formRef: MutableRefObject<any> = useRef();

  useImperativeHandle(ref, () => ({
    getData: () => {
      return formRef.current.getData();
    }
  }));

  return (
    <Form {...formItemLayout}>
      <WrappedFormEl wrappedComponentRef={formRef} fields={fields} />
    </Form>
  );
}

export default forwardRef(UserForm);