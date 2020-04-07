
import React, { Suspense } from "react"

import { Spin } from "antd"

export const asyncImport = (WrappedComponent: any) => (props: any) => (
    <Suspense
        fallback={
            <div className="por w100 h100">
                <Spin className="poa-center" />
            </div>
        }>
        <WrappedComponent {...props} />
    </Suspense>
)