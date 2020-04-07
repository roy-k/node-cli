
import React, {useState, useEffect} from 'react'
import {Cascader} from 'antd'
import data from './data'
import {CascaderOptionType} from 'antd/lib/cascader'

export type DataType = typeof data

function findChildren(parentValue: string): CascaderOptionType[] {
  if (!parentValue) return []
  return data
    .filter(item => item.parent === parentValue)
    .map(item => {
      const children = findChildren(item.value)
      return {
        label: item.name,
        value: item.value,
        isLeaf: !children || !children.length,
        children,
      }
    })
}
function formatData(data: DataType) {
  return data
    .filter(item => !item.parent)
    .map(item => {
      const children = findChildren(item.value)
      return {
        label: item.name,
        value: item.value,
        isLeaf: !children || !children.length,
        children,
      }
    })
}

const options = formatData(data)

export interface AddressProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}
function Address({value, defaultValue = [], onChange}: AddressProps) {
  const [state, setState] = useState(defaultValue)

  useEffect(() => {
    value && setState(value)
  }, [value])

  function handleChange(sel: string[]) {
    if (!value) {
      setState(sel)
    }
    onChange && onChange(sel)
  }

  return (
    <Cascader
      fieldNames={{label: 'label', value: 'label'}}
      options={options}
      value={state}
      //   loadData={this.loadData}
      onChange={handleChange}
      // defaultValue={defaultValue}
      expandTrigger='click'
    />
  )
}

export default Address