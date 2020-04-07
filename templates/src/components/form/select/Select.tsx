
import React from 'react'

import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { EnumsField } from 'enums/factory'

const { Option } = Select

export interface MySelectProps extends SelectProps {
    options: EnumsField[]
}
function MySelect(props: MySelectProps) {
    const { options, allowClear = true, ...rest } = props
    return (
        <Select allowClear={allowClear} {...rest}>
            {options.map((item, index) => {
                return (
                    <Option key={item.label} value={item.value}>
                        {item.label}
                    </Option>
                )
            })}
        </Select>
    )
}

export default MySelect