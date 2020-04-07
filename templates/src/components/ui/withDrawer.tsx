
import React, { cloneElement, useRef, FC, ReactElement, ReactNode, useState } from "react"
import { render, unmountComponentAtNode } from "react-dom"

import { Drawer, Modal, Button } from "antd"
import MyDrawer, { MyDrawerProps } from "./MyDrawer"

import { DrawerProps } from "antd/lib/drawer"

interface ChildrenData {
    error: null | string
    data: any
}

interface WithDrawerProps extends DrawerProps {
    visible: boolean
    title: ReactNode
    children?: ReactElement
    width?: number
    handleCancel?: () => void
    handleOk: (data: any, cb: any) => void | Promise<void>
    cancelText?: string
    okText?: string
    noFooter?: boolean
    footer?: (getChildData: Function, destory: Function, loading?: boolean) => React.ReactElement
    onlyCloseBtn?: boolean
    loading?: boolean
    destroy: any
}

export const WithDrawerDom: FC<WithDrawerProps> = props => {
    const contentRef = useRef(null)

    const { visible, title, children, cancelText, okText, handleOk, handleCancel, onlyCloseBtn, destroy, noFooter, footer, width= 680, ...rest } = props

    const composeHandleCancel = () => {
        destroy && destroy()
        handleCancel && handleCancel()
    }

    const [loading, setLoading] = useState(false)
    
    const composeHandleOk = async (...args: any) => {
        try {
            setLoading(true)

            const childData = await getChildData()

            if (!childData) {
                handleOk && (await handleOk(null, destroy))
            } else {
                const { error, data } = childData
    
                if (error) {
                    console.warn('getData 中错误需要 "return Promise.reject()"')
                } else {
                    handleOk && (await handleOk(data, destroy))

                }
            }
        } catch (error) {
            console.log('getData error', error);
        } finally {
            setLoading(false)
        }
    }


    const getChildData = async (): Promise<ChildrenData | null> => {
        const current: any = contentRef && contentRef.current

        if (!current) {
            console.error("组件ref未注册")
            return null
        }

        if (typeof current.getData === "function") {
            return await current.getData()
        } else {
            console.error("组件getData方法未注册")
            return null
        }
    }




    const foot = (footer && footer(getChildData, destroy, loading)) || (
        <>
            <Button onClick={composeHandleOk} type="primary" loading={loading} className="mr20">
                {okText || "确定"}
            </Button>
            <Button onClick={composeHandleCancel}>{cancelText || "取消"}</Button>
        </>
    )

    const myDrawerProps:MyDrawerProps = {
        visible,
        title,
        cancelText,
        okText,
        onOk: composeHandleOk,
        onClose: composeHandleCancel,
        destroy,
        foot,
        width,
        loading,
        ...rest,
    }

    return (
        <MyDrawer {...myDrawerProps}>
            {children
                ? cloneElement(children, {
                      ref: contentRef,
                      submit: composeHandleOk,
                      destroy,
                  })
                : null}
        </MyDrawer>
    )
}

export interface WithDrawerController {
    update: (newConfig: Partial<WithDrawerProps>) => void
    destroy: () => void
}

export function withDrawer(params: {
    title: ReactNode
    content: ReactElement
    okText?: string
    cancelText?: string
    onOk: WithDrawerProps["handleOk"]
    onCancel?: WithDrawerProps["handleCancel"]
    width?: number
    onlyCloseBtn?: boolean
    mask?: boolean
    footer?: (getChildData: Function, destory: Function, loading?: boolean) => React.ReactElement
}) {
    const div = document.createElement("div")
    document.body.appendChild(div)

    function renderDom(config: WithDrawerProps, children: ReactElement) {
        render(<WithDrawerDom {...config}>{children}</WithDrawerDom>, div)
    }

    function update(newConfig: Partial<WithDrawerProps>) {
        const currentConfig = {
            ...initRenderProps,
            ...newConfig,
        }
        renderDom(currentConfig, content)
    }

    function destroy() {
        // todo visible
        update({
            visible: false,
        })
        setTimeout(() => {
            const unmountRes = unmountComponentAtNode(div)
            if (unmountRes && div.parentNode) {
                div.parentNode.removeChild(div)
            }
        }, 1000)
    }

    const { content, onOk, onCancel, ...rest } = params

    const initRenderProps: WithDrawerProps = {
        ...rest,
        destroy,
        visible: true,
        handleOk: onOk,
        handleCancel: onCancel,
    }

    renderDom(initRenderProps, content)

    return {
        update,
        destroy,
    }
}