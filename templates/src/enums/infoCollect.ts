
import {createEnums} from './factory'

// 开发区（高桥街道） 梧桐街道 凤鸣街道 濮院镇 屠甸镇 崇福镇 洲泉镇
// 大麻镇 河山镇 乌镇镇 石门镇
export const streetEnum = createEnums([
  {
    label: '开发区（高桥街道）',
    value: '开发区（高桥街道）',
  },
  {
    label: '梧桐街道',
    value: '梧桐街道',
  },
  {
    label: '凤鸣街道',
    value: '凤鸣街道',
  },
  {
    label: '濮院镇',
    value: '濮院镇',
  },
  {
    label: '屠甸镇',
    value: '屠甸镇',
  },
  {
    label: '崇福镇',
    value: '崇福镇',
  },
  {
    label: '洲泉镇',
    value: '洲泉镇',
  },
  {
    label: '大麻镇',
    value: '大麻镇',
  },
  {
    label: '河山镇',
    value: '河山镇',
  },
  {
    label: '乌镇镇',
    value: '乌镇镇',
  },
  {
    label: '石门镇',
    value: '石门镇',
  },
  {
    label: '部门单位',
    value: '部门单位',
  },
  {
    label: '桐城集团',
    value: '桐城集团',
  },
])

export const symptomEnum = createEnums([
  {
    label: '无',
    value: '0',
  },
  {
    label: '咳嗽',
    value: '1',
  },
  {
    label: '头晕',
    value: '2',
  },
  {
    label: '乏力',
    value: '3',
  },
  {
    label: '呕吐',
    value: '4',
  },
  {
    label: '腹泻',
    value: '5',
  },
  {
    label: '昏迷',
    value: '6',
  },
  {
    label: '发热',
    value: '7',
  },
  {
    label: '胸闷',
    value: '8',
  },
])

export const travelWayEnum = createEnums([
  {
    label: '包车',
    value: '0',
    status: 'BAO_CHE',
  },
  {
    label: '拼车',
    value: '1',
    status: 'PING_CHE',
  },
  {
    label: '自驾',
    value: '2',
    status: 'ZI_JIA',
  },
  {
    label: '公共交通',
    value: '3',
    status: 'PUBLIC',
  },
])

export const accommodationWayEnum = createEnums([
  {
    label: '酒店',
    value: '0',
  },
  {
    label: '居家',
    value: '1',
  },
])

export const YNEnum = createEnums([
  {
    label: '否',
    value: '0',
  },
  {
    label: '是',
    value: '1',
  },
])

export const YWEnum = createEnums([
  {
    label: '无',
    value: '0',
  },
  {
    label: '有',
    value: '1',
  },
])

export const HealthEnum = createEnums([
  {
    label: '正常',
    value: '0',
    status: 'NORMAL',
  },
  {
    label: '异常',
    value: '1',
    status: 'ANOMALY',
  },
])

export const genderEnum = createEnums([
  {
    label: '男',
    value: '0',
  },
  {
    label: '女',
    value: '1',
  },
])

export const cardTypeEnum = createEnums([
  {
    label: '身份证',
    value: '0',
    status: 'SHEN_FEN_ZHENG',
  },
  {
    label: '护照',
    value: '1',
    status: 'HU_ZHAO',
  },
  {
    label: '台胞证',
    value: '2',
    status: 'TAI_BAO_ZHENG',
  },
  {
    label: '回乡证',
    value: '3',
    status: 'HUI_XIANG_ZHENG',
  },
  {
    label: '军官证',
    value: '4',
    status: 'JUN_GUAN_ZHENG',
  },
])

// 风险等级
// 3高风险地区，2较高、中风险地区，1低风险地区 0其他地区
export const riskEnum = createEnums([
  {
    label: '高风险地区',
    value: '3',
  },
  {
    label: '较高、中风险地区',
    value: '2',
  },
  {
    label: '低风险地区',
    value: '1',
  },
])

