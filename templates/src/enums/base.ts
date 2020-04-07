
import {createEnums} from './factory'

// 1:管理员角色 2:公安审查角色 3:人社角色 4:经信角色 5:普通员工角色
// 6:企业管理员角色 7:街道管理员角色 8:街道查看角色(暂定) 9:市镇府角色
export const roleEnum = createEnums([
  {
    label: '管理员',
    value: 1,
  },
  {
    label: '公安审查员',
    value: 2,
  },
  {
    label: '人社审查员',
    value: 3,
  },
  {
    label: '经信审查员',
    value: 4,
  },
  {
    label: '企业管理员',
    value: 6,
  },
  // {
  //     label: "普通申报人", // 即员工, 不做展示
  //     value: 5,
  // },
  {
    label: '镇(街道)管理员',
    value: 7,
  },
  {
    label: '镇(街道)巡视员',
    value: 8,
  },
  {
    label: '市政府',
    value: 9,
  },
  {
    label: '卡口审查',
    value: 10,
  },
  {
    label: '园区管理员',
    value: 11,
  },
  {
    label: '侨联办',
    value: 12,
  },
  {
    label: '小区管理员',
    value: 14,
  },
])

// 企业可转换状态：允许通行、暂缓返桐、允许复工、企业管控、集中隔离
export const COMPANY_STAFF_STATUS_MAP = [4, 5, 6, 7, 8]
// 个人可转换状态：允许通行、暂缓返桐、允许复工、居家隔离、集中隔离
export const PERSONAL_STAFF_STATUS_MAP = [4, 5, 6, 7, 9]
// 在桐个人可转换状态：待公安审核、待激活、集中隔离、已激活、企业管控、居家隔离、高风险人群、审核不通过
export const LOCAL_PERSONAL_STAFF_STATUS_MAP = [3, 4, 5, 6, 8, 9, 11, 12]
// 10 桐乡本地个人申报不符合条件
// 11 桐乡本地个人申报高风险
// 12 桐乡本地个人申报公安审核不通过
export const CAN_ACTIVE_STATUS = [4, 5, 8, 9, 11]

const createStatusEnum = (ALL_REWORK = '已激活') => {
  return createEnums([
    {
      label: '待员工填报',
      value: 0,
      status: 'W_REPORT',
    },
    {
      label: '待企业提交',
      value: 1,
      status: 'W_COMPANY',
    },
    {
      label: '待街道审核',
      value: 2,
      status: 'W_STREET',
    },
    {
      label: '待公安审核',
      value: 3,
      status: 'W_POLICE',
    },
    {
      label: '待激活',
      value: 4,
      status: 'ALL_PASS',
    },
    {
      label: '集中隔离',
      value: 5,
      status: 'IN_ISOLATION',
    },
    {
      label: ALL_REWORK,
      value: 6,
      status: 'ALL_REWORK',
    },
    {
      label: '暂缓返桐',
      value: 7,
      status: 'FORBID_PASS',
    },
    {
      label: '企业管控',
      value: 8,
      status: 'COMPANY_CONTROL',
    },
    {
      label: '居家隔离',
      value: 9,
      status: 'SELF_CONTROL',
    },
    {
      label: '不符合条件',
      value: 10,
      status: 'LOCAL_CONTROL',
    },
    {
      label: '高风险人群',
      value: 11,
      status: 'LOCAL_HIGH_RISK',
    },
    {
      label: '审核不通过',
      value: 12,
      status: 'LOCAL_CHECK_FAULT',
    },
  ])
}

export const employeeStatusEnum = createStatusEnum();
export const overseasStatusEnum = createStatusEnum('已激活');

// 0 全部 1 企业员工 2 个人员工
export const personTypeEnum = createEnums([
  {
    label: '全部',
    value: 0,
  },
  {
    label: '企业员工',
    value: 1,
  },
  {
    label: '个人',
    value: 2,
  },
  {
    label: '在桐人员',
    value: 3,
  },
])