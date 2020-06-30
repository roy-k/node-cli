
import React, {useState, useEffect, ChangeEvent, useCallback, Fragment} from 'react'
import {Form, Input, Button, Table, message, Modal} from 'antd'

import MySelect from 'components/form/select/Select'
import {RouteComponentProps} from 'react-router'
import {PaginationProps} from 'antd/lib/pagination'
import {ColumnProps} from 'antd/lib/table'
import {formItemLayout} from 'components/form'
import {roleEnum} from 'enums/base'
import {SelectValue} from 'antd/lib/select'
import {withModal} from 'components/ui/withModal'

import UserForm from './userForm'
import {
  fetch_getUserList,
  fetch_addUser,
  UserItem,
  fetch_deleteUser,
  fetch_resetUserPwd,
  fetch_updateUser,
} from 'fetch/modules/system'
import {CommonObject} from 'types/common'
import {roleType} from 'layout/router.config'

const {confirm} = Modal
const isAdminChecker = roleType === 1
const isStreetChecker = roleType === 7

export interface UsersProps extends RouteComponentProps {}

// 查询条件
const initQuery = {
  loginName: '',
  roleType: '',
  tel: '',
}

const initPagination = {
  current: 1,
  pageSize: 10,
  total: 0,
}
let initPageContent = true
let formLoading = false
function Users(props: UsersProps) {
  const [query, setQuery] = useState<CommonObject>(initQuery)

  const [list, setList] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  // const [formLoading, setFormLoading] = useState(false)

  const [pagination, setPagination] = useState(initPagination)
  const tablePagination: PaginationProps = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    size: 'default',
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: total => `共 ${total} 条记录`,
    onShowSizeChange: (current, pageSize) => {
      setPagination(pagination => ({
        current,
        pageSize: pageSize || pagination.pageSize,
        total: pagination.total,
      }))
    },
    onChange: (current, pageSize) => {
      setPagination(pagination => ({
        current,
        pageSize: pageSize || pagination.pageSize,
        total: pagination.total,
      }))
    },
  }

  const listColumns: ColumnProps<UserItem>[] = [
    {
      dataIndex: 'loginName',
      title: <span title='用户名'>用户名</span>,
      width: 180,
    },
    {
      dataIndex: 'roleType',
      title: <span title='角色'>角色</span>,
      width: 180,
      render: (text, record) => {
        return roleEnum.getLabel(text)
      },
    },
    {
      dataIndex: 'userName',
      title: <span title='联系人'>联系人</span>,
      width: 180,
      // render: (text, record, index) => {
      //     return index + 1
      // },
    },
    {
      dataIndex: 'companyName',
      title: <span title='企业名称'>企业名称</span>,
      // width: 280,
      ellipsis: true,
      render: (text, record, index) => {
        return text || '-'
      },
    },
    {
      dataIndex: 'socialCreditCode',
      title: <span title='社会信用代码'>社会信用代码</span>,
      // width: 280,
      ellipsis: true,
      render: (text, record, index) => {
        return text || '-'
      },
    },
    {
      dataIndex: 'tel',
      title: <span title='联系电话'>联系电话</span>,
      width: 180,
    },
    {
      dataIndex: 'operation',
      align: 'right',
      width: 280,
      title: <span title='操作'>操作</span>,
      render: (text, record) => {
        return (
          <Fragment>
            <a onClick={() => { editUser(record) }} className="mr10">编辑</a>
            <a onClick={() => { resetUserPwd(record) }} className="mr10">重置密码</a>
            <a onClick={() => { deleteUser(record) }} className="c-red">删除</a>
          </Fragment>
        )
      },
    },
  ]

  function filterColumns() {
    if (roleType === 7) return listColumns
    return listColumns.filter(column => {
      return !['companyName', 'socialCreditCode'].includes(column.dataIndex!)
    })
  }

  // 仅适用于 input 类型
  const handleInputFieldChange = useCallback(
    (field: string, format?: Function) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        const value = format ? format(e.target.value) || '' : e.target.value

        setQuery(query => {
          const {[field]: f, ...rest} = query
          return {
            ...rest,
            [field]: value,
          }
        })
      }
    },
    [setQuery]
  )

  function getUserList(initPage = true) {
    const {current, pageSize} = pagination
    const params: any = {
      ...query,
      current: initPage ? 1 : current,
      pageSize,
    }
    setLoading(false)
    fetch_getUserList(params).then(
      res => {
        setLoading(false)
        const {data = [], current, pageSize, total} = res
        setList(data)
        setPagination({
          current,
          pageSize,
          total,
        })
      },
      error => {
        setLoading(false)
      }
    )
  }

  const getList = getUserList

  useEffect(() => {
    // 某些比要去掉自动查询
    if (initPageContent) {
      initPageContent = false
      return
    }
    getList(false)
  }, [pagination.current, pagination.pageSize])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (initPageContent) {
  //       initPageContent = false
  //       return
  //     }
  //     getList()
  //   }, 700)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [query])

  function handleKeyWordChange(e: ChangeEvent<HTMLInputElement>) {
    const loginName = e.target.value
    setQuery(query => ({
      ...query,
      loginName,
    }))
  }

  function handleRoleChange(value: SelectValue) {
    const roleType = value ? value.toString() : ''

    setQuery(query => ({
      ...query,
      roleType,
    }))
  }

  function handleAddUser() {
    withModal({
      title: (
        <span>
          新增用户
          {isAdminChecker ? (
            <span style={{fontSize: 14, color: '#999'}}>
              （用户默认密码为admin）
            </span>
          ) : isStreetChecker ? (
            <span style={{fontSize: 14, color: '#999'}}>
              （用户默认密码为admin）
            </span>
          ) : (
            ''
          )}
        </span>
      ),
      content: <UserForm />,
      width: 650,
      onOk: (data, destroy) => {
        if (formLoading) return
        formLoading = true

        // data.userName = data.loginName
        fetch_addUser(data).then(
          () => {
            message.success('添加用户成功')
            getList(true)
            formLoading = false
            destroy()
          },
          error => {
            formLoading = false
          }
        )
      },
    })
  }

  function editUser(user: UserItem) {
    withModal({
      title: '编辑用户',
      content: <UserForm fields={user} />,
      width: 650,
      onOk: (data, destroy) => {
        if (formLoading) return
        formLoading = true
        // data.userName = data.loginName
        const params = {
          ...user,
          ...data,
        }
        fetch_updateUser(params).then(
          () => {
            message.success('更新用户信息成功')
            getList(true)
            formLoading = false
            destroy()
          },
          error => {
            formLoading = false
          }
        )
      },
    })
  }

  function resetUserPwd(user: UserItem) {
    confirm({
      title: '重置密码',
      content: '确认重置所选用户的密码?',
      okText: '重置',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        fetch_resetUserPwd({
          userId: user.userId,
        }).then(() => {
          message.success('操作成功')
        })
      },
      onCancel() {},
    })
  }

  // todo 批量
  function deleteUser(user: UserItem) {
    confirm({
      title: '删除用户',
      content: '确认删除所选用户?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        fetch_deleteUser({
          userId: user.userId,
        }).then(() => {
          getList(true)
          message.success('删除成功')
        })
      },
      onCancel() {},
    })
  }

  return (
    <section className='page-users'>
      <div className='page-title'>用户管理</div>
      <section className='pd20'>
        <section className='form'>
          <Form layout='inline' {...formItemLayout}>
            <Form.Item label='用户名'>
              <Input
                onChange={handleInputFieldChange('loginName')}
                value={query.loginName}
                allowClear
                placeholder='请输入用户名'
              />
            </Form.Item>
            {roleType !== 7 ? (
              <Form.Item label='角色' className='w150'>
                <MySelect
                  value={query.roleType ? Number(query.roleType) : ''}
                  onChange={handleRoleChange}
                  options={roleEnum.enumsData}
                  style={{width: '100%'}}
                />
              </Form.Item>
            ) : null}
            <Form.Item label='联系电话'>
              <Input
                onChange={handleInputFieldChange('tel')}
                value={query.tel}
                allowClear
                placeholder='联系电话'
              />
            </Form.Item>
            <Form.Item label='&nbsp;'>
              <Button
                className='w100'
                onClick={() => {
                  getList(true)
                }}
                type='primary'>
                查询
              </Button>
            </Form.Item>
          </Form>
        </section>
      </section>
      <section className='pl20'>
        <Button onClick={handleAddUser} type='primary' icon='plus'>
          新增用户
        </Button>
      </section>
      <section className='table-content mt10'>
        <Table
          loading={loading}
          rowKey={(record, index) => {
            return record.checkCode + record.loginName
          }}
          columns={filterColumns()}
          dataSource={list}
          pagination={tablePagination}
          size='middle'
        />
      </section>
    </section>
  )
}

export default Users