// 3高风险地区，2较高、中风险地区，1低风险地区 0其他地区
export const nameListTypeEnum = createEnums([
  {
    label: '黑名单',
    value: '2',
  },
  {
    label: '白名单',
    value: '3',
  },
])

export const familyRelationEnum = createEnums([
  {
    label: '父母',
    value: '1',
  },
  {
    label: '子女',
    value: '2',
  },
  {
    label: '配偶',
    value: '3',
  },
  {
    label: '兄弟姐妹',
    value: '4',
  },
  {
    label: '其他关系',
    value: '0',
  },
])

// 来桐原因
export const comeTongCauseEnum = createEnums([
  {
    label: '返工',
    value: '1',
  },
  {
    label: '返学',
    value: '2',
  },
  {
    label: '从外地返乡',
    value: '3',
  },
  {
    label: '本地外出返回',
    value: '4',
  },
  {
    label: '旅游探亲',
    value: '5',
  },
  {
    label: '其他',
    value: '6',
  },
])

export const verifyStatusEnum = createEnums([
  {
    label: '通过',
    value: '0',
  },
  {
    label: '驳回',
    value: '1',
  },
])

// 0 否  1 日本 2 韩国 3 伊朗 4 意大利
export const epidemicCountryEnum = createEnums([
  {
    label: '否',
    value: '否',
  },
  {
    label: '日本',
    value: '日本',
  },
  {
    label: '韩国',
    value: '韩国',
  },
  {
    label: '伊朗',
    value: '伊朗',
  },
  {
    label: '意大利',
    value: '意大利',
  },
])

export const overseasPersonType = createEnums([
  { value: '5', label: '华人华侨' },
  { value: '2', label: '境外来浙留学工作的外籍人员' },
  { value: '4', label: '近14日境外旅居史的中国籍人员' },
  { value: '6', label: '短期来浙商务旅行的外籍人员' },
])

export const overseasFromCountry = createEnums([
  { value: '0', label: '奥地利'},
  { value: '1', label: '澳大利亚'},
  { value: '2', label: '阿联酋'},
  { value: '3', label: '巴林'},
  { value: '4', label: '德国'},
  { value: '5', label: '法国'},
  { value: '6', label: '韩国'},
  { value: '7', label: '加拿大'},
  { value: '8', label: '科威特'},
  { value: '9', label: '美国'},
  { value: '10', label: '马来西亚'},
  { value: '11', label: '挪威'},
  { value: '12', label: '日本'},
  { value: '13', label: '瑞典'},
  { value: '14', label: '瑞士'},
  { value: '15', label: '泰国'},
  { value: '16', label: '西班牙'},
  { value: '17', label: '新加坡'},
  { value: '18', label: '英国'},
  { value: '19', label: '意大利'},
  { value: '20', label: '伊朗'},
  { value: '21', label: '伊拉克'},
  { value: '22', label: '越南'},
  { value: '23', label: '中国台湾地区'},
  { value: '24', label: '中国香港特别行政区'},
  { value: '25', label: '其他国家/地区'},
]);

// 境外 - 入境口岸
export const overseasPortOfEntry = createEnums([
  { value: '0', label: '广州'},
  { value: '1', label: '上海'},
  { value: '2', label: '深圳'},
  { value: '3', label: '北京'},
  { value: '4', label: '杭州'},
  { value: '5', label: '温州'},
  { value: '6', label: '宁波'},
  { value: '7', label: '其他'},
])

// 境外 - 回国交通方式
export const overseasComeChinaTravelWay = createEnums([
  { value: '4', label: '飞机'},
  { value: '5', label: '火车'},
  { value: '10', label: '其他'},
])

// 境外 - 国内反桐交通方式
export const overseasComeTongTravelWay = createEnums([
  { value: '4', label: '飞机'},
  { value: '5', label: '火车'},
  { value: '6', label: '汽车'},
  { value: '10', label: '其他'},
])

// 小区人员住户属性
export const residentType = createEnums([
  { value: '1', label: '业主'},
  { value: '2', label: '租客'},
  { value: '3', label: '访客'},
])