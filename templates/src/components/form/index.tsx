
import {ValidationRule} from 'antd/lib/form'

export const formItemLayout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
}

//是否含有中文（也包含日文和韩文）
function isChineseChar(str: string) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
    return reg.test(str)
}
//同理，是否含有全角符号的函数
function isFullWidthChar(str: string) {
    var reg = /[\uFF00-\uFFEF]/
    return reg.test(str)
}

export const rule_required: ValidationRule = {
    required: true,
    message: '该字段为必填项',
}

export const rule_notEmpty: ValidationRule = {
    validator(rule, value, callback) {
        if (!value || !value.trim()) {
            callback('字段不能为空')
        }
        callback()
    },
}
export const rule_notUndefined: ValidationRule = {
    validator(rule, value, callback) {
        if (value === undefined) {
            callback('字段为必选项')
        }
        callback()
    },
}
export const rule_isNumber: ValidationRule = {
    validator(rule, value, callback) {
        if (parseInt(value) != value) {
            callback('该字段只能填入数字')
        }
        callback()
    },
}
export const rule_onlyCharAndNumber: ValidationRule = {
    validator(rule, value, callback) {
        if (isChineseChar(value) || isFullWidthChar(value)) {
            callback('请仅输入字母数字')
        }
        callback()
    },
}
export const rule_lengthRange = (min: number, max: number): ValidationRule => {
    return {
        validator(rule, value, callback) {
            console.log('rule_lengthRange=', min, max, value, rule)
            if (!value || value.length < min || value.length > max) {
                callback(`文本长度限制为${min}-${max}`)
            }
            callback()
        },
    }
}