
import React, { cloneElement, useRef, FC, ReactElement, ReactNode, useState } from "react"

import { render, unmountComponentAtNode } from "react-dom"

import { Modal, Button } from "antd"
import { ModalProps } from "antd/lib/modal"

interface ChildrenData {
    error: null | string
    data: any
}
// 类型
export interface WithModalDomProps extends ModalProps {
    okText?: string
    cancelText?: string
    destroy: () => void
    handleOk?: (data: any, cb: () => void) => void
    handleCancel?: () => void
    footer?: (getChildData: Function, destory: Function, loading?: boolean) => React.ReactElement
    children?: ReactElement<any>
}
export const WithModalDom: FC<WithModalDomProps> = props => {
    const contentRef = useRef(null)

    const { children, cancelText, okText, handleOk, handleCancel, destroy, footer, ...rest } = props

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

    // const getChildData = () => {
    //     const current: any = contentRef && contentRef.current

    //     if (!current) {
    //         console.error("组件ref未注册")
    //         return
    //     }

    //     if (typeof current.getData === "function") {
    //         return current.getData()
    //     } else {
    //         console.error("组件getData方法未注册")
    //         return
    //     }
    // }

    // const composeHandleOk = (...args: any) => {
    //     const childData = getChildData()

    //     if (!childData) {
    //         return
    //     }

    //     const { error, data } = childData

    //     if (error) {
    //         console.error(error)
    //         return
    //     }
    //     handleOk && handleOk(data, destroy)
    // }

    // const footer = (
    //     <>
    //         <Button onClick={composeHandleCancel}>{cancelText || "取消"}</Button>
    //         <Button onClick={composeHandleOk} type="primary">
    //             {okText || "确定"}
    //         </Button>
    //     </>
    // )

    return (
        <Modal {...rest} onCancel={composeHandleCancel} footer={foot}>
            {children
                ? cloneElement(children, {
                      ref: contentRef,
                      submit: composeHandleOk,
                  })
                : null}
        </Modal>
    )
}


export function withModal(params:{
    title: ReactNode,
    content: ReactElement,
    okText?: string,
    cancelText?: string,
    onOk?: WithModalDomProps['handleOk'],
    onCancel?: WithModalDomProps['handleCancel'],
    width?: string | number
    footer?: (getChildData: Function, destory: Function, loading?: boolean) => React.ReactElement
}) {
    const div = document.createElement('div')
    document.body.appendChild(div)

    function renderDom(config: WithModalDomProps, children: ReactElement) {
        render(<WithModalDom {...config}>{children}</WithModalDom>, div)
    }

    function update(newConfig:Partial<WithModalDomProps>) {
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
            if(unmountRes && div.parentNode) {
                div.parentNode.removeChild(div)
            }
        }, 1000);
    }

    const {content, onOk, onCancel, ...rest} = params

    const initRenderProps: WithModalDomProps = {
        ...rest,
        destroy,
        visible: true,
        handleOk: onOk,
        handleCancel: onCancel,
    }

    renderDom(initRenderProps, content)

    return {
        update
    }
}