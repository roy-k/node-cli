
import React, { ReactChild, ReactNode } from "react"
import style from './ui.module.less'
import { Drawer, Button } from "antd"

import { DrawerProps } from "antd/lib/drawer"

export interface MyDrawerProps extends DrawerProps {
    visible: boolean
    title: ReactNode
    width: number
    onClose: (e: any) => void
    onOk: () => void
    cancelText?: string
    okText?: string
    maskClosable?: boolean
    children?: ReactNode
    foot?: ReactNode
    footer?: (getChildData: Function, destory: Function) => React.ReactElement
    loading?: boolean
    destroy?:any
}

export default function MyDrawer({
    visible,
    title,
    width,
    onClose,
    onOk,
    cancelText,
    okText,
    children,
    loading,
    foot,
    ...rest
}: MyDrawerProps) {
    const drawerProps = {
        visible,
        title,
        width,
        onClose,
        ...rest,
    }
    const defaultFoot = (
        <>
            <Button onClick={onOk} loading={loading} type="primary">
                {okText || "确定"}
            </Button>
            <Button className="ml20" onClick={onClose}>
                {cancelText || "取消"}
            </Button>
        </>
    )

    return (
        <Drawer {...drawerProps}>
            <div className="drawer-body">{children}</div>
            <div className="drawer-footer">{foot || defaultFoot}</div>
        </Drawer>
    )
}