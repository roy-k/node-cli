
import { data } from "assets/js/util";
import { LoginInfo } from "fetch/modules/base";

interface routeMenu {
  label: string;
  route: string;
  icon?: string;
  leaf?: boolean;
  whiteList?: number[];
  children?: routeMenu[];
}

const userInfo: LoginInfo = data("loginInfo");
// roleType

export const defaultMenuConfig: routeMenu[] = [
  {
    label: "企业员工信息",
    route: "employee",
    icon: "contacts",
    leaf: true,
    whiteList: [6, 7, 8] // 企业, 街道, 街道查看员
  },
  {
    label: "复工人员信息",
    route: "reWork",
    icon: "database",
    leaf: true,
    // * 2-20 管理员新增人员编辑功能
    whiteList: [1, 2, 3, 4, 9] // 公安审核, 其他查看
  },
  {
    label: "境外人员信息",
    route: "overseas",
    icon: "contacts",
    leaf: true,
    whiteList: [1, 2, 12] // 公安、侨联办
  },
  {
    label: "小区人员信息",
    route: "community",
    icon: "idcard",
    leaf: true,
    whiteList: [1, 14] // 超管、小区管理员
  },
  {
    label: "桐健码激活",
    route: "pass-control",
    icon: "team",
    leaf: true,
    // * 2-23 卡口 新增人员 激活功能
    whiteList: [10] // 公安审核, 其他查看
  },
  {
    label: "系统信息管理",
    route: "fileSet",
    icon: "cloud-server",
    leaf: true,
    whiteList: [1] // 街道可以新增企业
  },
  {
    label: "用户管理",
    route: "users",
    icon: "team",
    leaf: true,
    whiteList: [1, 7] // 街道可以新增企业
  },
  {
    label: "密码修改",
    route: "password",
    icon: "setting",
    leaf: true
    // 1:管理员，2:公安审查，3:人社审查，4:经信审查，5:普通申报人员，6:企业管理员
    // whiteList: [1, 2, 3, 4, 5, 6],
  },
  {
    label: "发布招聘",
    route: "publish",
    icon: "plus", 
    leaf: true,
    // 1:管理员，2:公安审查，3:人社审查，4:经信审查，5:普通申报人员，6:企业管理员
    whiteList: [6],
  }
];

export const roleType: number = userInfo && userInfo.roleType;

export const canVerify = [2, 3, 4].includes(roleType);

export const is_Admin = roleType === 1
export const is_GongAn = roleType === 2
export const is_RenShe = roleType === 3
export const is_JingXin = roleType === 4
export const is_QiYe = roleType === 6
export const is_Street_Manager = roleType === 7
export const is_Street_XunShi = roleType === 8
export const is_Pass_Control = roleType === 8
export const is_Community_Manager = roleType === 14

function getAuthRoutes() {
  // if (process.env.NODE_ENV === "development") return defaultMenuConfig;

  if (!roleType) return [];

  return defaultMenuConfig.filter(menu => {
    const { whiteList } = menu;
    if (!whiteList) return true;

    return whiteList.includes(roleType);
  });
}

export const menuConfig = getAuthRoutes();